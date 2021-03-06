const moment = require('moment');
const SplunkLogger = require('splunk-logging').Logger;
const loggingTools = require('auth0-log-extension-tools');
const useragent = require('useragent');

const config = require('./config');
const logger = require('./logger');

const MS_PER_S = 1000;
const NS_PER_MS = 1000000;

module.exports = (storage) =>
  (req, res, next) => {
    const wtBody = (req.webtaskContext && req.webtaskContext.body) || req.body || {};
    const wtHead = (req.webtaskContext && req.webtaskContext.headers) || {};
    const isCron = (wtBody.schedule && wtBody.state === 'active') || (wtHead.referer === 'https://manage.auth0.com/' && wtHead['if-none-match']);

    if (!isCron) {
      return next();
    }

    const Logger = new SplunkLogger({
      token: config('SPLUNK_TOKEN'),
      url: config('SPLUNK_URL'),
      port: config('SPLUNK_COLLECTOR_PORT') || 8088,
      path: config('SPLUNK_COLLECTOR_PATH') || '/services/collector/event/1.0',
      maxBatchCount: 0 // Manually flush events
    });

    Logger.eventFormatter = function (message, severity) {
      return message;
    };

    Logger.requestOptions = {
      timeout: 5000
    };

    Logger.error = function (err, context) {
      // Handle errors here
      logger.error('error', err, 'context', context);
    };

    const remapLogs = (record) => {
      record.type_code = record.type;
      record.type = loggingTools.logTypes.get(record.type);

      if (record.user_agent && record.user_agent.length) {
        let agent = useragent.parse(record.user_agent);
        record.os = agent.os.toString();
        record.os_version = agent.os.toVersion();
        record.device = agent.device.toString();
        record.device_version = agent.device.toVersion();
      }

      return record;
    };

    const onLogsReceived = (logs, cb) => {
      if (!logs || !logs.length) {
        return cb();
      }

      const startTime = process.hrtime();

      logs.forEach(function (entry) {
        var payload = {};
        payload.message = {};
        payload.metadata = {};

        entry = remapLogs(entry);

        if (typeof entry === 'object' && entry.hasOwnProperty('date')) {
          payload.metadata.time = new Date(entry.date);
        }

        payload.message = entry;

        Logger.send(payload);
      });

      logger.info(`Sending ${logs.length} logs to Splunk...`);

      Logger.flush(function(error, response, body) {
        const elapsedTime = process.hrtime(startTime);
        const elapsedMillis = elapsedTime[0] * MS_PER_S + elapsedTime[1] / NS_PER_MS;

        logger.info(`Finished sending logs to Splunk in ${elapsedMillis}ms.`);

        logger.info('Splunk response', body);
        if (error) {
          return cb({ error: error, message: 'Error sending logs to Splunk' });
        }

        logger.info('Upload complete.');
        return cb();
      });
    };

    const slack = new loggingTools.reporters.SlackReporter({
      hook: config('SLACK_INCOMING_WEBHOOK_URL'),
      username: 'auth0-logs-to-splunk',
      title: 'Logs To Splunk'
    });

    const options = {
      domain: config('AUTH0_DOMAIN'),
      clientId: config('AUTH0_CLIENT_ID'),
      clientSecret: config('AUTH0_CLIENT_SECRET'),
      batchSize: parseInt(config('BATCH_SIZE')),
      startFrom: config('START_FROM'),
      logTypes: config('LOG_TYPES'),
      logLevel: config('LOG_LEVEL'),
      logger
    };

    if (!options.batchSize || options.batchSize > 100) {
      options.batchSize = 100;
    }

    if (options.logTypes && !Array.isArray(options.logTypes)) {
      options.logTypes = options.logTypes.replace(/\s/g, '').split(',');
    }

    const auth0logger = new loggingTools.LogsProcessor(storage, options);

    const sendDailyReport = (lastReportDate) => {
      const current = new Date();

      const end = current.getTime();
      const start = end - 86400000;
      auth0logger.getReport(start, end)
        .then(report => slack.send(report, report.checkpoint))
        .then(() => storage.read())
        .then((data) => {
          data.lastReportDate = lastReportDate;
          return storage.write(data);
        });
    };

    const checkReportTime = () => {
      storage.read()
        .then((data) => {
          const now = moment().format('DD-MM-YYYY');
          const reportTime = config('DAILY_REPORT_TIME') || 16;

          if (data.lastReportDate !== now && new Date().getHours() >= reportTime) {
            sendDailyReport(now);
          }
        })
    };

    return auth0logger
      .run(onLogsReceived)
      .then(result => {
        if (result && result.status && result.status.error) {
          slack.send(result.status, result.checkpoint);
        } else if (config('SLACK_SEND_SUCCESS') === true || config('SLACK_SEND_SUCCESS') === 'true') {
          slack.send(result.status, result.checkpoint);
        }
        checkReportTime();
        res.json(result);
      })
      .catch(err => {
        slack.send({ error: err, logsProcessed: 0 }, null);
        checkReportTime();
        next(err);
      });
  };
