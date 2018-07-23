module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=29)}([function(e,t){e.exports=require("auth0-extension-tools@1.3.1")},function(e,t,r){"use strict";e.exports=r(0).config()},function(e,t,r){const n=r(23),o=r(6),i=r(16),s=r(22);e.exports.createServer=n.createServer,e.exports.urlHelpers=o,e.exports.middlewares=i,e.exports.routes=s},function(e,t){e.exports=require("express@4.12.4")},function(e,t,r){"use strict";var n=r(51);n.emitErrs=!0;var o=new n.Logger({transports:[new n.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=o,e.exports.stream={write:function(e){o.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("url")},function(e,t,r){function n(e){if(!e.container)return null;const t=e.container.replace(c,"\\$&"),r=e.jtn?e.jtn.replace(c,"\\$&"):"";if(e.url_format===u)return new RegExp("^/api/run/"+t+"/(?:"+r+"/?)?");if(e.url_format===a)return new RegExp("^/"+t+"/(?:"+r+"/?)?");if(e.url_format===s)return new RegExp("^/(?:"+r+"/?)?");throw new Error("Unsupported webtask URL format.")}function o(e,t){if(!e)return null;const r=e.indexOf("sandbox8")>=0?"8":"";return"https://"+t+"."+(e.split(".it.auth0.com")[0].split("-")[1]||"us")+r+".webtask.io/"}const i=r(5),s=3,a=2,u=1,c=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,l=function(e,t){var r=i.parse(e).pathname||"";return r=r.replace(t,"").replace(/^\/|\/$/g,""),r.startsWith("/")||(r="/"+r),r.endsWith("/")||(r+="/"),r};e.exports.getBasePath=function(e){return l(e.originalUrl||"",e.path)},e.exports.getBaseUrl=function(e,t){var r=t;const n=i.parse(e.originalUrl||"").pathname||"";return i.format({protocol:r||"https",host:e.headers.host,pathname:n.replace(e.path,"").replace(/\/$/g,"")})},e.exports.getWebtaskUrl=function(e){const t=n(e.x_wt),r=e.url,s=e.url.replace(t,"/"),a=i.parse(s||"").pathname,u=e.x_wt&&e.x_wt.ectx&&e.x_wt.ectx.ISOLATED_DOMAIN||!1,c=i.parse(r||"").pathname||"";var l;if(u){l=i.format({protocol:"https",host:e.headers.host,pathname:c.replace(a,"").replace(/\/$/g,"")});const p=".it.auth0.com/api/run/"+e.x_wt.container+"/",h=o(l,e.x_wt.container);l.indexOf(p)>=0&&(l=l.replace("https://"+e.headers.host+"/api/run/"+e.x_wt.container+"/",h))}else l=c;return l}},function(e,t,r){"use strict";var n=r(35);e.exports=function(e,t,r){return function(o,i,s){var a=n(s);return!0===e||"function"==typeof e&&e(o,i,a)?t(o,i,a):r?r(o,i,a):a()}}},function(e,t,r){"use strict";function n(e){this.message=e}var o=r(34);n.prototype=new Error,n.prototype.name="InvalidTokenError",e.exports=function(e,t){if("string"!=typeof e)throw new n("Invalid token specified");t=t||{};var r=!0===t.header?0:1;try{return JSON.parse(o(e.split(".")[r]))}catch(e){throw new n("Invalid token specified: "+e.message)}},e.exports.InvalidTokenError=n},function(e,t){var r={};r.formatTime=function(e){var t;return e instanceof Date&&(e=e.valueOf()),e&&null!==e?(-1!==e.toString().indexOf(".")?(t=parseFloat(e).toFixed(3),t.toString().indexOf(".")>=10&&(t=parseFloat(t.toString().substring(0,14)).toFixed(3))):t=13===e.toString().length?(parseFloat(e)/1e3).toFixed(3):e.toString().length<=12?parseFloat(e).toFixed(3):parseFloat(e.toString().substring(0,13)/1e3).toFixed(3),t):null},r.toArray=function(e){return Array.prototype.slice.call(e)},r.chain=function(e,t){if(arguments.length>1&&"function"==typeof arguments[0]){var n=r.toArray(arguments);e=n.slice(0,n.length-1),t=n[n.length-1]}if(e=e||[],t=t||function(){},0===e.length)t();else{var o=function(e,n,i){var s=function(e){if(e)t(e);else{var i=r.toArray(arguments);i.shift(),o(n[0],n.slice(1),i)}},a=i;0===n.length?a.push(t):a.push(s),e.apply(null,a)};o(e[0],e.slice(1),[])}},r.whilst=function(e,t,n){e=e||function(){return!1},t=t||function(e){e()},n=n||function(){};var o=function(o){o?n(o):r.whilst(e,t,n)};e()?t(o):n(null)},r.expBackoff=function(e,t){if(t=t||function(){},e&&"object"==typeof e)if(e&&!e.hasOwnProperty("attempt"))t(new Error("Must set opts.attempt."));else{var r=Math.random();e.hasOwnProperty("rand")&&(r=e.rand),r++;var n=Math.round(10*r*Math.pow(2,e.attempt));n=Math.min(n,12e4),setTimeout(function(){t(null,n)},n)}else t(new Error("Must send opts as an object."))},r.bind=function(e,t){return function(){return t.apply(e,arguments)}},r.copyObject=function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t},r.copyArray=function(e){for(var t=[],r=0;e&&r<e.length;r++)t[r]=e[r];return t},r.orByProp=function(e){for(var t=!1,r=1;!t&&r<arguments.length;r++)arguments[r]&&(t=t||arguments[r][e]);return t},r.orByFalseyProp=function(e){for(var t=null,r=arguments.length-1;r>0;r--)arguments[r]&&arguments[r].hasOwnProperty(e)&&(t=arguments[r][e]);return t},r.validateNonNegativeInt=function(e,t){if(e=parseInt(e,10),isNaN(e))throw new Error(t+" must be a number, found: "+e);if(e<0)throw new Error(t+" must be a positive number, found: "+e);return e},e.exports=r},function(e,t){e.exports=require("express-jwt@3.1.0")},function(e,t){e.exports=require("path")},function(e,t,r){"use strict";(function(t){var n=(r(5),r(11)),o=r(48),i=r(3),s=r(39),a=r(0),u=r(2),c=r(27),l=r(28),p=r(25),h=r(4),d=r(1),f=r(24);e.exports=function(e,r){d.setProvider(e);var g=r?new a.WebtaskStorageContext(r,{force:1}):new a.FileStorageContext(n.join(t,"./data.json"),{mergeWrites:!0}),m=new i;m.use(o(":method :url :status :response-time ms - :res[content-length]",{stream:h.stream}));var v=function(e){return function(t,r,n){return t.webtaskContext&&t.webtaskContext.body?(t.body=t.webtaskContext.body,n()):e(t,r,n)}};return m.use(v(s.json())),m.use(v(s.urlencoded({extended:!1}))),m.use(u.routes.dashboardAdmins({secret:d("EXTENSION_SECRET"),audience:"urn:logs-to-splunk",rta:d("AUTH0_RTA").replace("https://",""),domain:d("AUTH0_DOMAIN"),baseUrl:d("PUBLIC_WT_URL")||d("WT_URL"),clientName:"Logs to Splunk",urlPrefix:"",sessionStorageKey:"logs-to-splunk:apiToken"})),m.use("/meta",l()),m.use("/.extensions",p()),m.use("/app",i.static(n.join(t,"../dist"))),m.use(f(g)),m.use("/",c(g)),m.use(u.middlewares.errorHandler(h.error.bind(h))),m}}).call(t,"/")},function(e,t,r){const n=r(8),o=r(10),i=r(0),s=r(7);e.exports=function(e){if(!e||"object"!=typeof e)throw new i.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new i.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new i.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.baseUrl||void 0===e.baseUrl)throw new i.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new i.ArgumentError("The provided base URL is invalid: "+e.baseUrl);const t=o({audience:e.audience,issuer:e.baseUrl,secret:e.secret,algorithms:["HS256"],credentialsRequired:e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return s(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss===t.baseUrl}catch(e){return!1}return!1},r)}},function(e,t,r){const n=r(8),o=r(10),i=r(45),s=r(0),a=r(7),u=r(0).UnauthorizedError;e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);const t=o({secret:i.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e.domain+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return t(e instanceof i.SigningKeyNotFoundError?new u("A token was provided with an invalid kid"):e)}}),audience:e.audience,issuer:"https://"+e.domain+"/",algorithms:["RS256"],credentialsRequired:e&&e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return a(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss==="https://"+t.domain+"/"}catch(e){return!1}return!1},r)}},function(e,t,r){e.exports=function(e){return function(t,r,n,o){return e&&e(t),t&&t.status?(n.status(t.status),n.json({error:t.code||t.name,message:t.message||t.name})):(n.status(t.status||500),n.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,r){e.exports.authenticateAdmins=r(13),e.exports.authenticateUsers=r(14),e.exports.requireAuthentication=r(18),e.exports.errorHandler=r(15),e.exports.managementApiClient=r(17),e.exports.validateHookToken=r(19),e.exports.webtaskConfig=r(20)},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){const i=t,s=t.user&&t.user.access_token&&t.user.access_token.length,a=s?{domain:e.domain,accessToken:t.user.access_token}:e;n.managementApi.getClient(a).then(function(e){return i.auth0=e,o(),null}).catch(function(e){o(e)})}}},function(e,t,r){const n=r(0).UnauthorizedError;e.exports=function(e,t,r){return e.user?r():r(new n("Authentication required for this endpoint."))}},function(e,t,r){const n=r(0);e.exports=function(e,t,r){if(null===e||void 0===e)throw new n.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new n.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new n.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new n.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===r||void 0===r)throw new n.ArgumentError("Must provide the extensionSecret");if("string"!=typeof r||0===r.length)throw new n.ArgumentError("The provided extensionSecret is invalid: "+r);return function(o){if(null===o||void 0===o)throw new n.ArgumentError("Must provide the hookPath");if("string"!=typeof o||0===o.length)throw new n.ArgumentError("The provided hookPath is invalid: "+o);return function(i,s,a){if(i.headers.authorization&&"Bearer"===i.headers.authorization.split(" ")[0]){const u=i.headers.authorization.split(" ")[1];try{if(n.validateHookToken(e,t,o,r,u))return a()}catch(e){return a(e)}}return a(new n.HookTokenError("Hook token missing for the call to: "+o))}}}},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){return t.webtaskContext&&e.setProvider(n.configProvider.fromWebtaskContext(t.webtaskContext)),o()}}},function(e,t,r){const n=r(3),o=r(41),i=r(30),s=r(44),a=r(0),u=r(6);e.exports=function(e){if(!e||"object"!=typeof e)throw new a.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new a.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new a.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new a.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new a.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.rta||void 0===e.rta)throw new a.ArgumentError("Must provide a valid rta");if("string"!=typeof e.rta||0===e.rta.length)throw new a.ArgumentError("The provided rta is invalid: "+e.rta);if(null===e.domain||void 0===e.domain)throw new a.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new a.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.baseUrl||void 0===e.baseUrl)throw new a.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new a.ArgumentError("The provided base URL is invalid: "+e.baseUrl);if(null===e.clientName||void 0===e.clientName)throw new a.ArgumentError("Must provide a valid client name");if("string"!=typeof e.clientName||0===e.clientName.length)throw new a.ArgumentError("The provided client name is invalid: "+e.clientName);const t=e.stateKey||"state",r=e.nonceKey||"nonce",c=e.urlPrefix||"",l=e.sessionStorageKey||"apiToken",p=n.Router();return p.get(c+"/login",function(n,i){const s=o.randomBytes(16).toString("hex"),l=o.randomBytes(16).toString("hex");i.cookie(t,s),i.cookie(r,l);const p=new a.SessionManager(e.rta,e.domain,e.baseUrl),h=p.createAuthorizeUrl({redirectUri:u.getBaseUrl(n)+c+"/login/callback",scopes:e.scopes,expiration:e.expiration,nonce:l,state:s});i.redirect(h)}),p.post(c+"/login/callback",i(),function(n,o,i){var c;try{c=s.decode(n.body.id_token)}catch(e){c=null}return c&&n.cookies&&n.cookies[r]===c.nonce?n.cookies&&n.cookies[t]===n.body.state?new a.SessionManager(e.rta,e.domain,e.baseUrl).create(n.body.id_token,n.body.access_token,{secret:e.secret,issuer:e.baseUrl,audience:e.audience}).then(function(e){o.header("Content-Type","text/html"),o.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("'+l+'", "'+e+'");window.location.href = "'+u.getBaseUrl(n)+'";<\/script></head></html>')}).catch(function(e){i(e)}):i(new a.ValidationError("Login failed. State mismatch.")):i(new a.ValidationError("Login failed. Nonce mismatch."))}),p.get(c+"/logout",function(t,r){const n=encodeURIComponent(u.getBaseUrl(t));r.header("Content-Type","text/html"),r.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("'+l+'");window.location.href = "https://'+e.rta+"/v2/logout/?returnTo="+n+"&client_id="+n+'";<\/script></head></html>')}),p.get("/.well-known/oauth2-client-configuration",function(t,r){r.header("Content-Type","application/json"),r.status(200).send({redirect_uris:[u.getBaseUrl(t)+c+"/login/callback"],client_name:e.clientName,post_logout_redirect_uris:[u.getBaseUrl(t)]})}),p}},function(e,t,r){e.exports.dashboardAdmins=r(21)},function(e,t,r){const n=r(0),o=r(50);e.exports.createServer=function(e){const t=n.createServer(e);var r=null;return o.fromExpress(function(e,n){return r||(r=t(e.webtaskContext)),r(e,n)})}},function(e,t,r){"use strict";var n=r(47),o=r(36).Logger,i=r(38),s=r(1),a=r(4);e.exports=function(e){return function(t,r,u){var c=t.webtaskContext&&t.webtaskContext.body||t.body||{},l=t.webtaskContext&&t.webtaskContext.headers||{};if(!(c.schedule&&"active"===c.state||"https://manage.auth0.com/"===l.referer&&l["if-none-match"]))return u();var p=new o({token:s("SPLUNK_TOKEN"),url:s("SPLUNK_URL"),port:s("SPLUNK_COLLECTOR_PORT")||8088,path:s("SPLUNK_COLLECTOR_PATH")||"/services/collector/event/1.0",maxBatchCount:0});p.eventFormatter=function(e,t){return e},p.requestOptions={timeout:5e3},p.error=function(e,t){a.error("error",e,"context",t)};var h=function(e,t){if(!e||!e.length)return t();var r=process.hrtime();e.forEach(function(e){var t={};t.message={},t.metadata={};try{var r=JSON.parse(e.replace(/\\/g,"\\\\"));t.metadata.time=new Date(r.date),t.message=r}catch(e){t.message={error:{name:e.name,message:e.message,object:e}}}p.send(t)}),a.info("Sending "+e.length+" logs to Splunk..."),p.flush(function(e,n,o){var i=process.hrtime(r),s=1e3*i[0]+i[1]/1e6;return a.info("Finished sending logs to Splunk in "+s+"ms."),a.info("Splunk response",o),e?t({error:e,message:"Error sending logs to Splunk"}):(a.info("Upload complete."),t())})},d=new i.reporters.SlackReporter({hook:s("SLACK_INCOMING_WEBHOOK_URL"),username:"auth0-logs-to-splunk",title:"Logs To Splunk"}),f={domain:s("AUTH0_DOMAIN"),clientId:s("AUTH0_CLIENT_ID"),clientSecret:s("AUTH0_CLIENT_SECRET"),batchSize:parseInt(s("BATCH_SIZE")),startFrom:s("START_FROM"),logTypes:s("LOG_TYPES"),logLevel:s("LOG_LEVEL"),logger:a};(!f.batchSize||f.batchSize>100)&&(f.batchSize=100),f.logTypes&&!Array.isArray(f.logTypes)&&(f.logTypes=f.logTypes.replace(/\s/g,"").split(","));var g=new i.LogsProcessor(e,f),m=function(t){var r=new Date,n=r.getTime(),o=n-864e5;g.getReport(o,n).then(function(e){return d.send(e,e.checkpoint)}).then(function(){return e.read()}).then(function(r){return r.lastReportDate=t,e.write(r)})},v=function(){e.read().then(function(e){var t=n().format("DD-MM-YYYY"),r=s("DAILY_REPORT_TIME")||16;e.lastReportDate!==t&&(new Date).getHours()>=r&&m(t)})};return g.run(h).then(function(e){e&&e.status&&e.status.error?d.send(e.status,e.checkpoint):!0!==s("SLACK_SEND_SUCCESS")&&"true"!==s("SLACK_SEND_SUCCESS")||d.send(e.status,e.checkpoint),v(),r.json(e)}).catch(function(e){d.send({error:e,logsProcessed:0},null),v(),u(e)})}}},function(e,t,r){"use strict";var n=r(3).Router,o=r(2).middlewares,i=r(1),s=r(4);e.exports=function(){var e=n(),t=o.validateHookToken(i("AUTH0_DOMAIN"),i("WT_URL"),i("EXTENSION_SECRET"));return e.use("/on-uninstall",t("/.extensions/on-uninstall")),e.use(o.managementApiClient({domain:i("AUTH0_DOMAIN"),clientId:i("AUTH0_CLIENT_ID"),clientSecret:i("AUTH0_CLIENT_SECRET")})),e.delete("/on-uninstall",function(e,t){var r=i("AUTH0_CLIENT_ID");e.auth0.clients.delete({client_id:r}).then(function(){s.debug("Deleted client "+r),t.sendStatus(204)}).catch(function(e){s.debug("Error deleting client: "+i("AUTH0_CLIENT_ID")),s.error(e),t.sendStatus(204)})}),e}},function(e,t,r){"use strict";(function(t){var n=(r(43),r(42)),o=(r(11),r(2).urlHelpers),i=r(1);e.exports=function(){var e='\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/auth0-logs-to-splunk.ui.<%= assets.version %>.css" /><% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="/app/<%= assets.app %>"><\/script><% } %>\n    <% if (assets.version) { %>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/auth0-logs-to-splunk.ui.vendors.<%= assets.version %>.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/auth0-logs-to-splunk.ui.<%= assets.version %>.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';return function(t,r,s){if(0===t.url.indexOf("/api"))return s();var a={AUTH0_DOMAIN:i("AUTH0_DOMAIN"),AUTH0_CLIENT_ID:i("EXTENSION_CLIENT_ID"),AUTH0_MANAGE_URL:i("AUTH0_MANAGE_URL")||"https://manage.auth0.com",BASE_URL:o.getBaseUrl(t),BASE_PATH:o.getBasePath(t),TITLE:i("TITLE")};return r.send(n.render(e,{config:a,assets:{customCss:i("CUSTOM_CSS"),version:"2.1.3"}}))}}}).call(t,"/")},function(e,t,r){"use strict";var n=r(46),o=r(3).Router,i=r(2).middlewares,s=r(1),a=r(26);e.exports=function(e){var t=o(),r=i.authenticateAdmins({credentialsRequired:!0,secret:s("EXTENSION_SECRET"),audience:"urn:logs-to-splunk",baseUrl:s("PUBLIC_WT_URL")||s("WT_URL"),onLoginSuccess:function(e,t,r){return r()}});return t.get("/",a()),t.get("/api/report",r,function(t,r,o){return e.read().then(function(e){var o=e&&e.logs?n.sortByOrder(e.logs,"start","desc"):[],i=t.query.filter&&"errors"===t.query.filter?n.filter(o,function(e){return!!e.error}):o,s=t.query.page&&parseInt(t.query.page)?parseInt(t.query.page)-1:0,a=t.query.per_page&&parseInt(t.query.per_page)||10,u=a*s;return r.json({logs:i.slice(u,u+a),total:i.length})}).catch(o)}),t}},function(e,t,r){"use strict";var n=r(3),o=r(32);e.exports=function(){var e=n.Router();return e.get("/",function(e,t){t.status(200).send(o)}),e}},function(e,t,r){"use strict";var n=r(2),o=r(12),i=r(1),s=r(4),a=n.createServer(function(e,t){return s.info("Starting Logs to Splunk extension - Version:","2.1.3"),o(e,t)});e.exports=function(e,t,r){i.setValue("PUBLIC_WT_URL",n.urlHelpers.getWebtaskUrl(t)),a(e,t,r)}},function(e,t,r){"use strict";function n(e,t){return function(r,n,o){if(r.cookies)return o();var s=r.headers.cookie,c=!e||Array.isArray(e)?e||[]:[e];if(r.secret=c[0],r.cookies=Object.create(null),r.signedCookies=Object.create(null),!s)return o();r.cookies=u.parse(s,t),0!==c.length&&(r.signedCookies=a(r.cookies,c),r.signedCookies=i(r.signedCookies)),r.cookies=i(r.cookies),o()}}function o(e){if("string"==typeof e&&"j:"===e.substr(0,2))try{return JSON.parse(e.slice(2))}catch(e){return}}function i(e){for(var t,r,n=Object.keys(e),i=0;i<n.length;i++)t=n[i],(r=o(e[t]))&&(e[t]=r);return e}function s(e,t){if("string"==typeof e){if("s:"!==e.substr(0,2))return e;for(var r=!t||Array.isArray(t)?t||[]:[t],n=0;n<r.length;n++){var o=c.unsign(e.slice(2),r[n]);if(!1!==o)return o}return!1}}function a(e,t){for(var r,n,o,i=Object.keys(e),a=Object.create(null),u=0;u<i.length;u++)n=i[u],o=e[n],r=s(o,t),o!==r&&(a[n]=r,delete e[n]);return a}var u=r(31),c=r(40);e.exports=n,e.exports.JSONCookie=o,e.exports.JSONCookies=i,e.exports.signedCookie=s,e.exports.signedCookies=a},function(e,t,r){"use strict";function n(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},n=t||{},o=e.split(u),a=n.decode||s,c=0;c<o.length;c++){var l=o[c],p=l.indexOf("=");if(!(p<0)){var h=l.substr(0,p).trim(),d=l.substr(++p,l.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),void 0==r[h]&&(r[h]=i(d,a))}}return r}function o(e,t,r){var n=r||{},o=n.encode||a;if("function"!=typeof o)throw new TypeError("option encode is invalid");if(!c.test(e))throw new TypeError("argument name is invalid");var i=o(t);if(i&&!c.test(i))throw new TypeError("argument val is invalid");var s=e+"="+i;if(null!=n.maxAge){var u=n.maxAge-0;if(isNaN(u))throw new Error("maxAge should be a Number");s+="; Max-Age="+Math.floor(u)}if(n.domain){if(!c.test(n.domain))throw new TypeError("option domain is invalid");s+="; Domain="+n.domain}if(n.path){if(!c.test(n.path))throw new TypeError("option path is invalid");s+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");s+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(s+="; HttpOnly"),n.secure&&(s+="; Secure"),n.sameSite){switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;default:throw new TypeError("option sameSite is invalid")}}return s}function i(e,t){try{return t(e)}catch(t){return e}}t.parse=n,t.serialize=o;var s=decodeURIComponent,a=encodeURIComponent,u=/; */,c=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/},function(e,t){e.exports={title:"Auth0 Logs to Splunk Lectra",name:"auth0-logs-to-splunk-lectra",version:"2.1.3",preVersion:"2.0.3",author:"auth0",description:"This extension will take all of your Auth0 logs and export them to Splunk",type:"cron",initialUrlPath:"/login",category:"log_export",repository:"https://github.com/auth0-extensions/auth0-logs-to-splunk",docsUrl:"https://auth0.com/docs/extensions/splunk",logoUrl:"https://cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/logo.png",keywords:["auth0","extension"],schedule:"0 */5 * * * *",auth0:{createClient:!0,onUninstallPath:"/.extensions/on-uninstall",scopes:"read:logs delete:clients"},secrets:{SPLUNK_URL:{description:"Splunk URL - this is your Splunk HTTP Collector Endpoint",required:!0},SPLUNK_TOKEN:{description:"Splunk Token - this is your Splunk Token",required:!0,type:"password"},SPLUNK_COLLECTOR_PORT:{description:"HTTP Collector Port",required:!0,default:8088},SPLUNK_COLLECTOR_PATH:{description:"HTTP Collector Path (Endpoint)",required:!1,default:"/services/collector/event/1.0"},BATCH_SIZE:{description:"The amount of logs to batch before sending to Splunk. A single cron execution will send multiple batches.",default:100},START_FROM:{description:"Checkpoint ID of log to start from."},SLACK_INCOMING_WEBHOOK_URL:{description:"Slack Incoming Webhook URL used to report statistics and possible failures"},SLACK_SEND_SUCCESS:{description:"This setting will enable verbose notifications to Slack which are useful for troubleshooting",type:"select",allowMultiple:!1,default:"false",options:[{value:"false",text:"No"},{value:"true",text:"Yes"}]},LOG_LEVEL:{description:"This allows you to specify the log level of events that need to be sent",type:"select",allowMultiple:!0,options:[{value:"-",text:""},{value:"0",text:"Debug"},{value:"1",text:"Info"},{value:"2",text:"Warning"},{value:"3",text:"Error"},{value:"4",text:"Critical"}]},LOG_TYPES:{description:"If you only want to send events with a specific type (eg: failed logins)",type:"select",allowMultiple:!0,options:[{text:"",value:"-"},{text:"Success Login",value:"s"},{text:"Success Exchange",value:"seacft"},{text:"Success Exchange (Client Credentials)",value:"seccft"},{text:"Failed Exchange",value:"feacft"},{text:"Failed Exchange (Client Credentials)",value:"feccft"},{text:"Failed Login",value:"f"},{text:"Warnings During Login",value:"w"},{text:"Deleted User",value:"du"},{text:"Failed Login (invalid email/username)",value:"fu"},{text:"Failed Login (wrong password)",value:"fp"},{text:"Failed by Connector",value:"fc"},{text:"Failed by CORS",value:"fco"},{text:"Connector Online",value:"con"},{text:"Connector Offline",value:"coff"},{text:"Failed Connector Provisioning",value:"fcpro"},{text:"Success Signup",value:"ss"},{text:"Failed Signup",value:"fs"},{text:"Code Sent",value:"cs"},{text:"Code/Link Sent",value:"cls"},{text:"Success Verification Email",value:"sv"},{text:"Failed Verification Email",value:"fv"},{text:"Success Change Password",value:"scp"},{text:"Failed Change Password",value:"fcp"},{text:"Success Change Email",value:"sce"},{text:"Failed Change Email",value:"fce"},{text:"Success Change Username",value:"scu"},{text:"Failed Change Username",value:"fcu"},{text:"Success Change Phone Number",value:"scpn"},{text:"Failed Change Phone Number",value:"fcpn"},{text:"Success Verification Email Request",value:"svr"},{text:"Failed Verification Email Request",value:"fvr"},{text:"Success Change Password Request",value:"scpr"},{text:"Failed Change Password Request",value:"fcpr"},{text:"Failed Sending Notification",value:"fn"},{text:"API Operation",value:"sapi"},{text:"Failed API Operation",value:"fapi"},{text:"Blocked Account",value:"limit_wc"},{text:"Too Many Calls to /userinfo",value:"limit_ui"},{text:"Rate Limit On API",value:"api_limit"},{text:"Successful User Deletion",value:"sdu"},{text:"Failed User Deletion",value:"fdu"},{text:"Blocked Account",value:"limit_wc"},{text:"Blocked IP Address",value:"limit_mu"},{text:"Success Logout",value:"slo"},{text:"Failed Logout",value:"flo"},{text:"Success Delegation",value:"sd"},{text:"Failed Delegation",value:"fd"}]}}}},function(e,t){function r(e){this.message=e}function n(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,i,s=0,a=0,u="";i=t.charAt(a++);~i&&(n=s%4?64*n+i:i,s++%4)?u+=String.fromCharCode(255&n>>(-2*s&6)):0)i=o.indexOf(i);return u}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||n},function(e,t,r){function n(e){return decodeURIComponent(o(e).replace(/(.)/g,function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}var o=r(33);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return n(t)}catch(e){return o(t)}}},function(e,t,r){function n(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function o(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},r=e.name||"Function wrapped with `once`";return t.onceError=r+" shouldn't be called more than once",t.called=!1,t}var i=r(52);e.exports=i(n),e.exports.strict=i(o),n.proto=n(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return n(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return o(this)},configurable:!0})})},function(e,t,r){var n=r(37),o=r(9);e.exports={Logger:n,utils:o}},function(e,t,r){function n(e,t){console.log("ERROR:",e," CONTEXT",t)}function o(e,t){return{message:e,severity:t}}var i=r(49),s=r(5),a=r(9),u=function(e){this._timerID=null,this._timerDuration=0,this.config=this._initializeConfig(e),this.requestOptions=this._initializeRequestOptions(),this.serializedContextQueue=[],this.eventsBatchSize=0,this.eventFormatter=o,this.error=n,this._enableTimer=a.bind(this,this._enableTimer),this._disableTimer=a.bind(this,this._disableTimer),this._initializeConfig=a.bind(this,this._initializeConfig),this._initializeRequestOptions=a.bind(this,this._initializeRequestOptions),this._validateMessage=a.bind(this,this._validateMessage),this._initializeMetadata=a.bind(this,this._initializeMetadata),this._initializeContext=a.bind(this,this._initializeContext),this._makeBody=a.bind(this,this._makeBody),this._post=a.bind(this,this._post),this._sendEvents=a.bind(this,this._sendEvents),this.send=a.bind(this,this.send),this.flush=a.bind(this,this.flush)};u.prototype.levels={DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error"};var c={name:"splunk-javascript-logging/0.9.3",host:"localhost",path:"/services/collector/event/1.0",protocol:"https",port:8088,level:u.prototype.levels.INFO,maxRetries:0,batchInterval:0,maxBatchSize:0,maxBatchCount:1},l={json:!1,strictSSL:!1};u.prototype._disableTimer=function(){this._timerID&&(clearInterval(this._timerID),this._timerDuration=0,this._timerID=null)},u.prototype._enableTimer=function(e){e=a.validateNonNegativeInt(e,"Batch interval"),this._timerID&&this._disableTimer(),this.config&&(this.config.batchInterval=e),this._timerDuration=e;var t=this;this._timerID=setInterval(function(){t.serializedContextQueue.length>0&&t.flush()},e)},u.prototype._initializeConfig=function(e){var t=a.copyObject(this.config);if(!e)throw new Error("Config is required.");if("object"!=typeof e)throw new Error("Config must be an object.");if(!t.hasOwnProperty("token")&&!e.hasOwnProperty("token"))throw new Error("Config object must have a token.");if("string"!=typeof t.token&&"string"!=typeof e.token)throw new Error("Config token must be a string.");if(e.url){var r=s.parse(e.url),n=r.path&&"/"!==r.path;r.protocol&&(e.protocol=r.protocol.replace(":","")),r.port&&(e.port=r.port),r.hostname&&r.path?(e.host=r.hostname,n&&(e.path=r.path)):n&&(e.host=r.path)}if(t.token=a.orByProp("token",e,t),t.name=a.orByProp("name",e,t,c),t.level=a.orByProp("level",e,t,c),t.host=a.orByProp("host",e,t,c),t.path=a.orByProp("path",e,t,c),t.protocol=a.orByProp("protocol",e,t,c),t.port=a.orByFalseyProp("port",e,t,c),t.port=a.validateNonNegativeInt(t.port,"Port"),t.port<1||t.port>65535)throw new Error("Port must be an integer between 1 and 65535, found: "+t.port);t.maxRetries=a.orByProp("maxRetries",e,t,c),t.maxRetries=a.validateNonNegativeInt(t.maxRetries,"Max retries"),t.maxBatchCount=a.orByFalseyProp("maxBatchCount",e,t,c),t.maxBatchCount=a.validateNonNegativeInt(t.maxBatchCount,"Max batch count"),t.maxBatchSize=a.orByFalseyProp("maxBatchSize",e,t,c),t.maxBatchSize=a.validateNonNegativeInt(t.maxBatchSize,"Max batch size"),t.batchInterval=a.orByFalseyProp("batchInterval",e,t,c),t.batchInterval=a.validateNonNegativeInt(t.batchInterval,"Batch interval");var o=!this._timerID&&t.batchInterval>0,i=this._timerID&&this._timerDuration!==t.batchInterval&&t.batchInterval>0;return o||i?this._enableTimer(t.batchInterval):this._timerID&&(t.batchInterval<=0||this._timerDuration<0)&&this._disableTimer(),t},u.prototype._initializeRequestOptions=function(e){var t=a.copyObject(e||l);return e&&(t.json=e.hasOwnProperty("json")?e.json:l.json,t.strictSSL=e.strictSSL||l.strictSSL),t.headers=t.headers||{},t},u.prototype._validateMessage=function(e){if(void 0===e||null===e)throw new Error("Message argument is required.");return e},u.prototype._initializeMetadata=function(e){var t={};return e&&e.hasOwnProperty("metadata")&&(e.metadata.hasOwnProperty("time")&&(t.time=e.metadata.time),e.metadata.hasOwnProperty("host")&&(t.host=e.metadata.host),e.metadata.hasOwnProperty("source")&&(t.source=e.metadata.source),e.metadata.hasOwnProperty("sourcetype")&&(t.sourcetype=e.metadata.sourcetype),e.metadata.hasOwnProperty("index")&&(t.index=e.metadata.index)),t},u.prototype._initializeContext=function(e){if(!e)throw new Error("Context argument is required.");if("object"!=typeof e)throw new Error("Context argument must be an object.");if(!e.hasOwnProperty("message"))throw new Error("Context argument must have the message property set.");return e.message=this._validateMessage(e.message),e.severity=e.severity||c.level,e.metadata=e.metadata||this._initializeMetadata(e),e},u.prototype._makeBody=function(e){if(!e)throw new Error("Context parameter is required.");var t=this._initializeMetadata(e),r=a.formatTime(t.time||Date.now());return t.time=r.toString(),t.event=this.eventFormatter(e.message,e.severity||c.level),t},u.prototype._post=function(e,t){i.post(e,t)},u.prototype._sendEvents=function(e,t){t=t||function(){},this.config=this._initializeConfig(this.config);var r=this._initializeRequestOptions(this.requestOptions);r.body=this._validateMessage(e.message),r.headers.Authorization="Splunk "+this.config.token,r.headers["Content-Type"]="application/x-www-form-urlencoded",r.url=this.config.protocol+"://"+this.config.host+":"+this.config.port+this.config.path,e=this._initializeContext(e);var n=this,o=null,i=null,s=null,u=null,c=0;a.whilst(function(){return c++<=n.config.maxRetries},function(e){n._post(r,function(t,r,l){if(o=null,i=t,s=r,i&&c<=n.config.maxRetries)return a.expBackoff({attempt:c},e);if(i)return e(t);try{u=JSON.parse(l)}catch(t){u=l,o=new Error("Unexpected response from Splunk. Request body was: "+u),o.code=-1}!o&&u&&u.code&&"0"!==u.code.toString()&&(o=new Error(u.text),o.code=u.code),e(!0)})},function(){(i||o)&&n.error(i||o,e),t(i,s,u)})},u.prototype.send=function(e,t){e=this._initializeContext(e);var r=JSON.stringify(this._makeBody(e));this.serializedContextQueue.push(r),this.eventsBatchSize+=Buffer.byteLength(r,"utf8");var n=this.eventsBatchSize>this.config.maxBatchSize&&this.config.maxBatchSize>0,o=this.serializedContextQueue.length>=this.config.maxBatchCount&&this.config.maxBatchCount>0;(n||o)&&this.flush(t||function(){})},u.prototype.flush=function(e){e=e||function(){};var t=this.serializedContextQueue;this.serializedContextQueue=[],this.eventsBatchSize=0;var r=t.join(""),n={message:r};this._sendEvents(n,e)},e.exports=u},function(e,t){e.exports=require("auth0-log-extension-tools@1.3.6")},function(e,t){e.exports=require("body-parser@1.12.4")},function(e,t){e.exports=require("cookie-signature@1.0.6")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("ejs@2.3.1")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("jsonwebtoken@7.1.9")},function(e,t){e.exports=require("jwks-rsa@1.1.1")},function(e,t){e.exports=require("lodash@3.10.1")},function(e,t){e.exports=require("moment@2.10.3")},function(e,t){e.exports=require("morgan@1.5.3")},function(e,t){e.exports=require("request@2.56.0")},function(e,t){e.exports=require("webtask-tools")},function(e,t){e.exports=require("winston@1.0.0")},function(e,t){e.exports=require("wrappy@1.0.1")}]);