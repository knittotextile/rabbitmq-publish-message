var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto = __toESM(require("crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/stringify.js
function stringify(arr, offset = 0) {
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto2.default.createHash("md5").update(bytes).digest();
}
var import_crypto2, md5_default;
var init_md5 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/md5.js"() {
    import_crypto2 = __toESM(require("crypto"));
    md5_default = md5;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto3.default.createHash("sha1").update(bytes).digest();
}
var import_crypto3, sha1_default;
var init_sha1 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/sha1.js"() {
    import_crypto3 = __toESM(require("crypto"));
    sha1_default = sha1;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
    var fs = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var uuid_1 = (init_esm_node(), __toCommonJS(esm_node_exports));
    var utils_1 = require_utils();
    function issueFileCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueFileCommand = issueFileCommand;
    function prepareKeyValueMessage(key, value) {
      const delimiter = `ghadelimiter_${uuid_1.v4()}`;
      const convertedValue = utils_1.toCommandValue(value);
      if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
      }
      if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
      }
      return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
    }
    exports.prepareKeyValueMessage = prepareKeyValueMessage;
  }
});

// node_modules/.pnpm/@actions+http-client@2.0.1/node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/.pnpm/@actions+http-client@2.0.1/node_modules/@actions/http-client/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkBypass = exports.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self2.requests.length; i < len; ++i) {
          var pending = self2.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self2.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self2 = this;
      var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push(options);
        return;
      }
      self2.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self2.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self2.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.debug = debug;
  }
});

// node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/index.js"(exports, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/.pnpm/@actions+http-client@2.0.1/node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/@actions+http-client@2.0.1/node_modules/@actions/http-client/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class _HttpClientError extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, _HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve(output.toString());
            });
          }));
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      /**
       * Gets a typed object from an endpoint
       * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
       */
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      /**
       * Makes a raw http request.
       * All other methods such as get, post, patch, and request ultimately call this.
       * Prefer get, del, post and patch
       */
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      /**
       * Needs to be called if keepAlive is set to true in request options.
       */
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      /**
       * Raw request.
       * @param info
       * @param data
       */
      requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        });
      }
      /**
       * Raw request with callback.
       * @param info
       * @param data
       * @param onResult
       */
      requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
          if (!info.options.headers) {
            info.options.headers = {};
          }
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info.httpModule.request(info.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      /**
       * Gets an http agent. This function is useful when you need an http agent that handles
       * routing through a proxy server - depending upon the url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info.options);
          }
        }
        return info;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          }));
        });
      }
    };
    exports.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/.pnpm/@actions+http-client@2.0.1/node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/.pnpm/@actions+http-client@2.0.1/node_modules/@actions/http-client/lib/auth.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      // currently implements pre-authorization
      // TODO: support preAuth = false where it hooks on 401
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      // currently implements pre-authorization
      // TODO: support preAuth = false where it hooks on 401
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class _OidcClient {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(_OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = _OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = _OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield _OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/summary.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  }
});

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/path-utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
    var path = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path.sep);
    }
    exports.toPlatformPath = toPlatformPath;
  }
});

// node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("ENV", file_command_1.prepareKeyValueMessage(name, val));
      }
      command_1.issueCommand("set-env", { name }, convertedVal);
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueFileCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput2;
    function getMultilineInput(name, options) {
      const inputs = getInput2(name, options).split("\n").filter((x) => x !== "");
      if (options && options.trimWhitespace === false) {
        return inputs;
      }
      return inputs.map((input) => input.trim());
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput2(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("OUTPUT", file_command_1.prepareKeyValueMessage(name, value));
      }
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name }, utils_1.toCommandValue(value));
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed2(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed2;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      const filePath = process.env["GITHUB_STATE"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("STATE", file_command_1.prepareKeyValueMessage(name, value));
      }
      command_1.issueCommand("save-state", { name }, utils_1.toCommandValue(value));
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js"(exports, module2) {
    "use strict";
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port)
        return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// node_modules/.pnpm/querystringify@2.2.0/node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/.pnpm/querystringify@2.2.0/node_modules/querystringify/index.js"(exports) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode(part[1]), value = decode(part[2]);
        if (key === null || value === null || key in result)
          continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix)
        prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null)
            continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// node_modules/.pnpm/url-parse@1.5.10/node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/.pnpm/url-parse@1.5.10/node_modules/url-parse/index.js"(exports, module2) {
    "use strict";
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined")
        globalVar = window;
      else if (typeof global !== "undefined")
        globalVar = global;
      else if (typeof self !== "undefined")
        globalVar = self;
      else
        globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore)
          delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore)
            continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "")
        return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path[i] === ".") {
          path.splice(i, 1);
        } else if (path[i] === "..") {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0)
            unshift = true;
          path.splice(i, 1);
          up--;
        }
      }
      if (unshift)
        path.unshift("");
      if (last === "." || last === "..")
        path.push("");
      return path.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse2, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser)
        parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse2 = instruction[0];
        key = instruction[1];
        if (parse2 !== parse2) {
          url[key] = address;
        } else if ("string" === typeof parse2) {
          index = parse2 === "@" ? address.lastIndexOf(parse2) : address.indexOf(parse2);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse2.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4])
          url[key] = url[key].toLowerCase();
      }
      if (parser)
        url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port)
            value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4])
          url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify2) {
      if (!stringify2 || "function" !== typeof stringify2)
        stringify2 = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password)
          result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify2(url.query) : url.query;
      if (query)
        result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash)
        result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// node_modules/.pnpm/buffer-more-ints@1.0.0/node_modules/buffer-more-ints/buffer-more-ints.js
var require_buffer_more_ints = __commonJS({
  "node_modules/.pnpm/buffer-more-ints@1.0.0/node_modules/buffer-more-ints/buffer-more-ints.js"(exports, module2) {
    "use strict";
    var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
    var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
    var MAX_INT = 9007199254740991;
    function isContiguousInt(val) {
      return val <= MAX_INT && val >= -MAX_INT;
    }
    function assertContiguousInt(val) {
      if (!isContiguousInt(val)) {
        throw new TypeError("number cannot be represented as a contiguous integer");
      }
    }
    module2.exports.isContiguousInt = isContiguousInt;
    module2.exports.assertContiguousInt = assertContiguousInt;
    ["UInt", "Int"].forEach(function(sign) {
      var suffix = sign + "8";
      module2.exports["read" + suffix] = Buffer.prototype["read" + suffix].call;
      module2.exports["write" + suffix] = Buffer.prototype["write" + suffix].call;
      ["16", "32"].forEach(function(size) {
        ["LE", "BE"].forEach(function(endian) {
          var suffix2 = sign + size + endian;
          var read = Buffer.prototype["read" + suffix2];
          module2.exports["read" + suffix2] = function(buf, offset) {
            return read.call(buf, offset);
          };
          var write = Buffer.prototype["write" + suffix2];
          module2.exports["write" + suffix2] = function(buf, val, offset) {
            return write.call(buf, val, offset);
          };
        });
      });
    });
    function check_value(val, min, max) {
      val = +val;
      if (typeof val != "number" || val < min || val > max || Math.floor(val) !== val) {
        throw new TypeError('"value" argument is out of bounds');
      }
      return val;
    }
    function check_bounds(buf, offset, len) {
      if (offset < 0 || offset + len > buf.length) {
        throw new RangeError("Index out of range");
      }
    }
    function readUInt24BE(buf, offset) {
      return buf.readUInt8(offset) << 16 | buf.readUInt16BE(offset + 1);
    }
    module2.exports.readUInt24BE = readUInt24BE;
    function writeUInt24BE(buf, val, offset) {
      val = check_value(val, 0, 16777215);
      check_bounds(buf, offset, 3);
      buf.writeUInt8(val >>> 16, offset);
      buf.writeUInt16BE(val & 65535, offset + 1);
    }
    module2.exports.writeUInt24BE = writeUInt24BE;
    function readUInt40BE(buf, offset) {
      return (buf.readUInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
    }
    module2.exports.readUInt40BE = readUInt40BE;
    function writeUInt40BE(buf, val, offset) {
      val = check_value(val, 0, 1099511627775);
      check_bounds(buf, offset, 5);
      buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 1);
    }
    module2.exports.writeUInt40BE = writeUInt40BE;
    function readUInt48BE(buf, offset) {
      return buf.readUInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
    }
    module2.exports.readUInt48BE = readUInt48BE;
    function writeUInt48BE(buf, val, offset) {
      val = check_value(val, 0, 281474976710655);
      check_bounds(buf, offset, 6);
      buf.writeUInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 2);
    }
    module2.exports.writeUInt48BE = writeUInt48BE;
    function readUInt56BE(buf, offset) {
      return ((buf.readUInt8(offset) || 0) << 16 | buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
    }
    module2.exports.readUInt56BE = readUInt56BE;
    function writeUInt56BE(buf, val, offset) {
      val = check_value(val, 0, 72057594037927940);
      check_bounds(buf, offset, 7);
      if (val < 72057594037927940) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt8(hi >>> 16, offset);
        buf.writeUInt16BE(hi & 65535, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module2.exports.writeUInt56BE = writeUInt56BE;
    function readUInt64BE(buf, offset) {
      return buf.readUInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
    }
    module2.exports.readUInt64BE = readUInt64BE;
    function writeUInt64BE(buf, val, offset) {
      val = check_value(val, 0, 18446744073709552e3);
      check_bounds(buf, offset, 8);
      if (val < 18446744073709552e3) {
        buf.writeUInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module2.exports.writeUInt64BE = writeUInt64BE;
    function readUInt24LE(buf, offset) {
      return buf.readUInt8(offset + 2) << 16 | buf.readUInt16LE(offset);
    }
    module2.exports.readUInt24LE = readUInt24LE;
    function writeUInt24LE(buf, val, offset) {
      val = check_value(val, 0, 16777215);
      check_bounds(buf, offset, 3);
      buf.writeUInt16LE(val & 65535, offset);
      buf.writeUInt8(val >>> 16, offset + 2);
    }
    module2.exports.writeUInt24LE = writeUInt24LE;
    function readUInt40LE(buf, offset) {
      return (buf.readUInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt40LE = readUInt40LE;
    function writeUInt40LE(buf, val, offset) {
      val = check_value(val, 0, 1099511627775);
      check_bounds(buf, offset, 5);
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeUInt40LE = writeUInt40LE;
    function readUInt48LE(buf, offset) {
      return buf.readUInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt48LE = readUInt48LE;
    function writeUInt48LE(buf, val, offset) {
      val = check_value(val, 0, 281474976710655);
      check_bounds(buf, offset, 6);
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeUInt48LE = writeUInt48LE;
    function readUInt56LE(buf, offset) {
      return ((buf.readUInt8(offset + 6) || 0) << 16 | buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt56LE = readUInt56LE;
    function writeUInt56LE(buf, val, offset) {
      val = check_value(val, 0, 72057594037927940);
      check_bounds(buf, offset, 7);
      if (val < 72057594037927940) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 65535, offset + 4);
        buf.writeUInt8(hi >>> 16, offset + 6);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module2.exports.writeUInt56LE = writeUInt56LE;
    function readUInt64LE(buf, offset) {
      return buf.readUInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt64LE = readUInt64LE;
    function writeUInt64LE(buf, val, offset) {
      val = check_value(val, 0, 18446744073709552e3);
      check_bounds(buf, offset, 8);
      if (val < 18446744073709552e3) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module2.exports.writeUInt64LE = writeUInt64LE;
    function readInt24BE(buf, offset) {
      return (buf.readInt8(offset) << 16) + buf.readUInt16BE(offset + 1);
    }
    module2.exports.readInt24BE = readInt24BE;
    function writeInt24BE(buf, val, offset) {
      val = check_value(val, -8388608, 8388607);
      check_bounds(buf, offset, 3);
      buf.writeInt8(val >> 16, offset);
      buf.writeUInt16BE(val & 65535, offset + 1);
    }
    module2.exports.writeInt24BE = writeInt24BE;
    function readInt40BE(buf, offset) {
      return (buf.readInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
    }
    module2.exports.readInt40BE = readInt40BE;
    function writeInt40BE(buf, val, offset) {
      val = check_value(val, -549755813888, 549755813887);
      check_bounds(buf, offset, 5);
      buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 1);
    }
    module2.exports.writeInt40BE = writeInt40BE;
    function readInt48BE(buf, offset) {
      return buf.readInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
    }
    module2.exports.readInt48BE = readInt48BE;
    function writeInt48BE(buf, val, offset) {
      val = check_value(val, -140737488355328, 140737488355327);
      check_bounds(buf, offset, 6);
      buf.writeInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 2);
    }
    module2.exports.writeInt48BE = writeInt48BE;
    function readInt56BE(buf, offset) {
      return (((buf.readInt8(offset) || 0) << 16) + buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
    }
    module2.exports.readInt56BE = readInt56BE;
    function writeInt56BE(buf, val, offset) {
      val = check_value(val, -576460752303423500, 36028797018963970);
      check_bounds(buf, offset, 7);
      if (val < 36028797018963970) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeInt8(hi >> 16, offset);
        buf.writeUInt16BE(hi & 65535, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
      } else {
        buf[offset] = 127;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module2.exports.writeInt56BE = writeInt56BE;
    function readInt64BE(buf, offset) {
      return buf.readInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
    }
    module2.exports.readInt64BE = readInt64BE;
    function writeInt64BE(buf, val, offset) {
      val = check_value(val, -23611832414348226e5, 9223372036854776e3);
      check_bounds(buf, offset, 8);
      if (val < 9223372036854776e3) {
        buf.writeInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
      } else {
        buf[offset] = 127;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module2.exports.writeInt64BE = writeInt64BE;
    function readInt24LE(buf, offset) {
      return (buf.readInt8(offset + 2) << 16) + buf.readUInt16LE(offset);
    }
    module2.exports.readInt24LE = readInt24LE;
    function writeInt24LE(buf, val, offset) {
      val = check_value(val, -8388608, 8388607);
      check_bounds(buf, offset, 3);
      buf.writeUInt16LE(val & 65535, offset);
      buf.writeInt8(val >> 16, offset + 2);
    }
    module2.exports.writeInt24LE = writeInt24LE;
    function readInt40LE(buf, offset) {
      return (buf.readInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt40LE = readInt40LE;
    function writeInt40LE(buf, val, offset) {
      val = check_value(val, -549755813888, 549755813887);
      check_bounds(buf, offset, 5);
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeInt40LE = writeInt40LE;
    function readInt48LE(buf, offset) {
      return buf.readInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt48LE = readInt48LE;
    function writeInt48LE(buf, val, offset) {
      val = check_value(val, -140737488355328, 140737488355327);
      check_bounds(buf, offset, 6);
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeInt48LE = writeInt48LE;
    function readInt56LE(buf, offset) {
      return (((buf.readInt8(offset + 6) || 0) << 16) + buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt56LE = readInt56LE;
    function writeInt56LE(buf, val, offset) {
      val = check_value(val, -36028797018963970, 36028797018963970);
      check_bounds(buf, offset, 7);
      if (val < 36028797018963970) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 65535, offset + 4);
        buf.writeInt8(hi >> 16, offset + 6);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 127;
      }
    }
    module2.exports.writeInt56LE = writeInt56LE;
    function readInt64LE(buf, offset) {
      return buf.readInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt64LE = readInt64LE;
    function writeInt64LE(buf, val, offset) {
      val = check_value(val, -9223372036854776e3, 9223372036854776e3);
      check_bounds(buf, offset, 8);
      if (val < 9223372036854776e3) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 127;
      }
    }
    module2.exports.writeInt64LE = writeInt64LE;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/codec.js
var require_codec = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/codec.js"(exports, module2) {
    "use strict";
    var ints = require_buffer_more_ints();
    function isFloatingPoint(n) {
      return n >= 9223372036854776e3 || Math.abs(n) < 1125899906842624 && Math.floor(n) !== n;
    }
    function encodeTable(buffer, val, offset) {
      var start = offset;
      offset += 4;
      for (var key in val) {
        if (val[key] !== void 0) {
          var len = Buffer.byteLength(key);
          buffer.writeUInt8(len, offset);
          offset++;
          buffer.write(key, offset, "utf8");
          offset += len;
          offset += encodeFieldValue(buffer, val[key], offset);
        }
      }
      var size = offset - start;
      buffer.writeUInt32BE(size - 4, start);
      return size;
    }
    function encodeArray(buffer, val, offset) {
      var start = offset;
      offset += 4;
      for (var i = 0, num = val.length; i < num; i++) {
        offset += encodeFieldValue(buffer, val[i], offset);
      }
      var size = offset - start;
      buffer.writeUInt32BE(size - 4, start);
      return size;
    }
    function encodeFieldValue(buffer, value, offset) {
      var start = offset;
      var type = typeof value, val = value;
      if (value && type === "object" && value.hasOwnProperty("!")) {
        val = value.value;
        type = value["!"];
      }
      if (type == "number") {
        if (isFloatingPoint(val)) {
          type = "double";
        } else {
          if (val < 128 && val >= -128) {
            type = "byte";
          } else if (val >= -32768 && val < 32768) {
            type = "short";
          } else if (val >= -2147483648 && val < 2147483648) {
            type = "int";
          } else {
            type = "long";
          }
        }
      }
      function tag(t) {
        buffer.write(t, offset);
        offset++;
      }
      switch (type) {
        case "string":
          var len = Buffer.byteLength(val, "utf8");
          tag("S");
          buffer.writeUInt32BE(len, offset);
          offset += 4;
          buffer.write(val, offset, "utf8");
          offset += len;
          break;
        case "object":
          if (val === null) {
            tag("V");
          } else if (Array.isArray(val)) {
            tag("A");
            offset += encodeArray(buffer, val, offset);
          } else if (Buffer.isBuffer(val)) {
            tag("x");
            buffer.writeUInt32BE(val.length, offset);
            offset += 4;
            val.copy(buffer, offset);
            offset += val.length;
          } else {
            tag("F");
            offset += encodeTable(buffer, val, offset);
          }
          break;
        case "boolean":
          tag("t");
          buffer.writeUInt8(val ? 1 : 0, offset);
          offset++;
          break;
        case "double":
        case "float64":
          tag("d");
          buffer.writeDoubleBE(val, offset);
          offset += 8;
          break;
        case "byte":
        case "int8":
          tag("b");
          buffer.writeInt8(val, offset);
          offset++;
          break;
        case "short":
        case "int16":
          tag("s");
          buffer.writeInt16BE(val, offset);
          offset += 2;
          break;
        case "int":
        case "int32":
          tag("I");
          buffer.writeInt32BE(val, offset);
          offset += 4;
          break;
        case "long":
        case "int64":
          tag("l");
          ints.writeInt64BE(buffer, val, offset);
          offset += 8;
          break;
        case "timestamp":
          tag("T");
          ints.writeUInt64BE(buffer, val, offset);
          offset += 8;
          break;
        case "float":
          tag("f");
          buffer.writeFloatBE(val, offset);
          offset += 4;
          break;
        case "decimal":
          tag("D");
          if (val.hasOwnProperty("places") && val.hasOwnProperty("digits") && val.places >= 0 && val.places < 256) {
            buffer[offset] = val.places;
            offset++;
            buffer.writeUInt32BE(val.digits, offset);
            offset += 4;
          } else
            throw new TypeError(
              "Decimal value must be {'places': 0..255, 'digits': uint32}, got " + JSON.stringify(val)
            );
          break;
        default:
          throw new TypeError("Unknown type to encode: " + type);
      }
      return offset - start;
    }
    function decodeFields(slice) {
      var fields = {}, offset = 0, size = slice.length;
      var len, key, val;
      function decodeFieldValue() {
        var tag = String.fromCharCode(slice[offset]);
        offset++;
        switch (tag) {
          case "b":
            val = slice.readInt8(offset);
            offset++;
            break;
          case "S":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = slice.toString("utf8", offset, offset + len);
            offset += len;
            break;
          case "I":
            val = slice.readInt32BE(offset);
            offset += 4;
            break;
          case "D":
            var places = slice[offset];
            offset++;
            var digits = slice.readUInt32BE(offset);
            offset += 4;
            val = { "!": "decimal", value: { places, digits } };
            break;
          case "T":
            val = ints.readUInt64BE(slice, offset);
            offset += 8;
            val = { "!": "timestamp", value: val };
            break;
          case "F":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = decodeFields(slice.slice(offset, offset + len));
            offset += len;
            break;
          case "A":
            len = slice.readUInt32BE(offset);
            offset += 4;
            decodeArray(offset + len);
            break;
          case "d":
            val = slice.readDoubleBE(offset);
            offset += 8;
            break;
          case "f":
            val = slice.readFloatBE(offset);
            offset += 4;
            break;
          case "l":
            val = ints.readInt64BE(slice, offset);
            offset += 8;
            break;
          case "s":
            val = slice.readInt16BE(offset);
            offset += 2;
            break;
          case "t":
            val = slice[offset] != 0;
            offset++;
            break;
          case "V":
            val = null;
            break;
          case "x":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = slice.slice(offset, offset + len);
            offset += len;
            break;
          default:
            throw new TypeError('Unexpected type tag "' + tag + '"');
        }
      }
      function decodeArray(until) {
        var vals = [];
        while (offset < until) {
          decodeFieldValue();
          vals.push(val);
        }
        val = vals;
      }
      while (offset < size) {
        len = slice.readUInt8(offset);
        offset++;
        key = slice.toString("utf8", offset, offset + len);
        offset += len;
        decodeFieldValue();
        fields[key] = val;
      }
      return fields;
    }
    module2.exports.encodeTable = encodeTable;
    module2.exports.decodeFields = decodeFields;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/defs.js
var require_defs = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/defs.js"(exports, module2) {
    "use strict";
    function decodeConnectionStart(buffer) {
      var val, len, offset = 0, fields = {
        versionMajor: void 0,
        versionMinor: void 0,
        serverProperties: void 0,
        mechanisms: void 0,
        locales: void 0
      };
      val = buffer[offset];
      offset++;
      fields.versionMajor = val;
      val = buffer[offset];
      offset++;
      fields.versionMinor = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.serverProperties = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.slice(offset, offset + len);
      offset += len;
      fields.mechanisms = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.slice(offset, offset + len);
      offset += len;
      fields.locales = val;
      return fields;
    }
    function encodeConnectionStart(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.serverProperties;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'serverProperties'");
      if ("object" != typeof val)
        throw new TypeError("Field 'serverProperties' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var serverProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += serverProperties_encoded.length;
      val = fields.mechanisms;
      if (void 0 === val)
        val = Buffer.from("PLAIN");
      else if (!Buffer.isBuffer(val))
        throw new TypeError("Field 'mechanisms' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.locales;
      if (void 0 === val)
        val = Buffer.from("en_US");
      else if (!Buffer.isBuffer(val))
        throw new TypeError("Field 'locales' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(22 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655370, 7);
      offset = 11;
      val = fields.versionMajor;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'versionMajor' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt8(val, offset);
      offset++;
      val = fields.versionMinor;
      if (void 0 === val)
        val = 9;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'versionMinor' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt8(val, offset);
      offset++;
      offset += serverProperties_encoded.copy(buffer, offset);
      val = fields.mechanisms;
      void 0 === val && (val = Buffer.from("PLAIN"));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.locales;
      void 0 === val && (val = Buffer.from("en_US"));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionStartOk(buffer) {
      var val, len, offset = 0, fields = {
        clientProperties: void 0,
        mechanism: void 0,
        response: void 0,
        locale: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.clientProperties = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.mechanism = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.slice(offset, offset + len);
      offset += len;
      fields.response = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.locale = val;
      return fields;
    }
    function encodeConnectionStartOk(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.clientProperties;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'clientProperties'");
      if ("object" != typeof val)
        throw new TypeError("Field 'clientProperties' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var clientProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += clientProperties_encoded.length;
      val = fields.mechanism;
      if (void 0 === val)
        val = "PLAIN";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'mechanism' is the wrong type; must be a string (up to 255 chars)");
      var mechanism_len = Buffer.byteLength(val, "utf8");
      varyingSize += mechanism_len;
      val = fields.response;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'response'");
      if (!Buffer.isBuffer(val))
        throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.locale;
      if (void 0 === val)
        val = "en_US";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'locale' is the wrong type; must be a string (up to 255 chars)");
      var locale_len = Buffer.byteLength(val, "utf8");
      varyingSize += locale_len;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655371, 7);
      offset = 11;
      offset += clientProperties_encoded.copy(buffer, offset);
      val = fields.mechanism;
      void 0 === val && (val = "PLAIN");
      buffer[offset] = mechanism_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += mechanism_len;
      val = fields.response;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.locale;
      void 0 === val && (val = "en_US");
      buffer[offset] = locale_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += locale_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionSecure(buffer) {
      var val, len, offset = 0, fields = {
        challenge: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.slice(offset, offset + len);
      offset += len;
      fields.challenge = val;
      return fields;
    }
    function encodeConnectionSecure(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.challenge;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'challenge'");
      if (!Buffer.isBuffer(val))
        throw new TypeError("Field 'challenge' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655380, 7);
      offset = 11;
      val = fields.challenge;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionSecureOk(buffer) {
      var val, len, offset = 0, fields = {
        response: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.slice(offset, offset + len);
      offset += len;
      fields.response = val;
      return fields;
    }
    function encodeConnectionSecureOk(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.response;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'response'");
      if (!Buffer.isBuffer(val))
        throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655381, 7);
      offset = 11;
      val = fields.response;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionTune(buffer) {
      var val, offset = 0, fields = {
        channelMax: void 0,
        frameMax: void 0,
        heartbeat: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.channelMax = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.frameMax = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.heartbeat = val;
      return fields;
    }
    function encodeConnectionTune(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(20);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655390, 7);
      offset = 11;
      val = fields.channelMax;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.frameMax;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.heartbeat;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionTuneOk(buffer) {
      var val, offset = 0, fields = {
        channelMax: void 0,
        frameMax: void 0,
        heartbeat: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.channelMax = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.frameMax = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.heartbeat = val;
      return fields;
    }
    function encodeConnectionTuneOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(20);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655391, 7);
      offset = 11;
      val = fields.channelMax;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.frameMax;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.heartbeat;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionOpen(buffer) {
      var val, len, offset = 0, fields = {
        virtualHost: void 0,
        capabilities: void 0,
        insist: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.virtualHost = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.capabilities = val;
      val = !!(1 & buffer[offset]);
      fields.insist = val;
      return fields;
    }
    function encodeConnectionOpen(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.virtualHost;
      if (void 0 === val)
        val = "/";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'virtualHost' is the wrong type; must be a string (up to 255 chars)");
      var virtualHost_len = Buffer.byteLength(val, "utf8");
      varyingSize += virtualHost_len;
      val = fields.capabilities;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'capabilities' is the wrong type; must be a string (up to 255 chars)");
      var capabilities_len = Buffer.byteLength(val, "utf8");
      varyingSize += capabilities_len;
      var buffer = Buffer.alloc(15 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655400, 7);
      offset = 11;
      val = fields.virtualHost;
      void 0 === val && (val = "/");
      buffer[offset] = virtualHost_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += virtualHost_len;
      val = fields.capabilities;
      void 0 === val && (val = "");
      buffer[offset] = capabilities_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += capabilities_len;
      val = fields.insist;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionOpenOk(buffer) {
      var val, len, offset = 0, fields = {
        knownHosts: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.knownHosts = val;
      return fields;
    }
    function encodeConnectionOpenOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.knownHosts;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'knownHosts' is the wrong type; must be a string (up to 255 chars)");
      var knownHosts_len = Buffer.byteLength(val, "utf8");
      varyingSize += knownHosts_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655401, 7);
      offset = 11;
      val = fields.knownHosts;
      void 0 === val && (val = "");
      buffer[offset] = knownHosts_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += knownHosts_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionClose(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        classId: void 0,
        methodId: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.classId = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.methodId = val;
      return fields;
    }
    function encodeConnectionClose(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      var buffer = Buffer.alloc(19 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655410, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.classId;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'classId'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.methodId;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'methodId'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionCloseOk(buffer) {
      return {};
    }
    function encodeConnectionCloseOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655411, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionBlocked(buffer) {
      var val, len, offset = 0, fields = {
        reason: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.reason = val;
      return fields;
    }
    function encodeConnectionBlocked(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.reason;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
      var reason_len = Buffer.byteLength(val, "utf8");
      varyingSize += reason_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655420, 7);
      offset = 11;
      val = fields.reason;
      void 0 === val && (val = "");
      buffer[offset] = reason_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += reason_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUnblocked(buffer) {
      return {};
    }
    function encodeConnectionUnblocked(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655421, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelOpen(buffer) {
      var val, len, offset = 0, fields = {
        outOfBand: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.outOfBand = val;
      return fields;
    }
    function encodeChannelOpen(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.outOfBand;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'outOfBand' is the wrong type; must be a string (up to 255 chars)");
      var outOfBand_len = Buffer.byteLength(val, "utf8");
      varyingSize += outOfBand_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310730, 7);
      offset = 11;
      val = fields.outOfBand;
      void 0 === val && (val = "");
      buffer[offset] = outOfBand_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += outOfBand_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelOpenOk(buffer) {
      var val, len, offset = 0, fields = {
        channelId: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.slice(offset, offset + len);
      offset += len;
      fields.channelId = val;
      return fields;
    }
    function encodeChannelOpenOk(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.channelId;
      if (void 0 === val)
        val = Buffer.from("");
      else if (!Buffer.isBuffer(val))
        throw new TypeError("Field 'channelId' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310731, 7);
      offset = 11;
      val = fields.channelId;
      void 0 === val && (val = Buffer.from(""));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelFlow(buffer) {
      var val, fields = {
        active: void 0
      };
      val = !!(1 & buffer[0]);
      fields.active = val;
      return fields;
    }
    function encodeChannelFlow(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310740, 7);
      offset = 11;
      val = fields.active;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'active'");
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelFlowOk(buffer) {
      var val, fields = {
        active: void 0
      };
      val = !!(1 & buffer[0]);
      fields.active = val;
      return fields;
    }
    function encodeChannelFlowOk(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310741, 7);
      offset = 11;
      val = fields.active;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'active'");
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelClose(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        classId: void 0,
        methodId: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.classId = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.methodId = val;
      return fields;
    }
    function encodeChannelClose(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      var buffer = Buffer.alloc(19 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310760, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.classId;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'classId'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.methodId;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'methodId'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelCloseOk(buffer) {
      return {};
    }
    function encodeChannelCloseOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310761, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeAccessRequest(buffer) {
      var val, len, offset = 0, fields = {
        realm: void 0,
        exclusive: void 0,
        passive: void 0,
        active: void 0,
        write: void 0,
        read: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.realm = val;
      val = !!(1 & buffer[offset]);
      fields.exclusive = val;
      val = !!(2 & buffer[offset]);
      fields.passive = val;
      val = !!(4 & buffer[offset]);
      fields.active = val;
      val = !!(8 & buffer[offset]);
      fields.write = val;
      val = !!(16 & buffer[offset]);
      fields.read = val;
      return fields;
    }
    function encodeAccessRequest(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.realm;
      if (void 0 === val)
        val = "/data";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'realm' is the wrong type; must be a string (up to 255 chars)");
      var realm_len = Buffer.byteLength(val, "utf8");
      varyingSize += realm_len;
      var buffer = Buffer.alloc(14 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1966090, 7);
      offset = 11;
      val = fields.realm;
      void 0 === val && (val = "/data");
      buffer[offset] = realm_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += realm_len;
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.passive;
      void 0 === val && (val = true);
      val && (bits += 2);
      val = fields.active;
      void 0 === val && (val = true);
      val && (bits += 4);
      val = fields.write;
      void 0 === val && (val = true);
      val && (bits += 8);
      val = fields.read;
      void 0 === val && (val = true);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeAccessRequestOk(buffer) {
      var val, offset = 0, fields = {
        ticket: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      return fields;
    }
    function encodeAccessRequestOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(14);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1966091, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 1;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeclare(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        type: void 0,
        passive: void 0,
        durable: void 0,
        autoDelete: void 0,
        internal: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.type = val;
      val = !!(1 & buffer[offset]);
      fields.passive = val;
      val = !!(2 & buffer[offset]);
      fields.durable = val;
      val = !!(4 & buffer[offset]);
      fields.autoDelete = val;
      val = !!(8 & buffer[offset]);
      fields.internal = val;
      val = !!(16 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeDeclare(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.type;
      if (void 0 === val)
        val = "direct";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
      var type_len = Buffer.byteLength(val, "utf8");
      varyingSize += type_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621450, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.type;
      void 0 === val && (val = "direct");
      buffer[offset] = type_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += type_len;
      val = fields.passive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.durable;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.autoDelete;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.internal;
      void 0 === val && (val = false);
      val && (bits += 8);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeclareOk(buffer) {
      return {};
    }
    function encodeExchangeDeclareOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621451, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDelete(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        ifUnused: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      val = !!(1 & buffer[offset]);
      fields.ifUnused = val;
      val = !!(2 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeExchangeDelete(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621460, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.ifUnused;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeleteOk(buffer) {
      return {};
    }
    function encodeExchangeDeleteOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621461, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeBind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        destination: void 0,
        source: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.destination = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.source = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeBind(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.destination;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'destination'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
      var destination_len = Buffer.byteLength(val, "utf8");
      varyingSize += destination_len;
      val = fields.source;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'source'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
      var source_len = Buffer.byteLength(val, "utf8");
      varyingSize += source_len;
      val = fields.routingKey;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621470, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.destination;
      void 0 === val && (val = void 0);
      buffer[offset] = destination_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += destination_len;
      val = fields.source;
      void 0 === val && (val = void 0);
      buffer[offset] = source_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += source_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeBindOk(buffer) {
      return {};
    }
    function encodeExchangeBindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621471, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeUnbind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        destination: void 0,
        source: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.destination = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.source = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeUnbind(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.destination;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'destination'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
      var destination_len = Buffer.byteLength(val, "utf8");
      varyingSize += destination_len;
      val = fields.source;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'source'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
      var source_len = Buffer.byteLength(val, "utf8");
      varyingSize += source_len;
      val = fields.routingKey;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621480, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.destination;
      void 0 === val && (val = void 0);
      buffer[offset] = destination_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += destination_len;
      val = fields.source;
      void 0 === val && (val = void 0);
      buffer[offset] = source_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += source_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeUnbindOk(buffer) {
      return {};
    }
    function encodeExchangeUnbindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621491, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeclare(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        passive: void 0,
        durable: void 0,
        exclusive: void 0,
        autoDelete: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.passive = val;
      val = !!(2 & buffer[offset]);
      fields.durable = val;
      val = !!(4 & buffer[offset]);
      fields.exclusive = val;
      val = !!(8 & buffer[offset]);
      fields.autoDelete = val;
      val = !!(16 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueDeclare(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276810, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.passive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.durable;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.autoDelete;
      void 0 === val && (val = false);
      val && (bits += 8);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeclareOk(buffer) {
      var val, len, offset = 0, fields = {
        queue: void 0,
        messageCount: void 0,
        consumerCount: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.consumerCount = val;
      return fields;
    }
    function encodeQueueDeclareOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'queue'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(21 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276811, 7);
      offset = 11;
      val = fields.queue;
      void 0 === val && (val = void 0);
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.messageCount;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.consumerCount;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'consumerCount'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'consumerCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueBind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        exchange: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueBind(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276820, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueBindOk(buffer) {
      return {};
    }
    function encodeQueueBindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276821, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueuePurge(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeQueuePurge(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276830, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueuePurgeOk(buffer) {
      var val, offset = 0, fields = {
        messageCount: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeQueuePurgeOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(16);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276831, 7);
      offset = 11;
      val = fields.messageCount;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDelete(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        ifUnused: void 0,
        ifEmpty: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.ifUnused = val;
      val = !!(2 & buffer[offset]);
      fields.ifEmpty = val;
      val = !!(4 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeQueueDelete(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276840, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.ifUnused;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.ifEmpty;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 4);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeleteOk(buffer) {
      var val, offset = 0, fields = {
        messageCount: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeQueueDeleteOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(16);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276841, 7);
      offset = 11;
      val = fields.messageCount;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueUnbind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        exchange: void 0,
        routingKey: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueUnbind(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276850, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueUnbindOk(buffer) {
      return {};
    }
    function encodeQueueUnbindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276851, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicQos(buffer) {
      var val, offset = 0, fields = {
        prefetchSize: void 0,
        prefetchCount: void 0,
        global: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.prefetchSize = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.prefetchCount = val;
      val = !!(1 & buffer[offset]);
      fields.global = val;
      return fields;
    }
    function encodeBasicQos(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(19);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932170, 7);
      offset = 11;
      val = fields.prefetchSize;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'prefetchSize' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.prefetchCount;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'prefetchCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.global;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicQosOk(buffer) {
      return {};
    }
    function encodeBasicQosOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932171, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicConsume(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        consumerTag: void 0,
        noLocal: void 0,
        noAck: void 0,
        exclusive: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = !!(1 & buffer[offset]);
      fields.noLocal = val;
      val = !!(2 & buffer[offset]);
      fields.noAck = val;
      val = !!(4 & buffer[offset]);
      fields.exclusive = val;
      val = !!(8 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeBasicConsume(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.consumerTag;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      val = fields.arguments;
      if (void 0 === val)
        val = {};
      else if ("object" != typeof val)
        throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932180, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.consumerTag;
      void 0 === val && (val = "");
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.noLocal;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.noAck;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 8);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicConsumeOk(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      return fields;
    }
    function encodeBasicConsumeOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932181, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicCancel(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0,
        nowait: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeBasicCancel(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(14 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932190, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicCancelOk(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      return fields;
    }
    function encodeBasicCancelOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932191, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicPublish(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        routingKey: void 0,
        mandatory: void 0,
        immediate: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.mandatory = val;
      val = !!(2 & buffer[offset]);
      fields.immediate = val;
      return fields;
    }
    function encodeBasicPublish(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932200, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = "");
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.mandatory;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.immediate;
      void 0 === val && (val = false);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicReturn(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        exchange: void 0,
        routingKey: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      return fields;
    }
    function encodeBasicReturn(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932210, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicDeliver(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0,
        deliveryTag: void 0,
        redelivered: void 0,
        exchange: void 0,
        routingKey: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.redelivered = val;
      offset++;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      return fields;
    }
    function encodeBasicDeliver(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(24 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932220, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.deliveryTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.redelivered;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGet(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        noAck: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.noAck = val;
      return fields;
    }
    function encodeBasicGet(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932230, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.noAck;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGetOk(buffer) {
      var val, len, offset = 0, fields = {
        deliveryTag: void 0,
        redelivered: void 0,
        exchange: void 0,
        routingKey: void 0,
        messageCount: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.redelivered = val;
      offset++;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeBasicGetOk(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(27 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932231, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.redelivered;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.messageCount;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGetEmpty(buffer) {
      var val, len, offset = 0, fields = {
        clusterId: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.clusterId = val;
      return fields;
    }
    function encodeBasicGetEmpty(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.clusterId;
      if (void 0 === val)
        val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
      var clusterId_len = Buffer.byteLength(val, "utf8");
      varyingSize += clusterId_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932232, 7);
      offset = 11;
      val = fields.clusterId;
      void 0 === val && (val = "");
      buffer[offset] = clusterId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += clusterId_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicAck(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        multiple: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.multiple = val;
      return fields;
    }
    function encodeBasicAck(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932240, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.multiple;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicReject(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        requeue: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicReject(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932250, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val)
        throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.requeue;
      void 0 === val && (val = true);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecoverAsync(buffer) {
      var val, fields = {
        requeue: void 0
      };
      val = !!(1 & buffer[0]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicRecoverAsync(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932260, 7);
      offset = 11;
      val = fields.requeue;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecover(buffer) {
      var val, fields = {
        requeue: void 0
      };
      val = !!(1 & buffer[0]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicRecover(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932270, 7);
      offset = 11;
      val = fields.requeue;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecoverOk(buffer) {
      return {};
    }
    function encodeBasicRecoverOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932271, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicNack(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        multiple: void 0,
        requeue: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.multiple = val;
      val = !!(2 & buffer[offset]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicNack(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932280, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val)
        val = 0;
      else if ("number" != typeof val || isNaN(val))
        throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.multiple;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.requeue;
      void 0 === val && (val = true);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxSelect(buffer) {
      return {};
    }
    function encodeTxSelect(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898250, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxSelectOk(buffer) {
      return {};
    }
    function encodeTxSelectOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898251, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxCommit(buffer) {
      return {};
    }
    function encodeTxCommit(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898260, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxCommitOk(buffer) {
      return {};
    }
    function encodeTxCommitOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898261, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxRollback(buffer) {
      return {};
    }
    function encodeTxRollback(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898270, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxRollbackOk(buffer) {
      return {};
    }
    function encodeTxRollbackOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898271, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConfirmSelect(buffer) {
      var val, fields = {
        nowait: void 0
      };
      val = !!(1 & buffer[0]);
      fields.nowait = val;
      return fields;
    }
    function encodeConfirmSelect(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5570570, 7);
      offset = 11;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConfirmSelectOk(buffer) {
      return {};
    }
    function encodeConfirmSelectOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5570571, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function encodeBasicProperties(channel, size, fields) {
      var val, len, offset = 0, flags = 0, scratchOffset = 0, varyingSize = 0;
      val = fields.contentType;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'contentType' is the wrong type; must be a string (up to 255 chars)");
        var contentType_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += contentType_len;
      }
      val = fields.contentEncoding;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'contentEncoding' is the wrong type; must be a string (up to 255 chars)");
        var contentEncoding_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += contentEncoding_len;
      }
      val = fields.headers;
      if (void 0 != val) {
        if ("object" != typeof val)
          throw new TypeError("Field 'headers' is the wrong type; must be an object");
        len = encodeTable(SCRATCH, val, scratchOffset);
        var headers_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
        scratchOffset += len;
        varyingSize += headers_encoded.length;
      }
      val = fields.deliveryMode;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val))
          throw new TypeError("Field 'deliveryMode' is the wrong type; must be a number (but not NaN)");
        varyingSize += 1;
      }
      val = fields.priority;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val))
          throw new TypeError("Field 'priority' is the wrong type; must be a number (but not NaN)");
        varyingSize += 1;
      }
      val = fields.correlationId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'correlationId' is the wrong type; must be a string (up to 255 chars)");
        var correlationId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += correlationId_len;
      }
      val = fields.replyTo;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'replyTo' is the wrong type; must be a string (up to 255 chars)");
        var replyTo_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += replyTo_len;
      }
      val = fields.expiration;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'expiration' is the wrong type; must be a string (up to 255 chars)");
        var expiration_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += expiration_len;
      }
      val = fields.messageId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'messageId' is the wrong type; must be a string (up to 255 chars)");
        var messageId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += messageId_len;
      }
      val = fields.timestamp;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val))
          throw new TypeError("Field 'timestamp' is the wrong type; must be a number (but not NaN)");
        varyingSize += 8;
      }
      val = fields.type;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
        var type_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += type_len;
      }
      val = fields.userId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'userId' is the wrong type; must be a string (up to 255 chars)");
        var userId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += userId_len;
      }
      val = fields.appId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'appId' is the wrong type; must be a string (up to 255 chars)");
        var appId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += appId_len;
      }
      val = fields.clusterId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256))
          throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
        var clusterId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += clusterId_len;
      }
      var buffer = Buffer.alloc(22 + varyingSize);
      buffer[0] = 2;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932160, 7);
      ints.writeUInt64BE(buffer, size, 11);
      flags = 0;
      offset = 21;
      val = fields.contentType;
      if (void 0 != val) {
        flags += 32768;
        buffer[offset] = contentType_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += contentType_len;
      }
      val = fields.contentEncoding;
      if (void 0 != val) {
        flags += 16384;
        buffer[offset] = contentEncoding_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += contentEncoding_len;
      }
      val = fields.headers;
      if (void 0 != val) {
        flags += 8192;
        offset += headers_encoded.copy(buffer, offset);
      }
      val = fields.deliveryMode;
      if (void 0 != val) {
        flags += 4096;
        buffer.writeUInt8(val, offset);
        offset++;
      }
      val = fields.priority;
      if (void 0 != val) {
        flags += 2048;
        buffer.writeUInt8(val, offset);
        offset++;
      }
      val = fields.correlationId;
      if (void 0 != val) {
        flags += 1024;
        buffer[offset] = correlationId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += correlationId_len;
      }
      val = fields.replyTo;
      if (void 0 != val) {
        flags += 512;
        buffer[offset] = replyTo_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += replyTo_len;
      }
      val = fields.expiration;
      if (void 0 != val) {
        flags += 256;
        buffer[offset] = expiration_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += expiration_len;
      }
      val = fields.messageId;
      if (void 0 != val) {
        flags += 128;
        buffer[offset] = messageId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += messageId_len;
      }
      val = fields.timestamp;
      if (void 0 != val) {
        flags += 64;
        ints.writeUInt64BE(buffer, val, offset);
        offset += 8;
      }
      val = fields.type;
      if (void 0 != val) {
        flags += 32;
        buffer[offset] = type_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += type_len;
      }
      val = fields.userId;
      if (void 0 != val) {
        flags += 16;
        buffer[offset] = userId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += userId_len;
      }
      val = fields.appId;
      if (void 0 != val) {
        flags += 8;
        buffer[offset] = appId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += appId_len;
      }
      val = fields.clusterId;
      if (void 0 != val) {
        flags += 4;
        buffer[offset] = clusterId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += clusterId_len;
      }
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      buffer.writeUInt16BE(flags, 19);
      return buffer.slice(0, offset + 1);
    }
    function decodeBasicProperties(buffer) {
      var flags, val, len, offset = 2;
      flags = buffer.readUInt16BE(0);
      if (0 === flags)
        return {};
      var fields = {
        contentType: void 0,
        contentEncoding: void 0,
        headers: void 0,
        deliveryMode: void 0,
        priority: void 0,
        correlationId: void 0,
        replyTo: void 0,
        expiration: void 0,
        messageId: void 0,
        timestamp: void 0,
        type: void 0,
        userId: void 0,
        appId: void 0,
        clusterId: void 0
      };
      if (32768 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.contentType = val;
      }
      if (16384 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.contentEncoding = val;
      }
      if (8192 & flags) {
        len = buffer.readUInt32BE(offset);
        offset += 4;
        val = decodeFields(buffer.slice(offset, offset + len));
        offset += len;
        fields.headers = val;
      }
      if (4096 & flags) {
        val = buffer[offset];
        offset++;
        fields.deliveryMode = val;
      }
      if (2048 & flags) {
        val = buffer[offset];
        offset++;
        fields.priority = val;
      }
      if (1024 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.correlationId = val;
      }
      if (512 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.replyTo = val;
      }
      if (256 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.expiration = val;
      }
      if (128 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.messageId = val;
      }
      if (64 & flags) {
        val = ints.readUInt64BE(buffer, offset);
        offset += 8;
        fields.timestamp = val;
      }
      if (32 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.type = val;
      }
      if (16 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.userId = val;
      }
      if (8 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.appId = val;
      }
      if (4 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.clusterId = val;
      }
      return fields;
    }
    var codec = require_codec();
    var ints = require_buffer_more_ints();
    var encodeTable = codec.encodeTable;
    var decodeFields = codec.decodeFields;
    var SCRATCH = Buffer.alloc(65536);
    var EMPTY_OBJECT = Object.freeze({});
    module2.exports.constants = {
      FRAME_METHOD: 1,
      FRAME_HEADER: 2,
      FRAME_BODY: 3,
      FRAME_HEARTBEAT: 8,
      FRAME_MIN_SIZE: 4096,
      FRAME_END: 206,
      REPLY_SUCCESS: 200,
      CONTENT_TOO_LARGE: 311,
      NO_ROUTE: 312,
      NO_CONSUMERS: 313,
      ACCESS_REFUSED: 403,
      NOT_FOUND: 404,
      RESOURCE_LOCKED: 405,
      PRECONDITION_FAILED: 406,
      CONNECTION_FORCED: 320,
      INVALID_PATH: 402,
      FRAME_ERROR: 501,
      SYNTAX_ERROR: 502,
      COMMAND_INVALID: 503,
      CHANNEL_ERROR: 504,
      UNEXPECTED_FRAME: 505,
      RESOURCE_ERROR: 506,
      NOT_ALLOWED: 530,
      NOT_IMPLEMENTED: 540,
      INTERNAL_ERROR: 541
    };
    module2.exports.constant_strs = {
      "1": "FRAME-METHOD",
      "2": "FRAME-HEADER",
      "3": "FRAME-BODY",
      "8": "FRAME-HEARTBEAT",
      "200": "REPLY-SUCCESS",
      "206": "FRAME-END",
      "311": "CONTENT-TOO-LARGE",
      "312": "NO-ROUTE",
      "313": "NO-CONSUMERS",
      "320": "CONNECTION-FORCED",
      "402": "INVALID-PATH",
      "403": "ACCESS-REFUSED",
      "404": "NOT-FOUND",
      "405": "RESOURCE-LOCKED",
      "406": "PRECONDITION-FAILED",
      "501": "FRAME-ERROR",
      "502": "SYNTAX-ERROR",
      "503": "COMMAND-INVALID",
      "504": "CHANNEL-ERROR",
      "505": "UNEXPECTED-FRAME",
      "506": "RESOURCE-ERROR",
      "530": "NOT-ALLOWED",
      "540": "NOT-IMPLEMENTED",
      "541": "INTERNAL-ERROR",
      "4096": "FRAME-MIN-SIZE"
    };
    module2.exports.FRAME_OVERHEAD = 8;
    module2.exports.decode = function(id, buf) {
      switch (id) {
        case 655370:
          return decodeConnectionStart(buf);
        case 655371:
          return decodeConnectionStartOk(buf);
        case 655380:
          return decodeConnectionSecure(buf);
        case 655381:
          return decodeConnectionSecureOk(buf);
        case 655390:
          return decodeConnectionTune(buf);
        case 655391:
          return decodeConnectionTuneOk(buf);
        case 655400:
          return decodeConnectionOpen(buf);
        case 655401:
          return decodeConnectionOpenOk(buf);
        case 655410:
          return decodeConnectionClose(buf);
        case 655411:
          return decodeConnectionCloseOk(buf);
        case 655420:
          return decodeConnectionBlocked(buf);
        case 655421:
          return decodeConnectionUnblocked(buf);
        case 1310730:
          return decodeChannelOpen(buf);
        case 1310731:
          return decodeChannelOpenOk(buf);
        case 1310740:
          return decodeChannelFlow(buf);
        case 1310741:
          return decodeChannelFlowOk(buf);
        case 1310760:
          return decodeChannelClose(buf);
        case 1310761:
          return decodeChannelCloseOk(buf);
        case 1966090:
          return decodeAccessRequest(buf);
        case 1966091:
          return decodeAccessRequestOk(buf);
        case 2621450:
          return decodeExchangeDeclare(buf);
        case 2621451:
          return decodeExchangeDeclareOk(buf);
        case 2621460:
          return decodeExchangeDelete(buf);
        case 2621461:
          return decodeExchangeDeleteOk(buf);
        case 2621470:
          return decodeExchangeBind(buf);
        case 2621471:
          return decodeExchangeBindOk(buf);
        case 2621480:
          return decodeExchangeUnbind(buf);
        case 2621491:
          return decodeExchangeUnbindOk(buf);
        case 3276810:
          return decodeQueueDeclare(buf);
        case 3276811:
          return decodeQueueDeclareOk(buf);
        case 3276820:
          return decodeQueueBind(buf);
        case 3276821:
          return decodeQueueBindOk(buf);
        case 3276830:
          return decodeQueuePurge(buf);
        case 3276831:
          return decodeQueuePurgeOk(buf);
        case 3276840:
          return decodeQueueDelete(buf);
        case 3276841:
          return decodeQueueDeleteOk(buf);
        case 3276850:
          return decodeQueueUnbind(buf);
        case 3276851:
          return decodeQueueUnbindOk(buf);
        case 3932170:
          return decodeBasicQos(buf);
        case 3932171:
          return decodeBasicQosOk(buf);
        case 3932180:
          return decodeBasicConsume(buf);
        case 3932181:
          return decodeBasicConsumeOk(buf);
        case 3932190:
          return decodeBasicCancel(buf);
        case 3932191:
          return decodeBasicCancelOk(buf);
        case 3932200:
          return decodeBasicPublish(buf);
        case 3932210:
          return decodeBasicReturn(buf);
        case 3932220:
          return decodeBasicDeliver(buf);
        case 3932230:
          return decodeBasicGet(buf);
        case 3932231:
          return decodeBasicGetOk(buf);
        case 3932232:
          return decodeBasicGetEmpty(buf);
        case 3932240:
          return decodeBasicAck(buf);
        case 3932250:
          return decodeBasicReject(buf);
        case 3932260:
          return decodeBasicRecoverAsync(buf);
        case 3932270:
          return decodeBasicRecover(buf);
        case 3932271:
          return decodeBasicRecoverOk(buf);
        case 3932280:
          return decodeBasicNack(buf);
        case 5898250:
          return decodeTxSelect(buf);
        case 5898251:
          return decodeTxSelectOk(buf);
        case 5898260:
          return decodeTxCommit(buf);
        case 5898261:
          return decodeTxCommitOk(buf);
        case 5898270:
          return decodeTxRollback(buf);
        case 5898271:
          return decodeTxRollbackOk(buf);
        case 5570570:
          return decodeConfirmSelect(buf);
        case 5570571:
          return decodeConfirmSelectOk(buf);
        case 60:
          return decodeBasicProperties(buf);
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module2.exports.encodeMethod = function(id, channel, fields) {
      switch (id) {
        case 655370:
          return encodeConnectionStart(channel, fields);
        case 655371:
          return encodeConnectionStartOk(channel, fields);
        case 655380:
          return encodeConnectionSecure(channel, fields);
        case 655381:
          return encodeConnectionSecureOk(channel, fields);
        case 655390:
          return encodeConnectionTune(channel, fields);
        case 655391:
          return encodeConnectionTuneOk(channel, fields);
        case 655400:
          return encodeConnectionOpen(channel, fields);
        case 655401:
          return encodeConnectionOpenOk(channel, fields);
        case 655410:
          return encodeConnectionClose(channel, fields);
        case 655411:
          return encodeConnectionCloseOk(channel, fields);
        case 655420:
          return encodeConnectionBlocked(channel, fields);
        case 655421:
          return encodeConnectionUnblocked(channel, fields);
        case 1310730:
          return encodeChannelOpen(channel, fields);
        case 1310731:
          return encodeChannelOpenOk(channel, fields);
        case 1310740:
          return encodeChannelFlow(channel, fields);
        case 1310741:
          return encodeChannelFlowOk(channel, fields);
        case 1310760:
          return encodeChannelClose(channel, fields);
        case 1310761:
          return encodeChannelCloseOk(channel, fields);
        case 1966090:
          return encodeAccessRequest(channel, fields);
        case 1966091:
          return encodeAccessRequestOk(channel, fields);
        case 2621450:
          return encodeExchangeDeclare(channel, fields);
        case 2621451:
          return encodeExchangeDeclareOk(channel, fields);
        case 2621460:
          return encodeExchangeDelete(channel, fields);
        case 2621461:
          return encodeExchangeDeleteOk(channel, fields);
        case 2621470:
          return encodeExchangeBind(channel, fields);
        case 2621471:
          return encodeExchangeBindOk(channel, fields);
        case 2621480:
          return encodeExchangeUnbind(channel, fields);
        case 2621491:
          return encodeExchangeUnbindOk(channel, fields);
        case 3276810:
          return encodeQueueDeclare(channel, fields);
        case 3276811:
          return encodeQueueDeclareOk(channel, fields);
        case 3276820:
          return encodeQueueBind(channel, fields);
        case 3276821:
          return encodeQueueBindOk(channel, fields);
        case 3276830:
          return encodeQueuePurge(channel, fields);
        case 3276831:
          return encodeQueuePurgeOk(channel, fields);
        case 3276840:
          return encodeQueueDelete(channel, fields);
        case 3276841:
          return encodeQueueDeleteOk(channel, fields);
        case 3276850:
          return encodeQueueUnbind(channel, fields);
        case 3276851:
          return encodeQueueUnbindOk(channel, fields);
        case 3932170:
          return encodeBasicQos(channel, fields);
        case 3932171:
          return encodeBasicQosOk(channel, fields);
        case 3932180:
          return encodeBasicConsume(channel, fields);
        case 3932181:
          return encodeBasicConsumeOk(channel, fields);
        case 3932190:
          return encodeBasicCancel(channel, fields);
        case 3932191:
          return encodeBasicCancelOk(channel, fields);
        case 3932200:
          return encodeBasicPublish(channel, fields);
        case 3932210:
          return encodeBasicReturn(channel, fields);
        case 3932220:
          return encodeBasicDeliver(channel, fields);
        case 3932230:
          return encodeBasicGet(channel, fields);
        case 3932231:
          return encodeBasicGetOk(channel, fields);
        case 3932232:
          return encodeBasicGetEmpty(channel, fields);
        case 3932240:
          return encodeBasicAck(channel, fields);
        case 3932250:
          return encodeBasicReject(channel, fields);
        case 3932260:
          return encodeBasicRecoverAsync(channel, fields);
        case 3932270:
          return encodeBasicRecover(channel, fields);
        case 3932271:
          return encodeBasicRecoverOk(channel, fields);
        case 3932280:
          return encodeBasicNack(channel, fields);
        case 5898250:
          return encodeTxSelect(channel, fields);
        case 5898251:
          return encodeTxSelectOk(channel, fields);
        case 5898260:
          return encodeTxCommit(channel, fields);
        case 5898261:
          return encodeTxCommitOk(channel, fields);
        case 5898270:
          return encodeTxRollback(channel, fields);
        case 5898271:
          return encodeTxRollbackOk(channel, fields);
        case 5570570:
          return encodeConfirmSelect(channel, fields);
        case 5570571:
          return encodeConfirmSelectOk(channel, fields);
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module2.exports.encodeProperties = function(id, channel, size, fields) {
      switch (id) {
        case 60:
          return encodeBasicProperties(channel, size, fields);
        default:
          throw new Error("Unknown class/properties ID");
      }
    };
    module2.exports.info = function(id) {
      switch (id) {
        case 655370:
          return methodInfoConnectionStart;
        case 655371:
          return methodInfoConnectionStartOk;
        case 655380:
          return methodInfoConnectionSecure;
        case 655381:
          return methodInfoConnectionSecureOk;
        case 655390:
          return methodInfoConnectionTune;
        case 655391:
          return methodInfoConnectionTuneOk;
        case 655400:
          return methodInfoConnectionOpen;
        case 655401:
          return methodInfoConnectionOpenOk;
        case 655410:
          return methodInfoConnectionClose;
        case 655411:
          return methodInfoConnectionCloseOk;
        case 655420:
          return methodInfoConnectionBlocked;
        case 655421:
          return methodInfoConnectionUnblocked;
        case 1310730:
          return methodInfoChannelOpen;
        case 1310731:
          return methodInfoChannelOpenOk;
        case 1310740:
          return methodInfoChannelFlow;
        case 1310741:
          return methodInfoChannelFlowOk;
        case 1310760:
          return methodInfoChannelClose;
        case 1310761:
          return methodInfoChannelCloseOk;
        case 1966090:
          return methodInfoAccessRequest;
        case 1966091:
          return methodInfoAccessRequestOk;
        case 2621450:
          return methodInfoExchangeDeclare;
        case 2621451:
          return methodInfoExchangeDeclareOk;
        case 2621460:
          return methodInfoExchangeDelete;
        case 2621461:
          return methodInfoExchangeDeleteOk;
        case 2621470:
          return methodInfoExchangeBind;
        case 2621471:
          return methodInfoExchangeBindOk;
        case 2621480:
          return methodInfoExchangeUnbind;
        case 2621491:
          return methodInfoExchangeUnbindOk;
        case 3276810:
          return methodInfoQueueDeclare;
        case 3276811:
          return methodInfoQueueDeclareOk;
        case 3276820:
          return methodInfoQueueBind;
        case 3276821:
          return methodInfoQueueBindOk;
        case 3276830:
          return methodInfoQueuePurge;
        case 3276831:
          return methodInfoQueuePurgeOk;
        case 3276840:
          return methodInfoQueueDelete;
        case 3276841:
          return methodInfoQueueDeleteOk;
        case 3276850:
          return methodInfoQueueUnbind;
        case 3276851:
          return methodInfoQueueUnbindOk;
        case 3932170:
          return methodInfoBasicQos;
        case 3932171:
          return methodInfoBasicQosOk;
        case 3932180:
          return methodInfoBasicConsume;
        case 3932181:
          return methodInfoBasicConsumeOk;
        case 3932190:
          return methodInfoBasicCancel;
        case 3932191:
          return methodInfoBasicCancelOk;
        case 3932200:
          return methodInfoBasicPublish;
        case 3932210:
          return methodInfoBasicReturn;
        case 3932220:
          return methodInfoBasicDeliver;
        case 3932230:
          return methodInfoBasicGet;
        case 3932231:
          return methodInfoBasicGetOk;
        case 3932232:
          return methodInfoBasicGetEmpty;
        case 3932240:
          return methodInfoBasicAck;
        case 3932250:
          return methodInfoBasicReject;
        case 3932260:
          return methodInfoBasicRecoverAsync;
        case 3932270:
          return methodInfoBasicRecover;
        case 3932271:
          return methodInfoBasicRecoverOk;
        case 3932280:
          return methodInfoBasicNack;
        case 5898250:
          return methodInfoTxSelect;
        case 5898251:
          return methodInfoTxSelectOk;
        case 5898260:
          return methodInfoTxCommit;
        case 5898261:
          return methodInfoTxCommitOk;
        case 5898270:
          return methodInfoTxRollback;
        case 5898271:
          return methodInfoTxRollbackOk;
        case 5570570:
          return methodInfoConfirmSelect;
        case 5570571:
          return methodInfoConfirmSelectOk;
        case 60:
          return propertiesInfoBasicProperties;
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module2.exports.ConnectionStart = 655370;
    var methodInfoConnectionStart = module2.exports.methodInfoConnectionStart = {
      id: 655370,
      classId: 10,
      methodId: 10,
      name: "ConnectionStart",
      args: [{
        type: "octet",
        name: "versionMajor",
        default: 0
      }, {
        type: "octet",
        name: "versionMinor",
        default: 9
      }, {
        type: "table",
        name: "serverProperties"
      }, {
        type: "longstr",
        name: "mechanisms",
        default: "PLAIN"
      }, {
        type: "longstr",
        name: "locales",
        default: "en_US"
      }]
    };
    module2.exports.ConnectionStartOk = 655371;
    var methodInfoConnectionStartOk = module2.exports.methodInfoConnectionStartOk = {
      id: 655371,
      classId: 10,
      methodId: 11,
      name: "ConnectionStartOk",
      args: [{
        type: "table",
        name: "clientProperties"
      }, {
        type: "shortstr",
        name: "mechanism",
        default: "PLAIN"
      }, {
        type: "longstr",
        name: "response"
      }, {
        type: "shortstr",
        name: "locale",
        default: "en_US"
      }]
    };
    module2.exports.ConnectionSecure = 655380;
    var methodInfoConnectionSecure = module2.exports.methodInfoConnectionSecure = {
      id: 655380,
      classId: 10,
      methodId: 20,
      name: "ConnectionSecure",
      args: [{
        type: "longstr",
        name: "challenge"
      }]
    };
    module2.exports.ConnectionSecureOk = 655381;
    var methodInfoConnectionSecureOk = module2.exports.methodInfoConnectionSecureOk = {
      id: 655381,
      classId: 10,
      methodId: 21,
      name: "ConnectionSecureOk",
      args: [{
        type: "longstr",
        name: "response"
      }]
    };
    module2.exports.ConnectionTune = 655390;
    var methodInfoConnectionTune = module2.exports.methodInfoConnectionTune = {
      id: 655390,
      classId: 10,
      methodId: 30,
      name: "ConnectionTune",
      args: [{
        type: "short",
        name: "channelMax",
        default: 0
      }, {
        type: "long",
        name: "frameMax",
        default: 0
      }, {
        type: "short",
        name: "heartbeat",
        default: 0
      }]
    };
    module2.exports.ConnectionTuneOk = 655391;
    var methodInfoConnectionTuneOk = module2.exports.methodInfoConnectionTuneOk = {
      id: 655391,
      classId: 10,
      methodId: 31,
      name: "ConnectionTuneOk",
      args: [{
        type: "short",
        name: "channelMax",
        default: 0
      }, {
        type: "long",
        name: "frameMax",
        default: 0
      }, {
        type: "short",
        name: "heartbeat",
        default: 0
      }]
    };
    module2.exports.ConnectionOpen = 655400;
    var methodInfoConnectionOpen = module2.exports.methodInfoConnectionOpen = {
      id: 655400,
      classId: 10,
      methodId: 40,
      name: "ConnectionOpen",
      args: [{
        type: "shortstr",
        name: "virtualHost",
        default: "/"
      }, {
        type: "shortstr",
        name: "capabilities",
        default: ""
      }, {
        type: "bit",
        name: "insist",
        default: false
      }]
    };
    module2.exports.ConnectionOpenOk = 655401;
    var methodInfoConnectionOpenOk = module2.exports.methodInfoConnectionOpenOk = {
      id: 655401,
      classId: 10,
      methodId: 41,
      name: "ConnectionOpenOk",
      args: [{
        type: "shortstr",
        name: "knownHosts",
        default: ""
      }]
    };
    module2.exports.ConnectionClose = 655410;
    var methodInfoConnectionClose = module2.exports.methodInfoConnectionClose = {
      id: 655410,
      classId: 10,
      methodId: 50,
      name: "ConnectionClose",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "short",
        name: "classId"
      }, {
        type: "short",
        name: "methodId"
      }]
    };
    module2.exports.ConnectionCloseOk = 655411;
    var methodInfoConnectionCloseOk = module2.exports.methodInfoConnectionCloseOk = {
      id: 655411,
      classId: 10,
      methodId: 51,
      name: "ConnectionCloseOk",
      args: []
    };
    module2.exports.ConnectionBlocked = 655420;
    var methodInfoConnectionBlocked = module2.exports.methodInfoConnectionBlocked = {
      id: 655420,
      classId: 10,
      methodId: 60,
      name: "ConnectionBlocked",
      args: [{
        type: "shortstr",
        name: "reason",
        default: ""
      }]
    };
    module2.exports.ConnectionUnblocked = 655421;
    var methodInfoConnectionUnblocked = module2.exports.methodInfoConnectionUnblocked = {
      id: 655421,
      classId: 10,
      methodId: 61,
      name: "ConnectionUnblocked",
      args: []
    };
    module2.exports.ChannelOpen = 1310730;
    var methodInfoChannelOpen = module2.exports.methodInfoChannelOpen = {
      id: 1310730,
      classId: 20,
      methodId: 10,
      name: "ChannelOpen",
      args: [{
        type: "shortstr",
        name: "outOfBand",
        default: ""
      }]
    };
    module2.exports.ChannelOpenOk = 1310731;
    var methodInfoChannelOpenOk = module2.exports.methodInfoChannelOpenOk = {
      id: 1310731,
      classId: 20,
      methodId: 11,
      name: "ChannelOpenOk",
      args: [{
        type: "longstr",
        name: "channelId",
        default: ""
      }]
    };
    module2.exports.ChannelFlow = 1310740;
    var methodInfoChannelFlow = module2.exports.methodInfoChannelFlow = {
      id: 1310740,
      classId: 20,
      methodId: 20,
      name: "ChannelFlow",
      args: [{
        type: "bit",
        name: "active"
      }]
    };
    module2.exports.ChannelFlowOk = 1310741;
    var methodInfoChannelFlowOk = module2.exports.methodInfoChannelFlowOk = {
      id: 1310741,
      classId: 20,
      methodId: 21,
      name: "ChannelFlowOk",
      args: [{
        type: "bit",
        name: "active"
      }]
    };
    module2.exports.ChannelClose = 1310760;
    var methodInfoChannelClose = module2.exports.methodInfoChannelClose = {
      id: 1310760,
      classId: 20,
      methodId: 40,
      name: "ChannelClose",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "short",
        name: "classId"
      }, {
        type: "short",
        name: "methodId"
      }]
    };
    module2.exports.ChannelCloseOk = 1310761;
    var methodInfoChannelCloseOk = module2.exports.methodInfoChannelCloseOk = {
      id: 1310761,
      classId: 20,
      methodId: 41,
      name: "ChannelCloseOk",
      args: []
    };
    module2.exports.AccessRequest = 1966090;
    var methodInfoAccessRequest = module2.exports.methodInfoAccessRequest = {
      id: 1966090,
      classId: 30,
      methodId: 10,
      name: "AccessRequest",
      args: [{
        type: "shortstr",
        name: "realm",
        default: "/data"
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "passive",
        default: true
      }, {
        type: "bit",
        name: "active",
        default: true
      }, {
        type: "bit",
        name: "write",
        default: true
      }, {
        type: "bit",
        name: "read",
        default: true
      }]
    };
    module2.exports.AccessRequestOk = 1966091;
    var methodInfoAccessRequestOk = module2.exports.methodInfoAccessRequestOk = {
      id: 1966091,
      classId: 30,
      methodId: 11,
      name: "AccessRequestOk",
      args: [{
        type: "short",
        name: "ticket",
        default: 1
      }]
    };
    module2.exports.ExchangeDeclare = 2621450;
    var methodInfoExchangeDeclare = module2.exports.methodInfoExchangeDeclare = {
      id: 2621450,
      classId: 40,
      methodId: 10,
      name: "ExchangeDeclare",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "type",
        default: "direct"
      }, {
        type: "bit",
        name: "passive",
        default: false
      }, {
        type: "bit",
        name: "durable",
        default: false
      }, {
        type: "bit",
        name: "autoDelete",
        default: false
      }, {
        type: "bit",
        name: "internal",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.ExchangeDeclareOk = 2621451;
    var methodInfoExchangeDeclareOk = module2.exports.methodInfoExchangeDeclareOk = {
      id: 2621451,
      classId: 40,
      methodId: 11,
      name: "ExchangeDeclareOk",
      args: []
    };
    module2.exports.ExchangeDelete = 2621460;
    var methodInfoExchangeDelete = module2.exports.methodInfoExchangeDelete = {
      id: 2621460,
      classId: 40,
      methodId: 20,
      name: "ExchangeDelete",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "bit",
        name: "ifUnused",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.ExchangeDeleteOk = 2621461;
    var methodInfoExchangeDeleteOk = module2.exports.methodInfoExchangeDeleteOk = {
      id: 2621461,
      classId: 40,
      methodId: 21,
      name: "ExchangeDeleteOk",
      args: []
    };
    module2.exports.ExchangeBind = 2621470;
    var methodInfoExchangeBind = module2.exports.methodInfoExchangeBind = {
      id: 2621470,
      classId: 40,
      methodId: 30,
      name: "ExchangeBind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "destination"
      }, {
        type: "shortstr",
        name: "source"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.ExchangeBindOk = 2621471;
    var methodInfoExchangeBindOk = module2.exports.methodInfoExchangeBindOk = {
      id: 2621471,
      classId: 40,
      methodId: 31,
      name: "ExchangeBindOk",
      args: []
    };
    module2.exports.ExchangeUnbind = 2621480;
    var methodInfoExchangeUnbind = module2.exports.methodInfoExchangeUnbind = {
      id: 2621480,
      classId: 40,
      methodId: 40,
      name: "ExchangeUnbind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "destination"
      }, {
        type: "shortstr",
        name: "source"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.ExchangeUnbindOk = 2621491;
    var methodInfoExchangeUnbindOk = module2.exports.methodInfoExchangeUnbindOk = {
      id: 2621491,
      classId: 40,
      methodId: 51,
      name: "ExchangeUnbindOk",
      args: []
    };
    module2.exports.QueueDeclare = 3276810;
    var methodInfoQueueDeclare = module2.exports.methodInfoQueueDeclare = {
      id: 3276810,
      classId: 50,
      methodId: 10,
      name: "QueueDeclare",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "passive",
        default: false
      }, {
        type: "bit",
        name: "durable",
        default: false
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "autoDelete",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.QueueDeclareOk = 3276811;
    var methodInfoQueueDeclareOk = module2.exports.methodInfoQueueDeclareOk = {
      id: 3276811,
      classId: 50,
      methodId: 11,
      name: "QueueDeclareOk",
      args: [{
        type: "shortstr",
        name: "queue"
      }, {
        type: "long",
        name: "messageCount"
      }, {
        type: "long",
        name: "consumerCount"
      }]
    };
    module2.exports.QueueBind = 3276820;
    var methodInfoQueueBind = module2.exports.methodInfoQueueBind = {
      id: 3276820,
      classId: 50,
      methodId: 20,
      name: "QueueBind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.QueueBindOk = 3276821;
    var methodInfoQueueBindOk = module2.exports.methodInfoQueueBindOk = {
      id: 3276821,
      classId: 50,
      methodId: 21,
      name: "QueueBindOk",
      args: []
    };
    module2.exports.QueuePurge = 3276830;
    var methodInfoQueuePurge = module2.exports.methodInfoQueuePurge = {
      id: 3276830,
      classId: 50,
      methodId: 30,
      name: "QueuePurge",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.QueuePurgeOk = 3276831;
    var methodInfoQueuePurgeOk = module2.exports.methodInfoQueuePurgeOk = {
      id: 3276831,
      classId: 50,
      methodId: 31,
      name: "QueuePurgeOk",
      args: [{
        type: "long",
        name: "messageCount"
      }]
    };
    module2.exports.QueueDelete = 3276840;
    var methodInfoQueueDelete = module2.exports.methodInfoQueueDelete = {
      id: 3276840,
      classId: 50,
      methodId: 40,
      name: "QueueDelete",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "ifUnused",
        default: false
      }, {
        type: "bit",
        name: "ifEmpty",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.QueueDeleteOk = 3276841;
    var methodInfoQueueDeleteOk = module2.exports.methodInfoQueueDeleteOk = {
      id: 3276841,
      classId: 50,
      methodId: 41,
      name: "QueueDeleteOk",
      args: [{
        type: "long",
        name: "messageCount"
      }]
    };
    module2.exports.QueueUnbind = 3276850;
    var methodInfoQueueUnbind = module2.exports.methodInfoQueueUnbind = {
      id: 3276850,
      classId: 50,
      methodId: 50,
      name: "QueueUnbind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.QueueUnbindOk = 3276851;
    var methodInfoQueueUnbindOk = module2.exports.methodInfoQueueUnbindOk = {
      id: 3276851,
      classId: 50,
      methodId: 51,
      name: "QueueUnbindOk",
      args: []
    };
    module2.exports.BasicQos = 3932170;
    var methodInfoBasicQos = module2.exports.methodInfoBasicQos = {
      id: 3932170,
      classId: 60,
      methodId: 10,
      name: "BasicQos",
      args: [{
        type: "long",
        name: "prefetchSize",
        default: 0
      }, {
        type: "short",
        name: "prefetchCount",
        default: 0
      }, {
        type: "bit",
        name: "global",
        default: false
      }]
    };
    module2.exports.BasicQosOk = 3932171;
    var methodInfoBasicQosOk = module2.exports.methodInfoBasicQosOk = {
      id: 3932171,
      classId: 60,
      methodId: 11,
      name: "BasicQosOk",
      args: []
    };
    module2.exports.BasicConsume = 3932180;
    var methodInfoBasicConsume = module2.exports.methodInfoBasicConsume = {
      id: 3932180,
      classId: 60,
      methodId: 20,
      name: "BasicConsume",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "consumerTag",
        default: ""
      }, {
        type: "bit",
        name: "noLocal",
        default: false
      }, {
        type: "bit",
        name: "noAck",
        default: false
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.BasicConsumeOk = 3932181;
    var methodInfoBasicConsumeOk = module2.exports.methodInfoBasicConsumeOk = {
      id: 3932181,
      classId: 60,
      methodId: 21,
      name: "BasicConsumeOk",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }]
    };
    module2.exports.BasicCancel = 3932190;
    var methodInfoBasicCancel = module2.exports.methodInfoBasicCancel = {
      id: 3932190,
      classId: 60,
      methodId: 30,
      name: "BasicCancel",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.BasicCancelOk = 3932191;
    var methodInfoBasicCancelOk = module2.exports.methodInfoBasicCancelOk = {
      id: 3932191,
      classId: 60,
      methodId: 31,
      name: "BasicCancelOk",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }]
    };
    module2.exports.BasicPublish = 3932200;
    var methodInfoBasicPublish = module2.exports.methodInfoBasicPublish = {
      id: 3932200,
      classId: 60,
      methodId: 40,
      name: "BasicPublish",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange",
        default: ""
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "mandatory",
        default: false
      }, {
        type: "bit",
        name: "immediate",
        default: false
      }]
    };
    module2.exports.BasicReturn = 3932210;
    var methodInfoBasicReturn = module2.exports.methodInfoBasicReturn = {
      id: 3932210,
      classId: 60,
      methodId: 50,
      name: "BasicReturn",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }]
    };
    module2.exports.BasicDeliver = 3932220;
    var methodInfoBasicDeliver = module2.exports.methodInfoBasicDeliver = {
      id: 3932220,
      classId: 60,
      methodId: 60,
      name: "BasicDeliver",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }, {
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "redelivered",
        default: false
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }]
    };
    module2.exports.BasicGet = 3932230;
    var methodInfoBasicGet = module2.exports.methodInfoBasicGet = {
      id: 3932230,
      classId: 60,
      methodId: 70,
      name: "BasicGet",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "noAck",
        default: false
      }]
    };
    module2.exports.BasicGetOk = 3932231;
    var methodInfoBasicGetOk = module2.exports.methodInfoBasicGetOk = {
      id: 3932231,
      classId: 60,
      methodId: 71,
      name: "BasicGetOk",
      args: [{
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "redelivered",
        default: false
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }, {
        type: "long",
        name: "messageCount"
      }]
    };
    module2.exports.BasicGetEmpty = 3932232;
    var methodInfoBasicGetEmpty = module2.exports.methodInfoBasicGetEmpty = {
      id: 3932232,
      classId: 60,
      methodId: 72,
      name: "BasicGetEmpty",
      args: [{
        type: "shortstr",
        name: "clusterId",
        default: ""
      }]
    };
    module2.exports.BasicAck = 3932240;
    var methodInfoBasicAck = module2.exports.methodInfoBasicAck = {
      id: 3932240,
      classId: 60,
      methodId: 80,
      name: "BasicAck",
      args: [{
        type: "longlong",
        name: "deliveryTag",
        default: 0
      }, {
        type: "bit",
        name: "multiple",
        default: false
      }]
    };
    module2.exports.BasicReject = 3932250;
    var methodInfoBasicReject = module2.exports.methodInfoBasicReject = {
      id: 3932250,
      classId: 60,
      methodId: 90,
      name: "BasicReject",
      args: [{
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "requeue",
        default: true
      }]
    };
    module2.exports.BasicRecoverAsync = 3932260;
    var methodInfoBasicRecoverAsync = module2.exports.methodInfoBasicRecoverAsync = {
      id: 3932260,
      classId: 60,
      methodId: 100,
      name: "BasicRecoverAsync",
      args: [{
        type: "bit",
        name: "requeue",
        default: false
      }]
    };
    module2.exports.BasicRecover = 3932270;
    var methodInfoBasicRecover = module2.exports.methodInfoBasicRecover = {
      id: 3932270,
      classId: 60,
      methodId: 110,
      name: "BasicRecover",
      args: [{
        type: "bit",
        name: "requeue",
        default: false
      }]
    };
    module2.exports.BasicRecoverOk = 3932271;
    var methodInfoBasicRecoverOk = module2.exports.methodInfoBasicRecoverOk = {
      id: 3932271,
      classId: 60,
      methodId: 111,
      name: "BasicRecoverOk",
      args: []
    };
    module2.exports.BasicNack = 3932280;
    var methodInfoBasicNack = module2.exports.methodInfoBasicNack = {
      id: 3932280,
      classId: 60,
      methodId: 120,
      name: "BasicNack",
      args: [{
        type: "longlong",
        name: "deliveryTag",
        default: 0
      }, {
        type: "bit",
        name: "multiple",
        default: false
      }, {
        type: "bit",
        name: "requeue",
        default: true
      }]
    };
    module2.exports.TxSelect = 5898250;
    var methodInfoTxSelect = module2.exports.methodInfoTxSelect = {
      id: 5898250,
      classId: 90,
      methodId: 10,
      name: "TxSelect",
      args: []
    };
    module2.exports.TxSelectOk = 5898251;
    var methodInfoTxSelectOk = module2.exports.methodInfoTxSelectOk = {
      id: 5898251,
      classId: 90,
      methodId: 11,
      name: "TxSelectOk",
      args: []
    };
    module2.exports.TxCommit = 5898260;
    var methodInfoTxCommit = module2.exports.methodInfoTxCommit = {
      id: 5898260,
      classId: 90,
      methodId: 20,
      name: "TxCommit",
      args: []
    };
    module2.exports.TxCommitOk = 5898261;
    var methodInfoTxCommitOk = module2.exports.methodInfoTxCommitOk = {
      id: 5898261,
      classId: 90,
      methodId: 21,
      name: "TxCommitOk",
      args: []
    };
    module2.exports.TxRollback = 5898270;
    var methodInfoTxRollback = module2.exports.methodInfoTxRollback = {
      id: 5898270,
      classId: 90,
      methodId: 30,
      name: "TxRollback",
      args: []
    };
    module2.exports.TxRollbackOk = 5898271;
    var methodInfoTxRollbackOk = module2.exports.methodInfoTxRollbackOk = {
      id: 5898271,
      classId: 90,
      methodId: 31,
      name: "TxRollbackOk",
      args: []
    };
    module2.exports.ConfirmSelect = 5570570;
    var methodInfoConfirmSelect = module2.exports.methodInfoConfirmSelect = {
      id: 5570570,
      classId: 85,
      methodId: 10,
      name: "ConfirmSelect",
      args: [{
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.ConfirmSelectOk = 5570571;
    var methodInfoConfirmSelectOk = module2.exports.methodInfoConfirmSelectOk = {
      id: 5570571,
      classId: 85,
      methodId: 11,
      name: "ConfirmSelectOk",
      args: []
    };
    module2.exports.BasicProperties = 60;
    var propertiesInfoBasicProperties = module2.exports.propertiesInfoBasicProperties = {
      id: 60,
      name: "BasicProperties",
      args: [{
        type: "shortstr",
        name: "contentType"
      }, {
        type: "shortstr",
        name: "contentEncoding"
      }, {
        type: "table",
        name: "headers"
      }, {
        type: "octet",
        name: "deliveryMode"
      }, {
        type: "octet",
        name: "priority"
      }, {
        type: "shortstr",
        name: "correlationId"
      }, {
        type: "shortstr",
        name: "replyTo"
      }, {
        type: "shortstr",
        name: "expiration"
      }, {
        type: "shortstr",
        name: "messageId"
      }, {
        type: "timestamp",
        name: "timestamp"
      }, {
        type: "shortstr",
        name: "type"
      }, {
        type: "shortstr",
        name: "userId"
      }, {
        type: "shortstr",
        name: "appId"
      }, {
        type: "shortstr",
        name: "clusterId"
      }]
    };
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/pattern.js
var require_pattern = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/pattern.js"(exports, module2) {
    "use strict";
    function set(values) {
      var s = {};
      for (var i in values) {
        if (!Object.prototype.hasOwnProperty.call(values, i))
          continue;
        s[values[i]] = 1;
      }
      return s;
    }
    function variable(name, size, specifiers0) {
      var specifiers = set(specifiers0);
      var segment = { name };
      segment.type = type_in(specifiers);
      specs(segment, segment.type, specifiers);
      segment.size = size_of(segment, segment.type, size, segment.unit);
      return segment;
    }
    module2.exports.variable = variable;
    module2.exports.rest = function() {
      return variable("_", true, ["binary"]);
    };
    function value(val, size, specifiers0) {
      var specifiers = set(specifiers0);
      var segment = { value: val };
      segment.type = type_in(specifiers);
      specs(segment, segment.type, specifiers);
      segment.size = size_of(segment, segment.type, size, segment.unit);
      return segment;
    }
    module2.exports.value = value;
    function string(val) {
      return { value: val, type: "string" };
    }
    module2.exports.string = string;
    var TYPES = { "integer": 1, "binary": 1, "float": 1 };
    function type_in(specifiers) {
      for (var t in specifiers) {
        if (!Object.prototype.hasOwnProperty.call(specifiers, t))
          continue;
        if (TYPES[t]) {
          return t;
        }
      }
      return "integer";
    }
    function specs(segment, type, specifiers) {
      switch (type) {
        case "integer":
          segment.signed = signed_in(specifiers);
        case "float":
          segment.bigendian = endian_in(specifiers);
        default:
          segment.unit = unit_in(specifiers, segment.type);
      }
      return segment;
    }
    function endian_in(specifiers) {
      return !specifiers["little"];
    }
    function signed_in(specifiers) {
      return specifiers["signed"];
    }
    function unit_in(specifiers, type) {
      for (var s in specifiers) {
        if (!Object.prototype.hasOwnProperty.call(specifiers, s))
          continue;
        if (s.substr(0, 5) == "unit:") {
          var unit = parseInt(s.substr(5));
          return unit;
        }
      }
      switch (type) {
        case "binary":
          return 8;
        case "integer":
        case "float":
          return 1;
      }
    }
    function size_of(segment, type, size, unit) {
      if (size !== void 0 && size !== "") {
        return size;
      } else {
        switch (type) {
          case "integer":
            return 8;
          case "float":
            return 64;
          case "binary":
            return true;
        }
      }
    }
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/parser.js"(exports, module2) {
    module2.exports = function() {
      function quote(s) {
        return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"';
      }
      var result = {
        /*
         * Parses the input with a generated parser. If the parsing is successfull,
         * returns a value explicitly or implicitly specified by the grammar from
         * which the parser was generated (see |PEG.buildParser|). If the parsing is
         * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
         */
        parse: function(input, startRule) {
          var parseFunctions = {
            "start": parse_start,
            "segmentTail": parse_segmentTail,
            "segment": parse_segment,
            "string": parse_string,
            "chars": parse_chars,
            "char": parse_char,
            "hexDigit": parse_hexDigit,
            "identifier": parse_identifier,
            "number": parse_number,
            "size": parse_size,
            "specifierList": parse_specifierList,
            "specifierTail": parse_specifierTail,
            "specifier": parse_specifier,
            "unit": parse_unit,
            "ws": parse_ws
          };
          if (startRule !== void 0) {
            if (parseFunctions[startRule] === void 0) {
              throw new Error("Invalid rule name: " + quote(startRule) + ".");
            }
          } else {
            startRule = "start";
          }
          var pos = 0;
          var reportFailures = 0;
          var rightmostFailuresPos = 0;
          var rightmostFailuresExpected = [];
          function padLeft(input2, padding, length) {
            var result3 = input2;
            var padLength = length - input2.length;
            for (var i = 0; i < padLength; i++) {
              result3 = padding + result3;
            }
            return result3;
          }
          function escape2(ch) {
            var charCode = ch.charCodeAt(0);
            var escapeChar;
            var length;
            if (charCode <= 255) {
              escapeChar = "x";
              length = 2;
            } else {
              escapeChar = "u";
              length = 4;
            }
            return "\\" + escapeChar + padLeft(charCode.toString(16).toUpperCase(), "0", length);
          }
          function matchFailed(failure) {
            if (pos < rightmostFailuresPos) {
              return;
            }
            if (pos > rightmostFailuresPos) {
              rightmostFailuresPos = pos;
              rightmostFailuresExpected = [];
            }
            rightmostFailuresExpected.push(failure);
          }
          function parse_start() {
            var result0, result1, result22, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_ws();
            if (result0 !== null) {
              result1 = parse_segment();
              if (result1 !== null) {
                result22 = [];
                result3 = parse_segmentTail();
                while (result3 !== null) {
                  result22.push(result3);
                  result3 = parse_segmentTail();
                }
                if (result22 !== null) {
                  result0 = [result0, result1, result22];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, head, tail) {
                tail.unshift(head);
                return tail;
              }(pos0, result0[1], result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_segmentTail() {
            var result0, result1, result22, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_ws();
            if (result0 !== null) {
              if (input.charCodeAt(pos) === 44) {
                result1 = ",";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed('","');
                }
              }
              if (result1 !== null) {
                result22 = parse_ws();
                if (result22 !== null) {
                  result3 = parse_segment();
                  if (result3 !== null) {
                    result0 = [result0, result1, result22, result3];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, seg) {
                return seg;
              }(pos0, result0[3]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_segment() {
            var result0, result1, result22;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_string();
            if (result0 !== null) {
              result0 = function(offset2, str) {
                return { string: str };
              }(pos0, result0);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              result0 = parse_identifier();
              if (result0 !== null) {
                result1 = parse_size();
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                  result22 = parse_specifierList();
                  result22 = result22 !== null ? result22 : "";
                  if (result22 !== null) {
                    result0 = [result0, result1, result22];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, v, size, specs) {
                  return { name: v, size, specifiers: specs };
                }(pos0, result0[0], result0[1], result0[2]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              if (result0 === null) {
                pos0 = pos;
                pos1 = pos;
                result0 = parse_number();
                if (result0 !== null) {
                  result1 = parse_size();
                  result1 = result1 !== null ? result1 : "";
                  if (result1 !== null) {
                    result22 = parse_specifierList();
                    result22 = result22 !== null ? result22 : "";
                    if (result22 !== null) {
                      result0 = [result0, result1, result22];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
                if (result0 !== null) {
                  result0 = function(offset2, v, size, specs) {
                    return { value: v, size, specifiers: specs };
                  }(pos0, result0[0], result0[1], result0[2]);
                }
                if (result0 === null) {
                  pos = pos0;
                }
              }
            }
            return result0;
          }
          function parse_string() {
            var result0, result1, result22;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 34) {
              result0 = '"';
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('"\\""');
              }
            }
            if (result0 !== null) {
              if (input.charCodeAt(pos) === 34) {
                result1 = '"';
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed('"\\""');
                }
              }
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2) {
                return "";
              }(pos0);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              if (input.charCodeAt(pos) === 34) {
                result0 = '"';
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed('"\\""');
                }
              }
              if (result0 !== null) {
                result1 = parse_chars();
                if (result1 !== null) {
                  if (input.charCodeAt(pos) === 34) {
                    result22 = '"';
                    pos++;
                  } else {
                    result22 = null;
                    if (reportFailures === 0) {
                      matchFailed('"\\""');
                    }
                  }
                  if (result22 !== null) {
                    result0 = [result0, result1, result22];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, chars) {
                  return chars;
                }(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
            }
            return result0;
          }
          function parse_chars() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_char();
            if (result1 !== null) {
              result0 = [];
              while (result1 !== null) {
                result0.push(result1);
                result1 = parse_char();
              }
            } else {
              result0 = null;
            }
            if (result0 !== null) {
              result0 = function(offset2, chars) {
                return chars.join("");
              }(pos0, result0);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_char() {
            var result0, result1, result22, result3, result4;
            var pos0, pos1;
            if (/^[^"\\\0-\x1F]/.test(input.charAt(pos))) {
              result0 = input.charAt(pos);
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('[^"\\\\\\0-\\x1F\x7F]');
              }
            }
            if (result0 === null) {
              pos0 = pos;
              if (input.substr(pos, 2) === '\\"') {
                result0 = '\\"';
                pos += 2;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed('"\\\\\\""');
                }
              }
              if (result0 !== null) {
                result0 = function(offset2) {
                  return '"';
                }(pos0);
              }
              if (result0 === null) {
                pos = pos0;
              }
              if (result0 === null) {
                pos0 = pos;
                if (input.substr(pos, 2) === "\\\\") {
                  result0 = "\\\\";
                  pos += 2;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed('"\\\\\\\\"');
                  }
                }
                if (result0 !== null) {
                  result0 = function(offset2) {
                    return "\\";
                  }(pos0);
                }
                if (result0 === null) {
                  pos = pos0;
                }
                if (result0 === null) {
                  pos0 = pos;
                  if (input.substr(pos, 2) === "\\/") {
                    result0 = "\\/";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed('"\\\\/"');
                    }
                  }
                  if (result0 !== null) {
                    result0 = function(offset2) {
                      return "/";
                    }(pos0);
                  }
                  if (result0 === null) {
                    pos = pos0;
                  }
                  if (result0 === null) {
                    pos0 = pos;
                    if (input.substr(pos, 2) === "\\b") {
                      result0 = "\\b";
                      pos += 2;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed('"\\\\b"');
                      }
                    }
                    if (result0 !== null) {
                      result0 = function(offset2) {
                        return "\b";
                      }(pos0);
                    }
                    if (result0 === null) {
                      pos = pos0;
                    }
                    if (result0 === null) {
                      pos0 = pos;
                      if (input.substr(pos, 2) === "\\f") {
                        result0 = "\\f";
                        pos += 2;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed('"\\\\f"');
                        }
                      }
                      if (result0 !== null) {
                        result0 = function(offset2) {
                          return "\f";
                        }(pos0);
                      }
                      if (result0 === null) {
                        pos = pos0;
                      }
                      if (result0 === null) {
                        pos0 = pos;
                        if (input.substr(pos, 2) === "\\n") {
                          result0 = "\\n";
                          pos += 2;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed('"\\\\n"');
                          }
                        }
                        if (result0 !== null) {
                          result0 = function(offset2) {
                            return "\n";
                          }(pos0);
                        }
                        if (result0 === null) {
                          pos = pos0;
                        }
                        if (result0 === null) {
                          pos0 = pos;
                          if (input.substr(pos, 2) === "\\r") {
                            result0 = "\\r";
                            pos += 2;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed('"\\\\r"');
                            }
                          }
                          if (result0 !== null) {
                            result0 = function(offset2) {
                              return "\r";
                            }(pos0);
                          }
                          if (result0 === null) {
                            pos = pos0;
                          }
                          if (result0 === null) {
                            pos0 = pos;
                            if (input.substr(pos, 2) === "\\t") {
                              result0 = "\\t";
                              pos += 2;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed('"\\\\t"');
                              }
                            }
                            if (result0 !== null) {
                              result0 = function(offset2) {
                                return "	";
                              }(pos0);
                            }
                            if (result0 === null) {
                              pos = pos0;
                            }
                            if (result0 === null) {
                              pos0 = pos;
                              pos1 = pos;
                              if (input.substr(pos, 2) === "\\u") {
                                result0 = "\\u";
                                pos += 2;
                              } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                  matchFailed('"\\\\u"');
                                }
                              }
                              if (result0 !== null) {
                                result1 = parse_hexDigit();
                                if (result1 !== null) {
                                  result22 = parse_hexDigit();
                                  if (result22 !== null) {
                                    result3 = parse_hexDigit();
                                    if (result3 !== null) {
                                      result4 = parse_hexDigit();
                                      if (result4 !== null) {
                                        result0 = [result0, result1, result22, result3, result4];
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                              if (result0 !== null) {
                                result0 = function(offset2, h1, h2, h3, h4) {
                                  return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
                                }(pos0, result0[1], result0[2], result0[3], result0[4]);
                              }
                              if (result0 === null) {
                                pos = pos0;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            return result0;
          }
          function parse_hexDigit() {
            var result0;
            if (/^[0-9a-fA-F]/.test(input.charAt(pos))) {
              result0 = input.charAt(pos);
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9a-fA-F]");
              }
            }
            return result0;
          }
          function parse_identifier() {
            var result0, result1, result22;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (/^[_a-zA-Z]/.test(input.charAt(pos))) {
              result0 = input.charAt(pos);
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("[_a-zA-Z]");
              }
            }
            if (result0 !== null) {
              result1 = [];
              if (/^[_a-zA-Z0-9]/.test(input.charAt(pos))) {
                result22 = input.charAt(pos);
                pos++;
              } else {
                result22 = null;
                if (reportFailures === 0) {
                  matchFailed("[_a-zA-Z0-9]");
                }
              }
              while (result22 !== null) {
                result1.push(result22);
                if (/^[_a-zA-Z0-9]/.test(input.charAt(pos))) {
                  result22 = input.charAt(pos);
                  pos++;
                } else {
                  result22 = null;
                  if (reportFailures === 0) {
                    matchFailed("[_a-zA-Z0-9]");
                  }
                }
              }
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, head, tail) {
                return head + tail.join("");
              }(pos0, result0[0], result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_number() {
            var result0, result1, result22;
            var pos0, pos1;
            pos0 = pos;
            if (input.charCodeAt(pos) === 48) {
              result0 = "0";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('"0"');
              }
            }
            if (result0 !== null) {
              result0 = function(offset2) {
                return 0;
              }(pos0);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              if (/^[1-9]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("[1-9]");
                }
              }
              if (result0 !== null) {
                result1 = [];
                if (/^[0-9]/.test(input.charAt(pos))) {
                  result22 = input.charAt(pos);
                  pos++;
                } else {
                  result22 = null;
                  if (reportFailures === 0) {
                    matchFailed("[0-9]");
                  }
                }
                while (result22 !== null) {
                  result1.push(result22);
                  if (/^[0-9]/.test(input.charAt(pos))) {
                    result22 = input.charAt(pos);
                    pos++;
                  } else {
                    result22 = null;
                    if (reportFailures === 0) {
                      matchFailed("[0-9]");
                    }
                  }
                }
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, head, tail) {
                  return parseInt(head + tail.join(""));
                }(pos0, result0[0], result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
            }
            return result0;
          }
          function parse_size() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 58) {
              result0 = ":";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('":"');
              }
            }
            if (result0 !== null) {
              result1 = parse_number();
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, num) {
                return num;
              }(pos0, result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              if (input.charCodeAt(pos) === 58) {
                result0 = ":";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed('":"');
                }
              }
              if (result0 !== null) {
                result1 = parse_identifier();
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, id) {
                  return id;
                }(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
            }
            return result0;
          }
          function parse_specifierList() {
            var result0, result1, result22, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 47) {
              result0 = "/";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('"/"');
              }
            }
            if (result0 !== null) {
              result1 = parse_specifier();
              if (result1 !== null) {
                result22 = [];
                result3 = parse_specifierTail();
                while (result3 !== null) {
                  result22.push(result3);
                  result3 = parse_specifierTail();
                }
                if (result22 !== null) {
                  result0 = [result0, result1, result22];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, head, tail) {
                tail.unshift(head);
                return tail;
              }(pos0, result0[1], result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_specifierTail() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 45) {
              result0 = "-";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('"-"');
              }
            }
            if (result0 !== null) {
              result1 = parse_specifier();
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, spec) {
                return spec;
              }(pos0, result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_specifier() {
            var result0;
            if (input.substr(pos, 6) === "little") {
              result0 = "little";
              pos += 6;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('"little"');
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 3) === "big") {
                result0 = "big";
                pos += 3;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed('"big"');
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 6) === "signed") {
                  result0 = "signed";
                  pos += 6;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed('"signed"');
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 8) === "unsigned") {
                    result0 = "unsigned";
                    pos += 8;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed('"unsigned"');
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos, 7) === "integer") {
                      result0 = "integer";
                      pos += 7;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed('"integer"');
                      }
                    }
                    if (result0 === null) {
                      if (input.substr(pos, 6) === "binary") {
                        result0 = "binary";
                        pos += 6;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed('"binary"');
                        }
                      }
                      if (result0 === null) {
                        if (input.substr(pos, 5) === "float") {
                          result0 = "float";
                          pos += 5;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed('"float"');
                          }
                        }
                        if (result0 === null) {
                          result0 = parse_unit();
                        }
                      }
                    }
                  }
                }
              }
            }
            return result0;
          }
          function parse_unit() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 5) === "unit:") {
              result0 = "unit:";
              pos += 5;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed('"unit:"');
              }
            }
            if (result0 !== null) {
              result1 = parse_number();
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, num) {
                return "unit:" + num;
              }(pos0, result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            return result0;
          }
          function parse_ws() {
            var result0, result1;
            result0 = [];
            if (/^[ \t\n]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[ \\t\\n]");
              }
            }
            while (result1 !== null) {
              result0.push(result1);
              if (/^[ \t\n]/.test(input.charAt(pos))) {
                result1 = input.charAt(pos);
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("[ \\t\\n]");
                }
              }
            }
            return result0;
          }
          function cleanupExpected(expected) {
            expected.sort();
            var lastExpected = null;
            var cleanExpected = [];
            for (var i = 0; i < expected.length; i++) {
              if (expected[i] !== lastExpected) {
                cleanExpected.push(expected[i]);
                lastExpected = expected[i];
              }
            }
            return cleanExpected;
          }
          function computeErrorPosition() {
            var line = 1;
            var column = 1;
            var seenCR = false;
            for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
              var ch = input.charAt(i);
              if (ch === "\n") {
                if (!seenCR) {
                  line++;
                }
                column = 1;
                seenCR = false;
              } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                line++;
                column = 1;
                seenCR = true;
              } else {
                column++;
                seenCR = false;
              }
            }
            return { line, column };
          }
          var result2 = parseFunctions[startRule]();
          if (result2 === null || pos !== input.length) {
            var offset = Math.max(pos, rightmostFailuresPos);
            var found = offset < input.length ? input.charAt(offset) : null;
            var errorPosition = computeErrorPosition();
            throw new this.SyntaxError(
              cleanupExpected(rightmostFailuresExpected),
              found,
              offset,
              errorPosition.line,
              errorPosition.column
            );
          }
          return result2;
        },
        /* Returns the parser source code. */
        toSource: function() {
          return this._source;
        }
      };
      result.SyntaxError = function(expected, found, offset, line, column) {
        function buildMessage(expected2, found2) {
          var expectedHumanized, foundHumanized;
          switch (expected2.length) {
            case 0:
              expectedHumanized = "end of input";
              break;
            case 1:
              expectedHumanized = expected2[0];
              break;
            default:
              expectedHumanized = expected2.slice(0, expected2.length - 1).join(", ") + " or " + expected2[expected2.length - 1];
          }
          foundHumanized = found2 ? quote(found2) : "end of input";
          return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
        }
        this.name = "SyntaxError";
        this.expected = expected;
        this.found = found;
        this.message = buildMessage(expected, found);
        this.offset = offset;
        this.line = line;
        this.column = column;
      };
      result.SyntaxError.prototype = Error.prototype;
      return result;
    }();
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/parse.js"(exports, module2) {
    "use strict";
    var ast = require_pattern();
    var parser = require_parser();
    function parse_pattern(string) {
      var segments = parser.parse(string);
      for (var i = 0, len = segments.length; i < len; i++) {
        var s = segments[i];
        if (s.string != void 0) {
          segments[i] = ast.string(s.string);
        } else if (s.value != void 0) {
          segments[i] = ast.value(s.value, s.size, s.specifiers);
        } else if (s.name != void 0) {
          segments[i] = ast.variable(s.name, s.size, s.specifiers);
        } else {
          throw "Unknown segment " + s;
        }
      }
      return segments;
    }
    module2.exports.parse = function() {
      var str = [].join.call(arguments, ",");
      return parse_pattern(str);
    };
  }
});

// node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/interp.js
var require_interp = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/interp.js"(exports, module2) {
    "use strict";
    var ints = require_buffer_more_ints();
    var debug = require_src()("bitsyntax-Interpreter");
    function parse_int(bin, off, sizeInBytes, bigendian, signed) {
      switch (sizeInBytes) {
        case 1:
          return signed ? bin.readInt8(off) : bin.readUInt8(off);
        case 2:
          return bigendian ? signed ? bin.readInt16BE(off) : bin.readUInt16BE(off) : signed ? bin.readInt16LE(off) : bin.readUInt16LE(off);
        case 4:
          return bigendian ? signed ? bin.readInt32BE(off) : bin.readUInt32BE(off) : signed ? bin.readInt32LE(off) : bin.readUInt32LE(off);
        case 8:
          return bigendian ? (signed ? ints.readInt64BE : ints.readUInt64BE)(bin, off) : (signed ? ints.readInt64LE : ints.readUInt64LE)(bin, off);
        default:
          throw "Integers must be 8-, 16-, 32- or 64-bit";
      }
    }
    function parse_float(bin, off, sizeInBytes, bigendian) {
      switch (sizeInBytes) {
        case 4:
          return bigendian ? bin.readFloatBE(off) : bin.readFloatLE(off);
        case 8:
          return bigendian ? bin.readDoubleBE(off) : bin.readDoubleLE(off);
        default:
          throw "Floats must be 32- or 64-bit";
      }
    }
    function size_of(segment, bound) {
      var size = segment.size;
      if (typeof size === "string") {
        return bound[size];
      } else {
        return size;
      }
    }
    function new_scope(env) {
      function scope() {
      }
      ;
      scope.prototype = env;
      return new scope();
    }
    function bindings(scope) {
      var s = {};
      for (var k in scope) {
        if (scope.hasOwnProperty(k)) {
          s[k] = scope[k];
        }
      }
      return s;
    }
    function match(pattern, binary, boundvars) {
      var offset = 0, vars = new_scope(boundvars);
      var binsize = binary.length * 8;
      function skip_bits(segment2) {
        debug("skip bits");
        debug(segment2);
        var size = size_of(segment2, vars);
        if (size === true) {
          if (offset % 8 === 0) {
            offset = binsize;
            return true;
          } else {
            return false;
          }
        }
        var bits = segment2.unit * size;
        if (offset + bits > binsize) {
          return false;
        } else {
          offset += bits;
        }
      }
      function get_integer(segment2) {
        debug("get_integer");
        debug(segment2);
        var unit = segment2.unit, size = size_of(segment2, vars);
        var bitsize = size * unit;
        var byteoffset = offset / 8;
        offset += bitsize;
        if (bitsize % 8 > 0 || offset > binsize) {
          return false;
        } else {
          return parse_int(
            binary,
            byteoffset,
            bitsize / 8,
            segment2.bigendian,
            segment2.signed
          );
        }
      }
      function get_float(segment2) {
        debug("get_float");
        debug(segment2);
        var unit = segment2.unit;
        var size = size_of(segment2, vars);
        var bitsize = size * unit;
        var byteoffset = offset / 8;
        offset += bitsize;
        if (offset > binsize) {
          return false;
        } else {
          return parse_float(
            binary,
            byteoffset,
            bitsize / 8,
            segment2.bigendian
          );
        }
      }
      function get_binary(segment2) {
        debug("get_binary");
        debug(segment2);
        var unit = segment2.unit, size = size_of(segment2, vars);
        var byteoffset = offset / 8;
        if (size === true) {
          offset = binsize;
          return binary.slice(byteoffset);
        } else {
          var bitsize = size * unit;
          if (bitsize % 8 > 0 || offset + bitsize > binsize) {
            return false;
          } else {
            offset += bitsize;
            return binary.slice(byteoffset, byteoffset + bitsize / 8);
          }
        }
      }
      function get_string(segment2) {
        debug("get_string");
        debug(segment2);
        var len = segment2.value.length;
        var byteoffset = offset / 8;
        offset += len * 8;
        if (offset > binsize) {
          return false;
        }
        return binary.slice(byteoffset, byteoffset + len).toString("utf8");
      }
      var patternlen = pattern.length;
      for (var i = 0; i < patternlen; i++) {
        var segment = pattern[i];
        var result = false;
        if (segment.name === "_") {
          result = skip_bits(segment);
        } else {
          switch (segment.type) {
            case "string":
              result = get_string(segment);
              break;
            case "integer":
              result = get_integer(segment);
              break;
            case "float":
              result = get_float(segment);
              break;
            case "binary":
              result = get_binary(segment);
              break;
          }
          if (result === false) {
            return false;
          } else if (segment.name) {
            vars[segment.name] = result;
          } else if (segment.value != result) {
            return false;
          }
        }
      }
      if (offset == binsize) {
        return bindings(vars);
      } else {
        return false;
      }
    }
    module2.exports.match = match;
    module2.exports.parse_int = parse_int;
    module2.exports.parse_float = parse_float;
  }
});

// node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js"(exports, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/constructor.js
var require_constructor = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/constructor.js"(exports, module2) {
    "use strict";
    var ints = require_buffer_more_ints();
    var Buffer2 = require_safe_buffer().Buffer;
    function write(buf, offset, pattern, bindings) {
      for (var i = 0, len = pattern.length; i < len; i++) {
        var segment = pattern[i];
        switch (segment.type) {
          case "string":
            offset += buf.write(segment.value, offset, "utf8");
            break;
          case "binary":
            offset += writeBinary(segment, buf, offset, bindings);
            break;
          case "integer":
            offset += writeInteger(segment, buf, offset, bindings);
            break;
          case "float":
            offset += writeFloat(segment, buf, offset, bindings);
            break;
        }
      }
      return offset;
    }
    function build(pattern, bindings) {
      var bufsize = size_of(pattern, bindings);
      var buf = Buffer2.alloc(bufsize);
      write(buf, 0, pattern, bindings);
      return buf;
    }
    function size_of_segment(segment, bindings) {
      if (typeof segment.size === "string") {
        return bindings[segment.size] * segment.unit / 8;
      }
      if (segment.type === "string") {
        return Buffer2.byteLength(segment.value, "utf8");
      }
      if (segment.type === "binary" && segment.size === true) {
        var val = bindings[segment.name];
        return val.length;
      }
      return segment.size * segment.unit / 8;
    }
    function size_of(segments, bindings) {
      var size = 0;
      for (var i = 0, len = segments.length; i < len; i++) {
        size += size_of_segment(segments[i], bindings);
      }
      return size;
    }
    function writeBinary(segment, buf, offset, bindings) {
      var bin = bindings[segment.name];
      var size = size_of_segment(segment, bindings);
      bin.copy(buf, offset, 0, size);
      return size;
    }
    function writeInteger(segment, buf, offset, bindings) {
      var value = segment.name ? bindings[segment.name] : segment.value;
      var size = size_of_segment(segment, bindings);
      return write_int(buf, value, offset, size, segment.bigendian);
    }
    function write_int(buf, value, offset, size, bigendian) {
      switch (size) {
        case 1:
          buf.writeUInt8(value, offset);
          break;
        case 2:
          bigendian ? buf.writeUInt16BE(value, offset) : buf.writeUInt16LE(value, offset);
          break;
        case 4:
          bigendian ? buf.writeUInt32BE(value, offset) : buf.writeUInt32LE(value, offset);
          break;
        case 8:
          bigendian ? ints.writeUInt64BE(buf, value, offset) : ints.writeUInt64LE(buf, value, offset);
          break;
        default:
          throw new Error("integer size * unit must be 8, 16, 32 or 64");
      }
      return size;
    }
    function writeFloat(segment, buf, offset, bindings) {
      var value = segment.name ? bindings[segment.name] : segment.value;
      var size = size_of_segment(segment, bindings);
      return write_float(buf, value, offset, size, segment.bigendian);
    }
    function write_float(buf, value, offset, size, bigendian) {
      if (size === 4) {
        bigendian ? buf.writeFloatBE(value, offset) : buf.writeFloatLE(value, offset);
      } else if (size === 8) {
        bigendian ? buf.writeDoubleBE(value, offset) : buf.writeDoubleLE(value, offset);
      } else {
        throw new Error("float size * unit must be 32 or 64");
      }
      return size;
    }
    var parse2 = require_parse().parse;
    module2.exports.write = write;
    module2.exports.build = build;
    module2.exports.write_int = write_int;
    module2.exports.write_float = write_float;
    module2.exports.builder = function(pstr) {
      pstr = arguments.length > 1 ? [].join.call(arguments, ",") : pstr;
      var pattern = parse2(pstr);
      return function(vars) {
        return build(pattern, vars);
      };
    };
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/compile.js
var require_compile = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/lib/compile.js"(exports, module2) {
    "use strict";
    require_buffer_more_ints();
    var $ = require("util").format;
    var parse2 = require_parse().parse;
    var interp = require_interp();
    var parse_int = interp.parse_int;
    var parse_float = interp.parse_float;
    var construct = require_constructor();
    var write_int = construct.write_int;
    var write_float = construct.write_float;
    var Buffer2 = require_safe_buffer().Buffer;
    var lines = [];
    function $start() {
      lines = [];
    }
    function $line() {
      lines.push($.apply(null, arguments));
    }
    function $result() {
      return lines.join("\n");
    }
    function bits_expr(segment) {
      if (typeof segment.size === "string") {
        return $("%s * %d", var_name(segment.size), segment.unit);
      } else {
        return (segment.size * segment.unit).toString();
      }
    }
    function get_number(segment) {
      $line("bits = %s;\n", bits_expr(segment));
      var parser = segment.type === "integer" ? "parse_int" : "parse_float";
      var be = segment.bigendian, sg = segment.signed;
      $line("byteoffset = offset / 8; offset += bits");
      $line("if (offset > binsize) { return false; }");
      $line(
        "else { result = %s(bin, byteoffset, bits / 8, %s, %s); }",
        parser,
        be,
        sg
      );
    }
    function get_binary(segment) {
      $line("byteoffset = offset / 8;");
      if (segment.size === true) {
        $line("offset = binsize;");
        $line("result = bin.slice(byteoffset);");
      } else {
        $line("bits = %s;", bits_expr(segment));
        $line("offset += bits;");
        $line("if (offset > binsize) { return false; }");
        $line(
          "else { result = bin.slice(byteoffset,",
          "byteoffset + bits / 8); }"
        );
      }
    }
    function get_string(segment) {
      $line("byteoffset = offset / 8;");
      var strlen = segment.value.length;
      var strlenbits = strlen * 8;
      $line("offset += %d;", strlenbits);
      $line("if (offset > binsize) { return false; }");
      $line(
        "else { result = bin.toString(byteoffset,",
        $("byteoffset + %d); }", strlen)
      );
    }
    function skip_bits(segment) {
      if (typeof segment.size === "string") {
        $line(
          "var skipbits = %s * %d;",
          var_name(segment.size),
          segment.unit
        );
        $line("if (offset + skipbits > binsize) { return false; }");
        $line("else { offset += skipbits; }");
      } else if (segment.size === true) {
        $line("if (offset % 8 === 0) { offset = binsize; }");
        $line("else { return false; }");
      } else {
        var bits = segment.unit * segment.size;
        $line("if (offset + %d > binsize) { return false; }", bits);
        $line("else { offset += %d; }", bits);
      }
    }
    function match_seg(segment) {
      if (segment.name === "_") {
        skip_bits(segment);
      } else {
        var assign_result;
        switch (segment.type) {
          case "integer":
          case "float":
            get_number(segment);
            break;
          case "binary":
            get_binary(segment);
            break;
          case "string":
            get_string(segment);
            break;
        }
        $line("if (result === false) return false;");
        if (segment.name) {
          $line("else if (%s !== undefined) {", var_name(segment.name));
          $line(
            "if (%s != result) return false;",
            var_name(segment.name)
          );
          $line("}");
          $line("else %s = result;", var_name(segment.name));
        } else {
          var repr = JSON.stringify(segment.value);
          $line("else if (result != %s) return false;", repr);
        }
      }
    }
    function var_name(name) {
      return "var_" + name;
    }
    function variables(segments) {
      var names = {};
      for (var i = 0; i < segments.length; i++) {
        var name = segments[i].name;
        if (name && name !== "_") {
          names[name] = true;
        }
        name = segments[i].size;
        if (typeof name === "string") {
          names[name] = true;
        }
      }
      return Object.keys(names);
    }
    function compile_pattern(segments) {
      $start();
      $line("return function(binary, env) {");
      $line("'use strict';");
      $line("var bin = binary, env = env || {};");
      $line("var offset = 0, binsize = bin.length * 8;");
      $line("var bits, result, byteoffset;");
      var varnames = variables(segments);
      for (var v = 0; v < varnames.length; v++) {
        var name = varnames[v];
        $line("var %s = env['%s'];", var_name(name), name);
      }
      var len = segments.length;
      for (var i = 0; i < len; i++) {
        var segment = segments[i];
        $line("// " + JSON.stringify(segment));
        match_seg(segment);
      }
      $line("if (offset == binsize) {");
      $line("return {");
      for (var v = 0; v < varnames.length; v++) {
        var name = varnames[v];
        $line("%s: %s,", name, var_name(name));
      }
      $line("};");
      $line("}");
      $line("else return false;");
      $line("}");
      var fn = new Function("parse_int", "parse_float", $result());
      return fn(parse_int, parse_float);
    }
    function write_seg(segment) {
      switch (segment.type) {
        case "string":
          $line(
            "offset += buf.write(%s, offset, 'utf8');",
            JSON.stringify(segment.value)
          );
          break;
        case "binary":
          $line("val = bindings['%s'];", segment.name);
          if (segment.size === true) {
            $line("size = val.length;");
          } else if (typeof segment.size === "string") {
            $line(
              "size = (bindings['%s'] * %d) / 8;",
              segment.size,
              segment.unit
            );
          } else {
            $line("size = %d;", segment.size * segment.unit / 8);
          }
          $line("val.copy(buf, offset, 0, size);");
          $line("offset += size;");
          break;
        case "integer":
        case "float":
          write_number(segment);
          break;
      }
    }
    function write_number(segment) {
      if (segment.name) {
        $line("val = bindings['%s'];", segment.name);
      } else {
        $line("val = %d", segment.value);
      }
      var writer = segment.type === "integer" ? "write_int" : "write_float";
      if (typeof segment.size === "string") {
        $line(
          "size = (bindings['%s'] * %d) / 8;",
          segment.size,
          segment.unit
        );
      } else {
        $line("size = %d;", segment.size * segment.unit / 8);
      }
      $line(
        "%s(buf, val, offset, size, %s);",
        writer,
        segment.bigendian
      );
      $line("offset += size;");
    }
    function size_of(segments) {
      var variable = [];
      var fixed = 0;
      for (var i = 0; i < segments.length; i++) {
        var segment = segments[i];
        if (typeof segment.size === "string" || segment.size === true) {
          variable.push(segment);
        } else if (segment.type === "string") {
          fixed += Buffer2.byteLength(segment.value);
        } else {
          fixed += segment.size * segment.unit / 8;
        }
      }
      $line("var buffersize = %d;", fixed);
      if (variable.length > 0) {
        for (var j = 0; j < variable.length; j++) {
          var segment = variable[j];
          if (segment.size === true) {
            $line("buffersize += bindings['%s'].length;", segment.name);
          } else {
            $line(
              "buffersize += (bindings['%s'] * %d) / 8;",
              segment.size,
              segment.unit
            );
          }
        }
      }
    }
    function emit_write(segments) {
      $line("var val, size;");
      var len = segments.length;
      for (var i = 0; i < len; i++) {
        var segment = segments[i];
        $line("// %s", JSON.stringify(segment));
        write_seg(segment);
      }
    }
    function compile_ctor(segments) {
      $start();
      $line("return function(bindings) {");
      $line("'use strict';");
      size_of(segments);
      $line("var buf = Buffer.alloc(buffersize);");
      $line("var offset = 0;");
      emit_write(segments);
      $line("return buf;");
      $line("}");
      return new Function(
        "write_int",
        "write_float",
        "Buffer",
        $result()
      )(write_int, write_float, Buffer2);
    }
    module2.exports.compile_pattern = compile_pattern;
    module2.exports.compile = function() {
      var str = [].join.call(arguments, ",");
      var p = parse2(str);
      return compile_pattern(p);
    };
    module2.exports.compile_builder = function() {
      var str = [].join.call(arguments, ",");
      var p = parse2(str);
      return compile_ctor(p);
    };
  }
});

// node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/index.js
var require_bitsyntax = __commonJS({
  "node_modules/.pnpm/@acuminous+bitsyntax@0.1.2/node_modules/@acuminous/bitsyntax/index.js"(exports, module2) {
    "use strict";
    module2.exports.parse = require_parse().parse;
    module2.exports.match = require_interp().match;
    module2.exports.build = require_constructor().build;
    module2.exports.write = require_constructor().write;
    module2.exports.matcher = module2.exports.compile = require_compile().compile;
    module2.exports.builder = require_compile().compile_builder;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/frame.js
var require_frame = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/frame.js"(exports, module2) {
    "use strict";
    var defs = require_defs();
    var constants = defs.constants;
    var decode = defs.decode;
    var Bits = require_bitsyntax();
    module2.exports.PROTOCOL_HEADER = "AMQP" + String.fromCharCode(0, 0, 9, 1);
    var FRAME_METHOD = constants.FRAME_METHOD;
    var FRAME_HEARTBEAT = constants.FRAME_HEARTBEAT;
    var FRAME_HEADER = constants.FRAME_HEADER;
    var FRAME_BODY = constants.FRAME_BODY;
    var FRAME_END = constants.FRAME_END;
    var bodyCons = Bits.builder(
      FRAME_BODY,
      "channel:16, size:32, payload:size/binary",
      FRAME_END
    );
    module2.exports.makeBodyFrame = function(channel, payload) {
      return bodyCons({ channel, size: payload.length, payload });
    };
    var frameHeaderPattern = Bits.matcher(
      "type:8",
      "channel:16",
      "size:32",
      "rest/binary"
    );
    function parseFrame(bin, max) {
      var fh = frameHeaderPattern(bin);
      if (fh) {
        var size = fh.size, rest = fh.rest;
        if (size > max) {
          throw new Error("Frame size exceeds frame max");
        } else if (rest.length > size) {
          if (rest[size] !== FRAME_END)
            throw new Error("Invalid frame");
          return {
            type: fh.type,
            channel: fh.channel,
            size,
            payload: rest.slice(0, size),
            rest: rest.slice(size + 1)
          };
        }
      }
      return false;
    }
    module2.exports.parseFrame = parseFrame;
    var headerPattern = Bits.matcher(
      "class:16",
      "_weight:16",
      "size:64",
      "flagsAndfields/binary"
    );
    var methodPattern = Bits.matcher("id:32, args/binary");
    var HEARTBEAT = { channel: 0 };
    module2.exports.decodeFrame = function(frame) {
      var payload = frame.payload;
      switch (frame.type) {
        case FRAME_METHOD:
          var idAndArgs = methodPattern(payload);
          var id = idAndArgs.id;
          var fields = decode(id, idAndArgs.args);
          return { id, channel: frame.channel, fields };
        case FRAME_HEADER:
          var parts = headerPattern(payload);
          var id = parts["class"];
          var fields = decode(id, parts.flagsAndfields);
          return {
            id,
            channel: frame.channel,
            size: parts.size,
            fields
          };
        case FRAME_BODY:
          return { channel: frame.channel, content: frame.payload };
        case FRAME_HEARTBEAT:
          return HEARTBEAT;
        default:
          throw new Error("Unknown frame type " + frame.type);
      }
    };
    module2.exports.HEARTBEAT_BUF = Buffer.from([
      constants.FRAME_HEARTBEAT,
      0,
      0,
      0,
      0,
      // size = 0
      0,
      0,
      // channel = 0
      constants.FRAME_END
    ]);
    module2.exports.HEARTBEAT = HEARTBEAT;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/mux.js
var require_mux = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/mux.js"(exports, module2) {
    "use strict";
    var assert = require("assert");
    var schedule = typeof setImmediate === "function" ? setImmediate : process.nextTick;
    function Mux(downstream) {
      this.newStreams = [];
      this.oldStreams = [];
      this.blocked = false;
      this.scheduledRead = false;
      this.out = downstream;
      var self2 = this;
      downstream.on("drain", function() {
        self2.blocked = false;
        self2._readIncoming();
      });
    }
    Mux.prototype._readIncoming = function() {
      if (this.blocked)
        return;
      var accepting = true;
      var out = this.out;
      function roundrobin(streams) {
        var s;
        while (accepting && (s = streams.shift())) {
          var chunk = s.read();
          if (chunk !== null) {
            accepting = out.write(chunk);
            streams.push(s);
          }
        }
      }
      roundrobin(this.newStreams);
      if (accepting) {
        assert.equal(0, this.newStreams.length);
        roundrobin(this.oldStreams);
      } else {
        assert(this.newStreams.length > 0, "Expect some new streams to remain");
        Array.prototype.push.apply(this.oldStreams, this.newStreams);
        this.newStreams = [];
      }
      this.blocked = !accepting;
    };
    Mux.prototype._scheduleRead = function() {
      var self2 = this;
      if (!self2.scheduledRead) {
        schedule(function() {
          self2.scheduledRead = false;
          self2._readIncoming();
        });
        self2.scheduledRead = true;
      }
    };
    Mux.prototype.pipeFrom = function(readable) {
      var self2 = this;
      function enqueue() {
        self2.newStreams.push(readable);
        self2._scheduleRead();
      }
      function cleanup() {
        readable.removeListener("readable", enqueue);
        readable.removeListener("error", cleanup);
        readable.removeListener("end", cleanup);
        readable.removeListener("unpipeFrom", cleanupIfMe);
      }
      function cleanupIfMe(dest) {
        if (dest === self2)
          cleanup();
      }
      readable.on("unpipeFrom", cleanupIfMe);
      readable.on("end", cleanup);
      readable.on("error", cleanup);
      readable.on("readable", enqueue);
    };
    Mux.prototype.unpipeFrom = function(readable) {
      readable.emit("unpipeFrom", this);
    };
    module2.exports.Mux = Mux;
  }
});

// node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js"(exports) {
    function isArray(arg) {
      if (Array.isArray) {
        return Array.isArray(arg);
      }
      return objectToString(arg) === "[object Array]";
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    function isError(e) {
      return objectToString(e) === "[object Error]" || e instanceof Error;
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require("buffer").Buffer.isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js"(exports, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/.pnpm/isarray@0.0.1/node_modules/isarray/index.js
var require_isarray = __commonJS({
  "node_modules/.pnpm/isarray@0.0.1/node_modules/isarray/index.js"(exports, module2) {
    module2.exports = Array.isArray || function(arr) {
      return Object.prototype.toString.call(arr) == "[object Array]";
    };
  }
});

// node_modules/.pnpm/string_decoder@0.10.31/node_modules/string_decoder/index.js
var require_string_decoder = __commonJS({
  "node_modules/.pnpm/string_decoder@0.10.31/node_modules/string_decoder/index.js"(exports) {
    var Buffer2 = require("buffer").Buffer;
    var isBufferEncoding = Buffer2.isEncoding || function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function assertEncoding(encoding) {
      if (encoding && !isBufferEncoding(encoding)) {
        throw new Error("Unknown encoding: " + encoding);
      }
    }
    var StringDecoder = exports.StringDecoder = function(encoding) {
      this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
      assertEncoding(encoding);
      switch (this.encoding) {
        case "utf8":
          this.surrogateSize = 3;
          break;
        case "ucs2":
        case "utf16le":
          this.surrogateSize = 2;
          this.detectIncompleteChar = utf16DetectIncompleteChar;
          break;
        case "base64":
          this.surrogateSize = 3;
          this.detectIncompleteChar = base64DetectIncompleteChar;
          break;
        default:
          this.write = passThroughWrite;
          return;
      }
      this.charBuffer = new Buffer2(6);
      this.charReceived = 0;
      this.charLength = 0;
    };
    StringDecoder.prototype.write = function(buffer) {
      var charStr = "";
      while (this.charLength) {
        var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
        buffer.copy(this.charBuffer, this.charReceived, 0, available);
        this.charReceived += available;
        if (this.charReceived < this.charLength) {
          return "";
        }
        buffer = buffer.slice(available, buffer.length);
        charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 55296 && charCode <= 56319) {
          this.charLength += this.surrogateSize;
          charStr = "";
          continue;
        }
        this.charReceived = this.charLength = 0;
        if (buffer.length === 0) {
          return charStr;
        }
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      if (this.charLength) {
        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
        end -= this.charReceived;
      }
      charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1;
      var charCode = charStr.charCodeAt(end);
      if (charCode >= 55296 && charCode <= 56319) {
        var size = this.surrogateSize;
        this.charLength += size;
        this.charReceived += size;
        this.charBuffer.copy(this.charBuffer, size, 0, size);
        buffer.copy(this.charBuffer, 0, 0, size);
        return charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function(buffer) {
      var i = buffer.length >= 3 ? 3 : buffer.length;
      for (; i > 0; i--) {
        var c = buffer[buffer.length - i];
        if (i == 1 && c >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (i <= 2 && c >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (i <= 3 && c >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i;
    };
    StringDecoder.prototype.end = function(buffer) {
      var res = "";
      if (buffer && buffer.length)
        res = this.write(buffer);
      if (this.charReceived) {
        var cr = this.charReceived;
        var buf = this.charBuffer;
        var enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
    function passThroughWrite(buffer) {
      return buffer.toString(this.encoding);
    }
    function utf16DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 2;
      this.charLength = this.charReceived ? 2 : 0;
    }
    function base64DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 3;
      this.charLength = this.charReceived ? 3 : 0;
    }
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_readable.js"(exports, module2) {
    module2.exports = Readable;
    var isArray = require_isarray();
    var Buffer2 = require("buffer").Buffer;
    Readable.ReadableState = ReadableState;
    var EE = require("events").EventEmitter;
    if (!EE.listenerCount)
      EE.listenerCount = function(emitter, type) {
        return emitter.listeners(type).length;
      };
    var Stream = require("stream");
    var util = require_util();
    util.inherits = require_inherits();
    var StringDecoder;
    var debug = require("util");
    if (debug && debug.debuglog) {
      debug = debug.debuglog("stream");
    } else {
      debug = function() {
      };
    }
    util.inherits(Readable, Stream);
    function ReadableState(options, stream) {
      var Duplex = require_stream_duplex();
      options = options || {};
      var hwm = options.highWaterMark;
      var defaultHwm = options.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
      this.highWaterMark = ~~this.highWaterMark;
      this.buffer = [];
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.ranOut = false;
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      var Duplex = require_stream_duplex();
      if (!(this instanceof Readable))
        return new Readable(options);
      this._readableState = new ReadableState(options, this);
      this.readable = true;
      Stream.call(this);
    }
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      if (util.isString(chunk) && !state.objectMode) {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = new Buffer2(chunk, encoding);
          encoding = "";
        }
      }
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, "", true);
    };
    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
      var er = chunkInvalid(state, chunk);
      if (er) {
        stream.emit("error", er);
      } else if (util.isNullOrUndefined(chunk)) {
        state.reading = false;
        if (!state.ended)
          onEofChunk(stream, state);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (state.ended && !addToFront) {
          var e = new Error("stream.push() after EOF");
          stream.emit("error", e);
        } else if (state.endEmitted && addToFront) {
          var e = new Error("stream.unshift() after end event");
          stream.emit("error", e);
        } else {
          if (state.decoder && !addToFront && !encoding)
            chunk = state.decoder.write(chunk);
          if (!addToFront)
            state.reading = false;
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit("data", chunk);
            stream.read(0);
          } else {
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
            if (state.needReadable)
              emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }
      } else if (!addToFront) {
        state.reading = false;
      }
      return needMoreData(state);
    }
    function needMoreData(state) {
      return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    }
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    var MAX_HWM = 8388608;
    function roundUpToNextPowerOf2(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        for (var p = 1; p < 32; p <<= 1)
          n |= n >> p;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return n === 0 ? 0 : 1;
      if (isNaN(n) || util.isNull(n)) {
        if (state.flowing && state.buffer.length)
          return state.buffer[0].length;
        else
          return state.length;
      }
      if (n <= 0)
        return 0;
      if (n > state.highWaterMark)
        state.highWaterMark = roundUpToNextPowerOf2(n);
      if (n > state.length) {
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        } else
          return state.length;
      }
      return n;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      var state = this._readableState;
      var nOrig = n;
      if (!util.isNumber(n) || n > 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      }
      if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
      }
      if (doRead && !state.reading)
        n = howMuchToRead(nOrig, state);
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (util.isNull(ret)) {
        state.needReadable = true;
        n = 0;
      }
      state.length -= n;
      if (state.length === 0 && !state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended && state.length === 0)
        endReadable(this);
      if (!util.isNull(ret))
        this.emit("data", ret);
      return ret;
    };
    function chunkInvalid(state, chunk) {
      var er = null;
      if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      return er;
    }
    function onEofChunk(stream, state) {
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      emitReadable(stream);
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        if (state.sync)
          process.nextTick(function() {
            emitReadable_(stream);
          });
        else
          emitReadable_(stream);
      }
    }
    function emitReadable_(stream) {
      debug("emit readable");
      stream.emit("readable");
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(function() {
          maybeReadMore_(stream, state);
        });
      }
    }
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
        else
          len = state.length;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      this.emit("error", new Error("not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : cleanup;
      if (state.endEmitted)
        process.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable) {
        debug("onunpipe");
        if (readable === src) {
          cleanup();
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", cleanup);
        src.removeListener("data", ondata);
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        if (false === ret) {
          debug(
            "false write response, pause",
            src._readableState.awaitDrain
          );
          src._readableState.awaitDrain++;
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EE.listenerCount(dest, "error") === 0)
          dest.emit("error", er);
      }
      if (!dest._events || !dest._events.error)
        dest.on("error", onerror);
      else if (isArray(dest._events.error))
        dest._events.error.unshift(onerror);
      else
        dest._events.error = [onerror, dest._events.error];
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EE.listenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++)
          dests[i].emit("unpipe", this);
        return this;
      }
      var i = indexOf(state.pipes, dest);
      if (i === -1)
        return this;
      state.pipes.splice(i, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      if (ev === "data" && false !== this._readableState.flowing) {
        this.resume();
      }
      if (ev === "readable" && this.readable) {
        var state = this._readableState;
        if (!state.readableListening) {
          state.readableListening = true;
          state.emittedReadable = false;
          state.needReadable = true;
          if (!state.reading) {
            var self2 = this;
            process.nextTick(function() {
              debug("readable nexttick read 0");
              self2.read(0);
            });
          } else if (state.length) {
            emitReadable(this, state);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = true;
        if (!state.reading) {
          debug("resume read 0");
          this.read(0);
        }
        resume(this, state);
      }
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(function() {
          resume_(stream, state);
        });
      }
    }
    function resume_(stream, state) {
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      if (state.flowing) {
        do {
          var chunk = stream.read();
        } while (null !== chunk && state.flowing);
      }
    }
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState;
      var paused = false;
      var self2 = this;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            self2.push(chunk);
        }
        self2.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (!chunk || !state.objectMode && !chunk.length)
          return;
        var ret = self2.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
          this[i] = function(method) {
            return function() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      var events = ["error", "close", "destroy", "pause", "resume"];
      forEach(events, function(ev) {
        stream.on(ev, self2.emit.bind(self2, ev));
      });
      self2._read = function(n) {
        debug("wrapped _read", n);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return self2;
    };
    Readable._fromList = fromList;
    function fromList(n, state) {
      var list = state.buffer;
      var length = state.length;
      var stringMode = !!state.decoder;
      var objectMode = !!state.objectMode;
      var ret;
      if (list.length === 0)
        return null;
      if (length === 0)
        ret = null;
      else if (objectMode)
        ret = list.shift();
      else if (!n || n >= length) {
        if (stringMode)
          ret = list.join("");
        else
          ret = Buffer2.concat(list, length);
        list.length = 0;
      } else {
        if (n < list[0].length) {
          var buf = list[0];
          ret = buf.slice(0, n);
          list[0] = buf.slice(n);
        } else if (n === list[0].length) {
          ret = list.shift();
        } else {
          if (stringMode)
            ret = "";
          else
            ret = new Buffer2(n);
          var c = 0;
          for (var i = 0, l = list.length; i < l && c < n; i++) {
            var buf = list[0];
            var cpy = Math.min(n - c, buf.length);
            if (stringMode)
              ret += buf.slice(0, cpy);
            else
              buf.copy(ret, c, 0, cpy);
            if (cpy < buf.length)
              list[0] = buf.slice(cpy);
            else
              list.shift();
            c += cpy;
          }
        }
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      if (state.length > 0)
        throw new Error("endReadable called on non-empty stream");
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(function() {
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit("end");
          }
        });
      }
    }
    function forEach(xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_writable.js"(exports, module2) {
    module2.exports = Writable;
    var Buffer2 = require("buffer").Buffer;
    Writable.WritableState = WritableState;
    var util = require_util();
    util.inherits = require_inherits();
    var Stream = require("stream");
    util.inherits(Writable, Stream);
    function WriteReq(chunk, encoding, cb) {
      this.chunk = chunk;
      this.encoding = encoding;
      this.callback = cb;
    }
    function WritableState(options, stream) {
      var Duplex = require_stream_duplex();
      options = options || {};
      var hwm = options.highWaterMark;
      var defaultHwm = options.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = ~~this.highWaterMark;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.buffer = [];
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
    }
    function Writable(options) {
      var Duplex = require_stream_duplex();
      if (!(this instanceof Writable) && !(this instanceof Duplex))
        return new Writable(options);
      this._writableState = new WritableState(options, this);
      this.writable = true;
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe. Not readable."));
    };
    function writeAfterEnd(stream, state, cb) {
      var er = new Error("write after end");
      stream.emit("error", er);
      process.nextTick(function() {
        cb(er);
      });
    }
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
      if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
        var er = new TypeError("Invalid non-string/buffer chunk");
        stream.emit("error", er);
        process.nextTick(function() {
          cb(er);
        });
        valid = false;
      }
      return valid;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      if (util.isFunction(encoding)) {
        cb = encoding;
        encoding = null;
      }
      if (util.isBuffer(chunk))
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (!util.isFunction(cb))
        cb = function() {
        };
      if (state.ended)
        writeAfterEnd(this, state, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.buffer.length)
          clearBuffer(this, state);
      }
    };
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && util.isString(chunk)) {
        chunk = new Buffer2(chunk, encoding);
      }
      return chunk;
    }
    function writeOrBuffer(stream, state, chunk, encoding, cb) {
      chunk = decodeChunk(state, chunk, encoding);
      if (util.isBuffer(chunk))
        encoding = "buffer";
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked)
        state.buffer.push(new WriteReq(chunk, encoding, cb));
      else
        doWrite(stream, state, false, len, chunk, encoding, cb);
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      if (sync)
        process.nextTick(function() {
          state.pendingcb--;
          cb(er);
        });
      else {
        state.pendingcb--;
        cb(er);
      }
      stream._writableState.errorEmitted = true;
      stream.emit("error", er);
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(stream, state);
        if (!finished && !state.corked && !state.bufferProcessing && state.buffer.length) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(function() {
            afterWrite(stream, state, finished, cb);
          });
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      if (stream._writev && state.buffer.length > 1) {
        var cbs = [];
        for (var c = 0; c < state.buffer.length; c++)
          cbs.push(state.buffer[c].callback);
        state.pendingcb++;
        doWrite(stream, state, true, state.length, state.buffer, "", function(err) {
          for (var i = 0; i < cbs.length; i++) {
            state.pendingcb--;
            cbs[i](err);
          }
        });
        state.buffer = [];
      } else {
        for (var c = 0; c < state.buffer.length; c++) {
          var entry = state.buffer[c];
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          if (state.writing) {
            c++;
            break;
          }
        }
        if (c < state.buffer.length)
          state.buffer = state.buffer.slice(c);
        else
          state.buffer.length = 0;
      }
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (util.isFunction(chunk)) {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (util.isFunction(encoding)) {
        cb = encoding;
        encoding = null;
      }
      if (!util.isNullOrUndefined(chunk))
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending && !state.finished)
        endWritable(this, state, cb);
    };
    function needFinish(stream, state) {
      return state.ending && state.length === 0 && !state.finished && !state.writing;
    }
    function prefinish(stream, state) {
      if (!state.prefinished) {
        state.prefinished = true;
        stream.emit("prefinish");
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(stream, state);
      if (need) {
        if (state.pendingcb === 0) {
          prefinish(stream, state);
          state.finished = true;
          stream.emit("finish");
        } else
          prefinish(stream, state);
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          process.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
    }
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_duplex.js"(exports, module2) {
    module2.exports = Duplex;
    var objectKeys = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj)
        keys.push(key);
      return keys;
    };
    var util = require_util();
    util.inherits = require_inherits();
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    util.inherits(Duplex, Readable);
    forEach(objectKeys(Writable.prototype), function(method) {
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    });
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false)
        this.readable = false;
      if (options && options.writable === false)
        this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false)
        this.allowHalfOpen = false;
      this.once("end", onend);
    }
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended)
        return;
      process.nextTick(this.end.bind(this));
    }
    function forEach(xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/duplex.js
var require_duplex = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/duplex.js"(exports, module2) {
    module2.exports = require_stream_duplex();
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/heartbeat.js
var require_heartbeat = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/heartbeat.js"(exports, module2) {
    "use strict";
    var inherits = require("util").inherits;
    var EventEmitter = require("events").EventEmitter;
    module2.exports.UNITS_TO_MS = 1e3;
    function Heart(interval, checkSend, checkRecv) {
      EventEmitter.call(this);
      this.interval = interval;
      var intervalMs = interval * module2.exports.UNITS_TO_MS;
      var beat = this.emit.bind(this, "beat");
      var timeout = this.emit.bind(this, "timeout");
      this.sendTimer = setInterval(
        this.runHeartbeat.bind(this, checkSend, beat),
        intervalMs / 2
      );
      var recvMissed = 0;
      function missedTwo() {
        if (!checkRecv())
          return ++recvMissed < 2;
        else {
          recvMissed = 0;
          return true;
        }
      }
      this.recvTimer = setInterval(
        this.runHeartbeat.bind(this, missedTwo, timeout),
        intervalMs
      );
    }
    inherits(Heart, EventEmitter);
    module2.exports.Heart = Heart;
    Heart.prototype.clear = function() {
      clearInterval(this.sendTimer);
      clearInterval(this.recvTimer);
    };
    Heart.prototype.runHeartbeat = function(check, fail) {
      if (!check())
        fail();
    };
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/format.js
var require_format = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/format.js"(exports, module2) {
    "use strict";
    var defs = require_defs();
    var format = require("util").format;
    var inherits = require("util").inherits;
    var HEARTBEAT = require_frame().HEARTBEAT;
    module2.exports.closeMessage = function(close) {
      var code = close.fields.replyCode;
      return format(
        '%d (%s) with message "%s"',
        code,
        defs.constant_strs[code],
        close.fields.replyText
      );
    };
    module2.exports.methodName = function(id) {
      return defs.info(id).name;
    };
    module2.exports.inspect = function(frame, showFields) {
      if (frame === HEARTBEAT) {
        return "<Heartbeat>";
      } else if (!frame.id) {
        return format(
          "<Content channel:%d size:%d>",
          frame.channel,
          frame.size
        );
      } else {
        var info = defs.info(frame.id);
        return format(
          "<%s channel:%d%s>",
          info.name,
          frame.channel,
          showFields ? " " + JSON.stringify(frame.fields, void 0, 2) : ""
        );
      }
    };
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/bitset.js
var require_bitset = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/bitset.js"(exports, module2) {
    "use strict";
    var BitSet = class {
      /**
       * @param {number} [size]
       */
      constructor(size) {
        if (size) {
          const numWords = Math.ceil(size / 32);
          this.words = new Array(numWords);
        } else {
          this.words = [];
        }
        this.wordsInUse = 0;
      }
      /**
       * @param {number} numWords
       */
      ensureSize(numWords) {
        const wordsPresent = this.words.length;
        if (wordsPresent < numWords) {
          this.words = this.words.concat(new Array(numWords - wordsPresent));
        }
      }
      /**
       * @param {number} bitIndex
       */
      set(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) {
          this.ensureSize(w + 1);
          this.wordsInUse = w + 1;
        }
        const bit = 1 << bitIndex;
        this.words[w] |= bit;
      }
      /**
       * @param {number} bitIndex
       */
      clear(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse)
          return;
        const mask = ~(1 << bitIndex);
        this.words[w] &= mask;
      }
      /**
       * @param {number} bitIndex
       */
      get(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse)
          return false;
        const bit = 1 << bitIndex;
        return !!(this.words[w] & bit);
      }
      /**
       * Give the next bit that is set on or after fromIndex, or -1 if no such bit
       *
       * @param {number} fromIndex
       */
      nextSetBit(fromIndex) {
        let w = wordIndex(fromIndex);
        if (w >= this.wordsInUse)
          return -1;
        let word = this.words[w] & 4294967295 << fromIndex;
        while (true) {
          if (word)
            return w * 32 + trailingZeros(word);
          w++;
          if (w === this.wordsInUse)
            return -1;
          word = this.words[w];
        }
      }
      /**
       * @param {number} fromIndex
       */
      nextClearBit(fromIndex) {
        let w = wordIndex(fromIndex);
        if (w >= this.wordsInUse)
          return fromIndex;
        let word = ~this.words[w] & 4294967295 << fromIndex;
        while (true) {
          if (word)
            return w * 32 + trailingZeros(word);
          w++;
          if (w == this.wordsInUse)
            return w * 32;
          word = ~this.words[w];
        }
      }
    };
    function wordIndex(bitIndex) {
      return Math.floor(bitIndex / 32);
    }
    function trailingZeros(i) {
      if (i === 0)
        return 32;
      let y, n = 31;
      y = i << 16;
      if (y != 0) {
        n = n - 16;
        i = y;
      }
      y = i << 8;
      if (y != 0) {
        n = n - 8;
        i = y;
      }
      y = i << 4;
      if (y != 0) {
        n = n - 4;
        i = y;
      }
      y = i << 2;
      if (y != 0) {
        n = n - 2;
        i = y;
      }
      return n - (i << 1 >>> 31);
    }
    module2.exports.BitSet = BitSet;
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_transform.js"(exports, module2) {
    module2.exports = Transform;
    var Duplex = require_stream_duplex();
    var util = require_util();
    util.inherits = require_inherits();
    util.inherits(Transform, Duplex);
    function TransformState(options, stream) {
      this.afterTransform = function(er, data) {
        return afterTransform(stream, er, data);
      };
      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
    }
    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb)
        return stream.emit("error", new Error("no writecb in Transform class"));
      ts.writechunk = null;
      ts.writecb = null;
      if (!util.isNullOrUndefined(data))
        stream.push(data);
      if (cb)
        cb(er);
      var rs = stream._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = new TransformState(options, this);
      var stream = this;
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      this.once("prefinish", function() {
        if (util.isFunction(this._flush))
          this._flush(function(er) {
            done(stream, er);
          });
        else
          done(stream);
      });
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    function done(stream, er) {
      if (er)
        return stream.emit("error", er);
      var ws = stream._writableState;
      var ts = stream._transformState;
      if (ws.length)
        throw new Error("calling transform done when ws.length != 0");
      if (ts.transforming)
        throw new Error("calling transform done when still transforming");
      return stream.push(null);
    }
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module2) {
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    var util = require_util();
    util.inherits = require_inherits();
    util.inherits(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/passthrough.js
var require_passthrough = __commonJS({
  "node_modules/.pnpm/readable-stream@1.1.14/node_modules/readable-stream/passthrough.js"(exports, module2) {
    module2.exports = require_stream_passthrough();
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/error.js
var require_error = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/error.js"(exports, module2) {
    var inherits = require("util").inherits;
    function trimStack(stack, num) {
      return stack && stack.split("\n").slice(num).join("\n");
    }
    function IllegalOperationError(msg, stack) {
      var tmp = new Error();
      this.message = msg;
      this.stack = this.toString() + "\n" + trimStack(tmp.stack, 2);
      this.stackAtStateChange = stack;
    }
    inherits(IllegalOperationError, Error);
    IllegalOperationError.prototype.name = "IllegalOperationError";
    function stackCapture(reason) {
      var e = new Error();
      return "Stack capture: " + reason + "\n" + trimStack(e.stack, 2);
    }
    module2.exports.IllegalOperationError = IllegalOperationError;
    module2.exports.stackCapture = stackCapture;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/connection.js
var require_connection = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/connection.js"(exports, module2) {
    "use strict";
    var defs = require_defs();
    var constants = defs.constants;
    var frame = require_frame();
    var HEARTBEAT = frame.HEARTBEAT;
    var Mux = require_mux().Mux;
    var Duplex = require("stream").Duplex || require_duplex();
    var EventEmitter = require("events").EventEmitter;
    var Heart = require_heartbeat().Heart;
    var methodName = require_format().methodName;
    var closeMsg = require_format().closeMessage;
    var inspect = require_format().inspect;
    var BitSet = require_bitset().BitSet;
    var inherits = require("util").inherits;
    var fmt = require("util").format;
    var PassThrough = require("stream").PassThrough || require_passthrough();
    var IllegalOperationError = require_error().IllegalOperationError;
    var stackCapture = require_error().stackCapture;
    var DEFAULT_WRITE_HWM = 1024;
    var SINGLE_CHUNK_THRESHOLD = 2048;
    function Connection(underlying) {
      EventEmitter.call(this);
      var stream = this.stream = wrapStream(underlying);
      this.muxer = new Mux(stream);
      this.rest = Buffer.alloc(0);
      this.frameMax = constants.FRAME_MIN_SIZE;
      this.sentSinceLastCheck = false;
      this.recvSinceLastCheck = false;
      this.expectSocketClose = false;
      this.freeChannels = new BitSet();
      this.channels = [{
        channel: { accept: channel0(this) },
        buffer: underlying
      }];
    }
    inherits(Connection, EventEmitter);
    var C = Connection.prototype;
    function mainAccept(frame2) {
      var rec = this.channels[frame2.channel];
      if (rec) {
        return rec.channel.accept(frame2);
      } else
        this.closeWithError(
          fmt("Frame on unknown channel %d", frame2.channel),
          constants.CHANNEL_ERROR,
          new Error(fmt(
            "Frame on unknown channel: %s",
            inspect(frame2, false)
          ))
        );
    }
    function channel0(connection) {
      return function(f) {
        if (f === HEARTBEAT)
          ;
        else if (f.id === defs.ConnectionClose) {
          connection.sendMethod(0, defs.ConnectionCloseOk, {});
          var emsg = fmt("Connection closed: %s", closeMsg(f));
          var s = stackCapture(emsg);
          var e = new Error(emsg);
          e.code = f.fields.replyCode;
          if (isFatalError(e)) {
            connection.emit("error", e);
          }
          connection.toClosed(s, e);
        } else if (f.id === defs.ConnectionBlocked) {
          connection.emit("blocked", f.fields.reason);
        } else if (f.id === defs.ConnectionUnblocked) {
          connection.emit("unblocked");
        } else {
          connection.closeWithError(
            fmt("Unexpected frame on channel 0"),
            constants.UNEXPECTED_FRAME,
            new Error(fmt(
              "Unexpected frame on channel 0: %s",
              inspect(f, false)
            ))
          );
        }
      };
    }
    C.sendProtocolHeader = function() {
      this.sendBytes(frame.PROTOCOL_HEADER);
    };
    C.open = function(allFields, openCallback0) {
      var self2 = this;
      var openCallback = openCallback0 || function() {
      };
      var tunedOptions = Object.create(allFields);
      function wait(k) {
        self2.step(function(err, frame2) {
          if (err !== null)
            bail(err);
          else if (frame2.channel !== 0) {
            bail(new Error(
              fmt(
                "Frame on channel != 0 during handshake: %s",
                inspect(frame2, false)
              )
            ));
          } else
            k(frame2);
        });
      }
      function expect(Method, k) {
        wait(function(frame2) {
          if (frame2.id === Method)
            k(frame2);
          else {
            bail(new Error(
              fmt(
                "Expected %s; got %s",
                methodName(Method),
                inspect(frame2, false)
              )
            ));
          }
        });
      }
      function bail(err) {
        openCallback(err);
      }
      function send(Method) {
        self2.sendMethod(0, Method, tunedOptions);
      }
      function negotiate(server, desired) {
        if (server === 0 || desired === 0) {
          return Math.max(server, desired);
        } else {
          return Math.min(server, desired);
        }
      }
      function onStart(start) {
        var mechanisms = start.fields.mechanisms.toString().split(" ");
        if (mechanisms.indexOf(allFields.mechanism) < 0) {
          bail(new Error(fmt(
            "SASL mechanism %s is not provided by the server",
            allFields.mechanism
          )));
          return;
        }
        self2.serverProperties = start.fields.serverProperties;
        try {
          send(defs.ConnectionStartOk);
        } catch (err) {
          bail(err);
          return;
        }
        wait(afterStartOk);
      }
      function afterStartOk(reply) {
        switch (reply.id) {
          case defs.ConnectionSecure:
            bail(new Error(
              "Wasn't expecting to have to go through secure"
            ));
            break;
          case defs.ConnectionClose:
            bail(new Error(fmt(
              "Handshake terminated by server: %s",
              closeMsg(reply)
            )));
            break;
          case defs.ConnectionTune:
            var fields = reply.fields;
            tunedOptions.frameMax = negotiate(fields.frameMax, allFields.frameMax);
            tunedOptions.channelMax = negotiate(fields.channelMax, allFields.channelMax);
            tunedOptions.heartbeat = negotiate(fields.heartbeat, allFields.heartbeat);
            try {
              send(defs.ConnectionTuneOk);
              send(defs.ConnectionOpen);
            } catch (err) {
              bail(err);
              return;
            }
            expect(defs.ConnectionOpenOk, onOpenOk);
            break;
          default:
            bail(new Error(
              fmt(
                "Expected connection.secure, connection.close, or connection.tune during handshake; got %s",
                inspect(reply, false)
              )
            ));
            break;
        }
      }
      function onOpenOk(openOk) {
        self2.channelMax = tunedOptions.channelMax || 65535;
        self2.frameMax = tunedOptions.frameMax || 4294967295;
        self2.heartbeat = tunedOptions.heartbeat;
        self2.heartbeater = self2.startHeartbeater();
        self2.accept = mainAccept;
        succeed(openOk);
      }
      function endWhileOpening(err) {
        bail(err || new Error("Socket closed abruptly during opening handshake"));
      }
      this.stream.on("end", endWhileOpening);
      this.stream.on("error", endWhileOpening);
      function succeed(ok) {
        self2.stream.removeListener("end", endWhileOpening);
        self2.stream.removeListener("error", endWhileOpening);
        self2.stream.on("error", self2.onSocketError.bind(self2));
        self2.stream.on("end", self2.onSocketError.bind(
          self2,
          new Error("Unexpected close")
        ));
        self2.on("frameError", self2.onSocketError.bind(self2));
        self2.acceptLoop();
        openCallback(null, ok);
      }
      this.sendProtocolHeader();
      expect(defs.ConnectionStart, onStart);
    };
    C.close = function(closeCallback) {
      var k = closeCallback && function() {
        closeCallback(null);
      };
      this.closeBecause("Cheers, thanks", constants.REPLY_SUCCESS, k);
    };
    C.closeBecause = function(reason, code, k) {
      this.sendMethod(0, defs.ConnectionClose, {
        replyText: reason,
        replyCode: code,
        methodId: 0,
        classId: 0
      });
      var s = stackCapture("closeBecause called: " + reason);
      this.toClosing(s, k);
    };
    C.closeWithError = function(reason, code, error) {
      this.emit("error", error);
      this.closeBecause(reason, code);
    };
    C.onSocketError = function(err) {
      if (!this.expectSocketClose) {
        this.expectSocketClose = true;
        this.emit("error", err);
        var s = stackCapture("Socket error");
        this.toClosed(s, err);
      }
    };
    function invalidOp(msg, stack) {
      return function() {
        throw new IllegalOperationError(msg, stack);
      };
    }
    function invalidateSend(conn, msg, stack) {
      conn.sendMethod = conn.sendContent = conn.sendMessage = invalidOp(msg, stack);
    }
    C.toClosing = function(capturedStack, k) {
      var send = this.sendMethod.bind(this);
      this.accept = function(f) {
        if (f.id === defs.ConnectionCloseOk) {
          if (k)
            k();
          var s = stackCapture("ConnectionCloseOk received");
          this.toClosed(s, void 0);
        } else if (f.id === defs.ConnectionClose) {
          send(0, defs.ConnectionCloseOk, {});
        }
      };
      invalidateSend(this, "Connection closing", capturedStack);
    };
    C._closeChannels = function(capturedStack) {
      for (var i = 1; i < this.channels.length; i++) {
        var ch = this.channels[i];
        if (ch !== null) {
          ch.channel.toClosed(capturedStack);
        }
      }
    };
    C.toClosed = function(capturedStack, maybeErr) {
      this._closeChannels(capturedStack);
      var info = fmt(
        "Connection closed (%s)",
        maybeErr ? maybeErr.toString() : "by client"
      );
      invalidateSend(this, info, capturedStack);
      this.accept = invalidOp(info, capturedStack);
      this.close = function(cb) {
        cb && cb(new IllegalOperationError(info, capturedStack));
      };
      if (this.heartbeater)
        this.heartbeater.clear();
      this.expectSocketClose = true;
      this.stream.end();
      this.emit("close", maybeErr);
    };
    C.startHeartbeater = function() {
      if (this.heartbeat === 0)
        return null;
      else {
        var self2 = this;
        var hb = new Heart(
          this.heartbeat,
          this.checkSend.bind(this),
          this.checkRecv.bind(this)
        );
        hb.on("timeout", function() {
          var hberr = new Error("Heartbeat timeout");
          self2.emit("error", hberr);
          var s = stackCapture("Heartbeat timeout");
          self2.toClosed(s, hberr);
        });
        hb.on("beat", function() {
          self2.sendHeartbeat();
        });
        return hb;
      }
    };
    C.freshChannel = function(channel, options) {
      var next = this.freeChannels.nextClearBit(1);
      if (next < 0 || next > this.channelMax)
        throw new Error("No channels left to allocate");
      this.freeChannels.set(next);
      var hwm = options && options.highWaterMark || DEFAULT_WRITE_HWM;
      var writeBuffer = new PassThrough({
        objectMode: true,
        highWaterMark: hwm
      });
      this.channels[next] = { channel, buffer: writeBuffer };
      writeBuffer.on("drain", function() {
        channel.onBufferDrain();
      });
      this.muxer.pipeFrom(writeBuffer);
      return next;
    };
    C.releaseChannel = function(channel) {
      this.freeChannels.clear(channel);
      var buffer = this.channels[channel].buffer;
      buffer.end();
      this.channels[channel] = null;
    };
    C.acceptLoop = function() {
      var self2 = this;
      function go() {
        try {
          var f;
          while (f = self2.recvFrame())
            self2.accept(f);
        } catch (e) {
          self2.emit("frameError", e);
        }
      }
      self2.stream.on("readable", go);
      go();
    };
    C.step = function(cb) {
      var self2 = this;
      function recv() {
        var f;
        try {
          f = self2.recvFrame();
        } catch (e) {
          cb(e, null);
          return;
        }
        if (f)
          cb(null, f);
        else
          self2.stream.once("readable", recv);
      }
      recv();
    };
    C.checkSend = function() {
      var check = this.sentSinceLastCheck;
      this.sentSinceLastCheck = false;
      return check;
    };
    C.checkRecv = function() {
      var check = this.recvSinceLastCheck;
      this.recvSinceLastCheck = false;
      return check;
    };
    C.sendBytes = function(bytes) {
      this.sentSinceLastCheck = true;
      this.stream.write(bytes);
    };
    C.sendHeartbeat = function() {
      return this.sendBytes(frame.HEARTBEAT_BUF);
    };
    var encodeMethod = defs.encodeMethod;
    var encodeProperties = defs.encodeProperties;
    C.sendMethod = function(channel, Method, fields) {
      var frame2 = encodeMethod(Method, channel, fields);
      this.sentSinceLastCheck = true;
      var buffer = this.channels[channel].buffer;
      return buffer.write(frame2);
    };
    C.sendMessage = function(channel, Method, fields, Properties, props, content) {
      if (!Buffer.isBuffer(content))
        throw new TypeError("content is not a buffer");
      var mframe = encodeMethod(Method, channel, fields);
      var pframe = encodeProperties(
        Properties,
        channel,
        content.length,
        props
      );
      var buffer = this.channels[channel].buffer;
      this.sentSinceLastCheck = true;
      var methodHeaderLen = mframe.length + pframe.length;
      var bodyLen = content.length > 0 ? content.length + FRAME_OVERHEAD : 0;
      var allLen = methodHeaderLen + bodyLen;
      if (allLen < SINGLE_CHUNK_THRESHOLD) {
        var all = Buffer.allocUnsafe(allLen);
        var offset = mframe.copy(all, 0);
        offset += pframe.copy(all, offset);
        if (bodyLen > 0)
          makeBodyFrame(channel, content).copy(all, offset);
        return buffer.write(all);
      } else {
        if (methodHeaderLen < SINGLE_CHUNK_THRESHOLD) {
          var both = Buffer.allocUnsafe(methodHeaderLen);
          var offset = mframe.copy(both, 0);
          pframe.copy(both, offset);
          buffer.write(both);
        } else {
          buffer.write(mframe);
          buffer.write(pframe);
        }
        return this.sendContent(channel, content);
      }
    };
    var FRAME_OVERHEAD = defs.FRAME_OVERHEAD;
    var makeBodyFrame = frame.makeBodyFrame;
    C.sendContent = function(channel, body) {
      if (!Buffer.isBuffer(body)) {
        throw new TypeError(fmt("Expected buffer; got %s", body));
      }
      var writeResult = true;
      var buffer = this.channels[channel].buffer;
      var maxBody = this.frameMax - FRAME_OVERHEAD;
      for (var offset = 0; offset < body.length; offset += maxBody) {
        var end = offset + maxBody;
        var slice = end > body.length ? body.slice(offset) : body.slice(offset, end);
        var bodyFrame = makeBodyFrame(channel, slice);
        writeResult = buffer.write(bodyFrame);
      }
      this.sentSinceLastCheck = true;
      return writeResult;
    };
    var parseFrame = frame.parseFrame;
    var decodeFrame = frame.decodeFrame;
    C.recvFrame = function() {
      var frame2 = parseFrame(this.rest, this.frameMax);
      if (!frame2) {
        var incoming = this.stream.read();
        if (incoming === null) {
          return false;
        } else {
          this.recvSinceLastCheck = true;
          this.rest = Buffer.concat([this.rest, incoming]);
          return this.recvFrame();
        }
      } else {
        this.rest = frame2.rest;
        return decodeFrame(frame2);
      }
    };
    function wrapStream(s) {
      if (s instanceof Duplex)
        return s;
      else {
        var ws = new Duplex();
        ws.wrap(s);
        ws._write = function(chunk, encoding, callback) {
          return s.write(chunk, encoding, callback);
        };
        return ws;
      }
    }
    function isFatalError(error) {
      switch (error && error.code) {
        case defs.constants.CONNECTION_FORCED:
        case defs.constants.REPLY_SUCCESS:
          return false;
        default:
          return true;
      }
    }
    module2.exports.Connection = Connection;
    module2.exports.isFatalError = isFatalError;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/credentials.js
var require_credentials = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/credentials.js"(exports, module2) {
    var codec = require_codec();
    module2.exports.plain = function(user, passwd) {
      return {
        mechanism: "PLAIN",
        response: function() {
          return Buffer.from(["", user, passwd].join(String.fromCharCode(0)));
        },
        username: user,
        password: passwd
      };
    };
    module2.exports.amqplain = function(user, passwd) {
      return {
        mechanism: "AMQPLAIN",
        response: function() {
          const buffer = Buffer.alloc(16384);
          const size = codec.encodeTable(buffer, { LOGIN: user, PASSWORD: passwd }, 0);
          return buffer.slice(4, size);
        },
        username: user,
        password: passwd
      };
    };
    module2.exports.external = function() {
      return {
        mechanism: "EXTERNAL",
        response: function() {
          return Buffer.from("");
        }
      };
    };
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/package.json"(exports, module2) {
    module2.exports = {
      name: "amqplib",
      homepage: "http://amqp-node.github.io/amqplib/",
      main: "./channel_api.js",
      version: "0.10.3",
      description: "An AMQP 0-9-1 (e.g., RabbitMQ) library and client.",
      repository: {
        type: "git",
        url: "https://github.com/amqp-node/amqplib.git"
      },
      engines: {
        node: ">=10"
      },
      dependencies: {
        "@acuminous/bitsyntax": "^0.1.2",
        "buffer-more-ints": "~1.0.0",
        "readable-stream": "1.x >=1.1.9",
        "url-parse": "~1.5.10"
      },
      devDependencies: {
        claire: "0.4.1",
        mocha: "^9.2.2",
        nyc: "^15.1.0",
        "uglify-js": "2.8.x"
      },
      scripts: {
        test: "make test",
        prepare: "make"
      },
      keywords: [
        "AMQP",
        "AMQP 0-9-1",
        "RabbitMQ"
      ],
      author: "Michael Bridgen <mikeb@squaremobius.net>",
      license: "MIT"
    };
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/connect.js
var require_connect = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/connect.js"(exports, module2) {
    "use strict";
    var URL3 = require_url_parse();
    var QS = require("querystring");
    var Connection = require_connection().Connection;
    var fmt = require("util").format;
    var credentials = require_credentials();
    function copyInto(obj, target) {
      var keys = Object.keys(obj);
      var i = keys.length;
      while (i--) {
        var k = keys[i];
        target[k] = obj[k];
      }
      return target;
    }
    function clone(obj) {
      return copyInto(obj, {});
    }
    var CLIENT_PROPERTIES = {
      "product": "amqplib",
      "version": require_package().version,
      "platform": fmt("Node.JS %s", process.version),
      "information": "http://squaremo.github.io/amqp.node",
      "capabilities": {
        "publisher_confirms": true,
        "exchange_exchange_bindings": true,
        "basic.nack": true,
        "consumer_cancel_notify": true,
        "connection.blocked": true,
        "authentication_failure_close": true
      }
    };
    function openFrames(vhost, query, credentials2, extraClientProperties) {
      if (!vhost)
        vhost = "/";
      else
        vhost = QS.unescape(vhost);
      var query = query || {};
      function intOrDefault(val, def) {
        return val === void 0 ? def : parseInt(val);
      }
      var clientProperties = Object.create(CLIENT_PROPERTIES);
      return {
        // start-ok
        "clientProperties": copyInto(extraClientProperties, clientProperties),
        "mechanism": credentials2.mechanism,
        "response": credentials2.response(),
        "locale": query.locale || "en_US",
        // tune-ok
        "channelMax": intOrDefault(query.channelMax, 0),
        "frameMax": intOrDefault(query.frameMax, 4096),
        "heartbeat": intOrDefault(query.heartbeat, 0),
        // open
        "virtualHost": vhost,
        "capabilities": "",
        "insist": 0
      };
    }
    function credentialsFromUrl(parts) {
      var user = "guest", passwd = "guest";
      if (parts.username != "" || parts.password != "") {
        user = parts.username ? unescape(parts.username) : "";
        passwd = parts.password ? unescape(parts.password) : "";
      }
      return credentials.plain(user, passwd);
    }
    function connect(url, socketOptions, openCallback) {
      var sockopts = clone(socketOptions || {});
      url = url || "amqp://localhost";
      var noDelay = !!sockopts.noDelay;
      var timeout = sockopts.timeout;
      var keepAlive = !!sockopts.keepAlive;
      var keepAliveDelay = sockopts.keepAliveDelay || 0;
      var extraClientProperties = sockopts.clientProperties || {};
      var protocol, fields;
      if (typeof url === "object") {
        protocol = (url.protocol || "amqp") + ":";
        sockopts.host = url.hostname;
        sockopts.servername = sockopts.servername || url.hostname;
        sockopts.port = url.port || (protocol === "amqp:" ? 5672 : 5671);
        var user, pass;
        if (url.username == void 0 && url.password == void 0) {
          user = "guest";
          pass = "guest";
        } else {
          user = url.username || "";
          pass = url.password || "";
        }
        var config = {
          locale: url.locale,
          channelMax: url.channelMax,
          frameMax: url.frameMax,
          heartbeat: url.heartbeat
        };
        fields = openFrames(url.vhost, config, sockopts.credentials || credentials.plain(user, pass), extraClientProperties);
      } else {
        var parts = URL3(url, true);
        protocol = parts.protocol;
        sockopts.host = parts.hostname;
        sockopts.servername = sockopts.servername || parts.hostname;
        sockopts.port = parseInt(parts.port) || (protocol === "amqp:" ? 5672 : 5671);
        var vhost = parts.pathname ? parts.pathname.substr(1) : null;
        fields = openFrames(vhost, parts.query, sockopts.credentials || credentialsFromUrl(parts), extraClientProperties);
      }
      var sockok = false;
      var sock;
      function onConnect() {
        sockok = true;
        sock.setNoDelay(noDelay);
        if (keepAlive)
          sock.setKeepAlive(keepAlive, keepAliveDelay);
        var c = new Connection(sock);
        c.open(fields, function(err, ok) {
          if (timeout)
            sock.setTimeout(0);
          if (err === null) {
            openCallback(null, c);
          } else {
            sock.end();
            sock.destroy();
            openCallback(err);
          }
        });
      }
      if (protocol === "amqp:") {
        sock = require("net").connect(sockopts, onConnect);
      } else if (protocol === "amqps:") {
        sock = require("tls").connect(sockopts, onConnect);
      } else {
        throw new Error("Expected amqp: or amqps: as the protocol; got " + protocol);
      }
      if (timeout) {
        sock.setTimeout(timeout, function() {
          sock.end();
          sock.destroy();
          openCallback(new Error("connect ETIMEDOUT"));
        });
      }
      sock.once("error", function(err) {
        if (!sockok)
          openCallback(err);
      });
    }
    module2.exports.connect = connect;
    module2.exports.credentialsFromUrl = credentialsFromUrl;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/channel.js
var require_channel = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/channel.js"(exports, module2) {
    "use strict";
    var defs = require_defs();
    var closeMsg = require_format().closeMessage;
    var inspect = require_format().inspect;
    var methodName = require_format().methodName;
    var assert = require("assert");
    var inherits = require("util").inherits;
    var EventEmitter = require("events").EventEmitter;
    var fmt = require("util").format;
    var IllegalOperationError = require_error().IllegalOperationError;
    var stackCapture = require_error().stackCapture;
    function Channel(connection) {
      EventEmitter.call(this);
      this.connection = connection;
      this.reply = null;
      this.pending = [];
      this.lwm = 1;
      this.unconfirmed = [];
      this.on("ack", this.handleConfirm.bind(this, function(cb) {
        if (cb)
          cb(null);
      }));
      this.on("nack", this.handleConfirm.bind(this, function(cb) {
        if (cb)
          cb(new Error("message nacked"));
      }));
      this.on("close", function() {
        var cb;
        while (cb = this.unconfirmed.shift()) {
          if (cb)
            cb(new Error("channel closed"));
        }
      });
      this.handleMessage = acceptDeliveryOrReturn;
    }
    inherits(Channel, EventEmitter);
    module2.exports.Channel = Channel;
    module2.exports.acceptMessage = acceptMessage;
    var C = Channel.prototype;
    C.allocate = function() {
      this.ch = this.connection.freshChannel(this);
      return this;
    };
    C.sendImmediately = function(method, fields) {
      return this.connection.sendMethod(this.ch, method, fields);
    };
    C.sendOrEnqueue = function(method, fields, reply) {
      if (!this.reply) {
        assert(this.pending.length === 0);
        this.reply = reply;
        this.sendImmediately(method, fields);
      } else {
        this.pending.push({
          method,
          fields,
          reply
        });
      }
    };
    C.sendMessage = function(fields, properties, content) {
      return this.connection.sendMessage(
        this.ch,
        defs.BasicPublish,
        fields,
        defs.BasicProperties,
        properties,
        content
      );
    };
    C._rpc = function(method, fields, expect, cb) {
      var self2 = this;
      function reply(err, f) {
        if (err === null) {
          if (f.id === expect) {
            return cb(null, f);
          } else {
            var expectedName = methodName(expect);
            var e = new Error(fmt(
              "Expected %s; got %s",
              expectedName,
              inspect(f, false)
            ));
            self2.closeWithError(
              f.id,
              fmt(
                "Expected %s; got %s",
                expectedName,
                methodName(f.id)
              ),
              defs.constants.UNEXPECTED_FRAME,
              e
            );
            return cb(e);
          }
        } else if (err instanceof Error)
          return cb(err);
        else {
          var closeReason = (err.fields.classId << 16) + err.fields.methodId;
          var e = method === closeReason ? fmt(
            "Operation failed: %s; %s",
            methodName(method),
            closeMsg(err)
          ) : fmt("Channel closed by server: %s", closeMsg(err));
          var closeFrameError = new Error(e);
          closeFrameError.code = err.fields.replyCode;
          closeFrameError.classId = err.fields.classId;
          closeFrameError.methodId = err.fields.methodId;
          return cb(closeFrameError);
        }
      }
      this.sendOrEnqueue(method, fields, reply);
    };
    function invalidOp(msg, stack) {
      return function() {
        throw new IllegalOperationError(msg, stack);
      };
    }
    function invalidateSend(ch, msg, stack) {
      ch.sendImmediately = ch.sendOrEnqueue = ch.sendMessage = invalidOp(msg, stack);
    }
    C.toClosed = function(capturedStack) {
      this._rejectPending();
      invalidateSend(this, "Channel closed", capturedStack);
      this.accept = invalidOp("Channel closed", capturedStack);
      this.connection.releaseChannel(this.ch);
      this.emit("close");
    };
    C.toClosing = function(capturedStack, k) {
      var send = this.sendImmediately.bind(this);
      invalidateSend(this, "Channel closing", capturedStack);
      this.accept = function(f) {
        if (f.id === defs.ChannelCloseOk) {
          if (k)
            k();
          var s = stackCapture("ChannelCloseOk frame received");
          this.toClosed(s);
        } else if (f.id === defs.ChannelClose) {
          send(defs.ChannelCloseOk, {});
        }
      };
    };
    C._rejectPending = function() {
      function rej(r) {
        r(new Error("Channel ended, no reply will be forthcoming"));
      }
      if (this.reply !== null)
        rej(this.reply);
      this.reply = null;
      var discard;
      while (discard = this.pending.shift())
        rej(discard.reply);
      this.pending = null;
    };
    C.closeBecause = function(reason, code, k) {
      this.sendImmediately(defs.ChannelClose, {
        replyText: reason,
        replyCode: code,
        methodId: 0,
        classId: 0
      });
      var s = stackCapture("closeBecause called: " + reason);
      this.toClosing(s, k);
    };
    C.closeWithError = function(id, reason, code, error) {
      var self2 = this;
      this.closeBecause(reason, code, function() {
        error.code = code;
        if (id) {
          error.classId = defs.info(id).classId;
          error.methodId = defs.info(id).methodId;
        }
        self2.emit("error", error);
      });
    };
    C.acceptMessageFrame = function(f) {
      try {
        this.handleMessage = this.handleMessage(f);
      } catch (msg) {
        if (typeof msg === "string") {
          this.closeWithError(
            f.id,
            msg,
            defs.constants.UNEXPECTED_FRAME,
            new Error(msg)
          );
        } else if (msg instanceof Error) {
          this.closeWithError(
            f.id,
            "Error while processing message",
            defs.constants.INTERNAL_ERROR,
            msg
          );
        } else {
          this.closeWithError(
            f.id,
            "Internal error while processing message",
            defs.constants.INTERNAL_ERROR,
            new Error(msg.toString())
          );
        }
      }
    };
    function acceptDeliveryOrReturn(f) {
      var event;
      if (f.id === defs.BasicDeliver)
        event = "delivery";
      else if (f.id === defs.BasicReturn)
        event = "return";
      else
        throw fmt(
          "Expected BasicDeliver or BasicReturn; got %s",
          inspect(f)
        );
      var self2 = this;
      var fields = f.fields;
      return acceptMessage(function(message) {
        message.fields = fields;
        self2.emit(event, message);
      });
    }
    function acceptMessage(continuation) {
      var totalSize = 0, remaining = 0;
      var buffers = null;
      var message = {
        fields: null,
        properties: null,
        content: null
      };
      return headers;
      function headers(f) {
        if (f.id === defs.BasicProperties) {
          message.properties = f.fields;
          totalSize = remaining = f.size;
          if (totalSize === 0) {
            message.content = Buffer.alloc(0);
            continuation(message);
            return acceptDeliveryOrReturn;
          } else {
            return content;
          }
        } else {
          throw "Expected headers frame after delivery";
        }
      }
      function content(f) {
        if (f.content) {
          var size = f.content.length;
          remaining -= size;
          if (remaining === 0) {
            if (buffers !== null) {
              buffers.push(f.content);
              message.content = Buffer.concat(buffers);
            } else {
              message.content = f.content;
            }
            continuation(message);
            return acceptDeliveryOrReturn;
          } else if (remaining < 0) {
            throw fmt(
              "Too much content sent! Expected %d bytes",
              totalSize
            );
          } else {
            if (buffers !== null)
              buffers.push(f.content);
            else
              buffers = [f.content];
            return content;
          }
        } else
          throw "Expected content frame after headers";
      }
    }
    C.handleConfirm = function(handle, f) {
      var tag = f.deliveryTag;
      var multi = f.multiple;
      if (multi) {
        var confirmed = this.unconfirmed.splice(0, tag - this.lwm + 1);
        this.lwm = tag + 1;
        confirmed.forEach(handle);
      } else {
        var c;
        if (tag === this.lwm) {
          c = this.unconfirmed.shift();
          this.lwm++;
          while (this.unconfirmed[0] === null) {
            this.unconfirmed.shift();
            this.lwm++;
          }
        } else {
          c = this.unconfirmed[tag - this.lwm];
          this.unconfirmed[tag - this.lwm] = null;
        }
        handle(c);
      }
    };
    C.pushConfirmCallback = function(cb) {
      this.unconfirmed.push(cb || false);
    };
    C.accept = function(f) {
      switch (f.id) {
        case void 0:
        case defs.BasicDeliver:
        case defs.BasicReturn:
        case defs.BasicProperties:
          return this.acceptMessageFrame(f);
        case defs.BasicAck:
          return this.emit("ack", f.fields);
        case defs.BasicNack:
          return this.emit("nack", f.fields);
        case defs.BasicCancel:
          return this.emit("cancel", f.fields);
        case defs.ChannelClose:
          if (this.reply) {
            var reply = this.reply;
            this.reply = null;
            reply(f);
          }
          var emsg = "Channel closed by server: " + closeMsg(f);
          this.sendImmediately(defs.ChannelCloseOk, {});
          var error = new Error(emsg);
          error.code = f.fields.replyCode;
          error.classId = f.fields.classId;
          error.methodId = f.fields.methodId;
          this.emit("error", error);
          var s = stackCapture(emsg);
          this.toClosed(s);
          return;
        case defs.BasicFlow:
          return this.closeWithError(
            f.id,
            "Flow not implemented",
            defs.constants.NOT_IMPLEMENTED,
            new Error("Flow not implemented")
          );
        default:
          var reply = this.reply;
          this.reply = null;
          if (this.pending.length > 0) {
            var send = this.pending.shift();
            this.reply = send.reply;
            this.sendImmediately(send.method, send.fields);
          }
          return reply(null, f);
      }
    };
    C.onBufferDrain = function() {
      this.emit("drain");
    };
    function BaseChannel(connection) {
      Channel.call(this, connection);
      this.consumers = /* @__PURE__ */ new Map();
    }
    inherits(BaseChannel, Channel);
    module2.exports.BaseChannel = BaseChannel;
    BaseChannel.prototype.registerConsumer = function(tag, callback) {
      this.consumers.set(tag, callback);
    };
    BaseChannel.prototype.unregisterConsumer = function(tag) {
      this.consumers.delete(tag);
    };
    BaseChannel.prototype.dispatchMessage = function(fields, message) {
      var consumerTag = fields.consumerTag;
      var consumer = this.consumers.get(consumerTag);
      if (consumer) {
        return consumer(message);
      } else {
        throw new Error("Unknown consumer: " + consumerTag);
      }
    };
    BaseChannel.prototype.handleDelivery = function(message) {
      return this.dispatchMessage(message.fields, message);
    };
    BaseChannel.prototype.handleCancel = function(fields) {
      var result = this.dispatchMessage(fields, null);
      this.unregisterConsumer(fields.consumerTag);
      return result;
    };
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/api_args.js
var require_api_args = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/api_args.js"(exports, module2) {
    "use strict";
    function setIfDefined(obj, prop, value) {
      if (value != void 0)
        obj[prop] = value;
    }
    var EMPTY_OPTIONS = Object.freeze({});
    var Args = {};
    Args.assertQueue = function(queue, options) {
      queue = queue || "";
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "x-expires", options.expires);
      setIfDefined(argt, "x-message-ttl", options.messageTtl);
      setIfDefined(
        argt,
        "x-dead-letter-exchange",
        options.deadLetterExchange
      );
      setIfDefined(
        argt,
        "x-dead-letter-routing-key",
        options.deadLetterRoutingKey
      );
      setIfDefined(argt, "x-max-length", options.maxLength);
      setIfDefined(argt, "x-max-priority", options.maxPriority);
      setIfDefined(argt, "x-overflow", options.overflow);
      setIfDefined(argt, "x-queue-mode", options.queueMode);
      return {
        queue,
        exclusive: !!options.exclusive,
        durable: options.durable === void 0 ? true : options.durable,
        autoDelete: !!options.autoDelete,
        arguments: argt,
        passive: false,
        // deprecated but we have to include it
        ticket: 0,
        nowait: false
      };
    };
    Args.checkQueue = function(queue) {
      return {
        queue,
        passive: true,
        // switch to "completely different" mode
        nowait: false,
        durable: true,
        autoDelete: false,
        exclusive: false,
        // ignored
        ticket: 0
      };
    };
    Args.deleteQueue = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      return {
        queue,
        ifUnused: !!options.ifUnused,
        ifEmpty: !!options.ifEmpty,
        ticket: 0,
        nowait: false
      };
    };
    Args.purgeQueue = function(queue) {
      return {
        queue,
        ticket: 0,
        nowait: false
      };
    };
    Args.bindQueue = function(queue, source, pattern, argt) {
      return {
        queue,
        exchange: source,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.unbindQueue = function(queue, source, pattern, argt) {
      return {
        queue,
        exchange: source,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.assertExchange = function(exchange, type, options) {
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "alternate-exchange", options.alternateExchange);
      return {
        exchange,
        ticket: 0,
        type,
        passive: false,
        durable: options.durable === void 0 ? true : options.durable,
        autoDelete: !!options.autoDelete,
        internal: !!options.internal,
        nowait: false,
        arguments: argt
      };
    };
    Args.checkExchange = function(exchange) {
      return {
        exchange,
        passive: true,
        // switch to 'may as well be another method' mode
        nowait: false,
        // ff are ignored
        durable: true,
        internal: false,
        type: "",
        autoDelete: false,
        ticket: 0
      };
    };
    Args.deleteExchange = function(exchange, options) {
      options = options || EMPTY_OPTIONS;
      return {
        exchange,
        ifUnused: !!options.ifUnused,
        ticket: 0,
        nowait: false
      };
    };
    Args.bindExchange = function(dest, source, pattern, argt) {
      return {
        source,
        destination: dest,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.unbindExchange = function(dest, source, pattern, argt) {
      return {
        source,
        destination: dest,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.publish = function(exchange, routingKey, options) {
      options = options || EMPTY_OPTIONS;
      function convertCC(cc) {
        if (cc === void 0) {
          return void 0;
        } else if (Array.isArray(cc)) {
          return cc.map(String);
        } else
          return [String(cc)];
      }
      var headers = Object.create(options.headers || null);
      setIfDefined(headers, "CC", convertCC(options.CC));
      setIfDefined(headers, "BCC", convertCC(options.BCC));
      var deliveryMode;
      if (options.persistent !== void 0)
        deliveryMode = options.persistent ? 2 : 1;
      else if (typeof options.deliveryMode === "number")
        deliveryMode = options.deliveryMode;
      else if (options.deliveryMode)
        deliveryMode = 2;
      var expiration = options.expiration;
      if (expiration !== void 0)
        expiration = expiration.toString();
      return {
        // method fields
        exchange,
        routingKey,
        mandatory: !!options.mandatory,
        immediate: false,
        // RabbitMQ doesn't implement this any more
        ticket: void 0,
        // properties
        contentType: options.contentType,
        contentEncoding: options.contentEncoding,
        headers,
        deliveryMode,
        priority: options.priority,
        correlationId: options.correlationId,
        replyTo: options.replyTo,
        expiration,
        messageId: options.messageId,
        timestamp: options.timestamp,
        type: options.type,
        userId: options.userId,
        appId: options.appId,
        clusterId: void 0
      };
    };
    Args.consume = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "x-priority", options.priority);
      return {
        ticket: 0,
        queue,
        consumerTag: options.consumerTag || "",
        noLocal: !!options.noLocal,
        noAck: !!options.noAck,
        exclusive: !!options.exclusive,
        nowait: false,
        arguments: argt
      };
    };
    Args.cancel = function(consumerTag) {
      return {
        consumerTag,
        nowait: false
      };
    };
    Args.get = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      return {
        ticket: 0,
        queue,
        noAck: !!options.noAck
      };
    };
    Args.ack = function(tag, allUpTo) {
      return {
        deliveryTag: tag,
        multiple: !!allUpTo
      };
    };
    Args.nack = function(tag, allUpTo, requeue) {
      return {
        deliveryTag: tag,
        multiple: !!allUpTo,
        requeue: requeue === void 0 ? true : requeue
      };
    };
    Args.reject = function(tag, requeue) {
      return {
        deliveryTag: tag,
        requeue: requeue === void 0 ? true : requeue
      };
    };
    Args.prefetch = function(count, global2) {
      return {
        prefetchCount: count || 0,
        prefetchSize: 0,
        global: !!global2
      };
    };
    Args.recover = function() {
      return { requeue: true };
    };
    module2.exports = Object.freeze(Args);
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/channel_model.js
var require_channel_model = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/lib/channel_model.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var promisify = require("util").promisify;
    var defs = require_defs();
    var { BaseChannel } = require_channel();
    var { acceptMessage } = require_channel();
    var Args = require_api_args();
    var { inspect } = require_format();
    var ChannelModel = class extends EventEmitter {
      constructor(connection) {
        super();
        this.connection = connection;
        ["error", "close", "blocked", "unblocked"].forEach((ev) => {
          connection.on(ev, this.emit.bind(this, ev));
        });
      }
      close() {
        return promisify(this.connection.close.bind(this.connection))();
      }
      async createChannel() {
        const channel = new Channel(this.connection);
        await channel.open();
        return channel;
      }
      async createConfirmChannel() {
        const channel = new ConfirmChannel(this.connection);
        await channel.open();
        await channel.rpc(defs.ConfirmSelect, { nowait: false }, defs.ConfirmSelectOk);
        return channel;
      }
    };
    var Channel = class extends BaseChannel {
      constructor(connection) {
        super(connection);
        this.on("delivery", this.handleDelivery.bind(this));
        this.on("cancel", this.handleCancel.bind(this));
      }
      // An RPC that returns a 'proper' promise, which resolves to just the
      // response's fields; this is intended to be suitable for implementing
      // API procedures.
      async rpc(method, fields, expect) {
        const f = await promisify((cb) => {
          return this._rpc(method, fields, expect, cb);
        })();
        return f.fields;
      }
      // Do the remarkably simple channel open handshake
      async open() {
        const ch = await this.allocate.bind(this)();
        return ch.rpc(
          defs.ChannelOpen,
          { outOfBand: "" },
          defs.ChannelOpenOk
        );
      }
      close() {
        return promisify((cb) => {
          return this.closeBecause(
            "Goodbye",
            defs.constants.REPLY_SUCCESS,
            cb
          );
        })();
      }
      // === Public API, declaring queues and stuff ===
      assertQueue(queue, options) {
        return this.rpc(
          defs.QueueDeclare,
          Args.assertQueue(queue, options),
          defs.QueueDeclareOk
        );
      }
      checkQueue(queue) {
        return this.rpc(
          defs.QueueDeclare,
          Args.checkQueue(queue),
          defs.QueueDeclareOk
        );
      }
      deleteQueue(queue, options) {
        return this.rpc(
          defs.QueueDelete,
          Args.deleteQueue(queue, options),
          defs.QueueDeleteOk
        );
      }
      purgeQueue(queue) {
        return this.rpc(
          defs.QueuePurge,
          Args.purgeQueue(queue),
          defs.QueuePurgeOk
        );
      }
      bindQueue(queue, source, pattern, argt) {
        return this.rpc(
          defs.QueueBind,
          Args.bindQueue(queue, source, pattern, argt),
          defs.QueueBindOk
        );
      }
      unbindQueue(queue, source, pattern, argt) {
        return this.rpc(
          defs.QueueUnbind,
          Args.unbindQueue(queue, source, pattern, argt),
          defs.QueueUnbindOk
        );
      }
      assertExchange(exchange, type, options) {
        return this.rpc(
          defs.ExchangeDeclare,
          Args.assertExchange(exchange, type, options),
          defs.ExchangeDeclareOk
        ).then((_ok) => {
          return { exchange };
        });
      }
      checkExchange(exchange) {
        return this.rpc(
          defs.ExchangeDeclare,
          Args.checkExchange(exchange),
          defs.ExchangeDeclareOk
        );
      }
      deleteExchange(name, options) {
        return this.rpc(
          defs.ExchangeDelete,
          Args.deleteExchange(name, options),
          defs.ExchangeDeleteOk
        );
      }
      bindExchange(dest, source, pattern, argt) {
        return this.rpc(
          defs.ExchangeBind,
          Args.bindExchange(dest, source, pattern, argt),
          defs.ExchangeBindOk
        );
      }
      unbindExchange(dest, source, pattern, argt) {
        return this.rpc(
          defs.ExchangeUnbind,
          Args.unbindExchange(dest, source, pattern, argt),
          defs.ExchangeUnbindOk
        );
      }
      // Working with messages
      publish(exchange, routingKey, content, options) {
        const fieldsAndProps = Args.publish(exchange, routingKey, options);
        return this.sendMessage(fieldsAndProps, fieldsAndProps, content);
      }
      sendToQueue(queue, content, options) {
        return this.publish("", queue, content, options);
      }
      consume(queue, callback, options) {
        const fields = Args.consume(queue, options);
        return new Promise((resolve, reject) => {
          this._rpc(defs.BasicConsume, fields, defs.BasicConsumeOk, (err, ok) => {
            if (err)
              return reject(err);
            this.registerConsumer(ok.fields.consumerTag, callback);
            resolve(ok.fields);
          });
        });
      }
      async cancel(consumerTag) {
        const ok = await promisify((cb) => {
          this._rpc(
            defs.BasicCancel,
            Args.cancel(consumerTag),
            defs.BasicCancelOk,
            cb
          );
        })().then((ok2) => {
          this.unregisterConsumer(consumerTag);
          return ok2.fields;
        });
      }
      get(queue, options) {
        const fields = Args.get(queue, options);
        return new Promise((resolve, reject) => {
          this.sendOrEnqueue(defs.BasicGet, fields, (err, f) => {
            if (err)
              return reject(err);
            if (f.id === defs.BasicGetEmpty) {
              return resolve(false);
            } else if (f.id === defs.BasicGetOk) {
              const fields2 = f.fields;
              this.handleMessage = acceptMessage((m) => {
                m.fields = fields2;
                resolve(m);
              });
            } else {
              reject(new Error(`Unexpected response to BasicGet: ${inspect(f)}`));
            }
          });
        });
      }
      ack(message, allUpTo) {
        this.sendImmediately(
          defs.BasicAck,
          Args.ack(message.fields.deliveryTag, allUpTo)
        );
      }
      ackAll() {
        this.sendImmediately(defs.BasicAck, Args.ack(0, true));
      }
      nack(message, allUpTo, requeue) {
        this.sendImmediately(
          defs.BasicNack,
          Args.nack(message.fields.deliveryTag, allUpTo, requeue)
        );
      }
      nackAll(requeue) {
        this.sendImmediately(
          defs.BasicNack,
          Args.nack(0, true, requeue)
        );
      }
      // `Basic.Nack` is not available in older RabbitMQ versions (or in the
      // AMQP specification), so you have to use the one-at-a-time
      // `Basic.Reject`. This is otherwise synonymous with
      // `#nack(message, false, requeue)`.
      reject(message, requeue) {
        this.sendImmediately(
          defs.BasicReject,
          Args.reject(message.fields.deliveryTag, requeue)
        );
      }
      recover() {
        return this.rpc(
          defs.BasicRecover,
          Args.recover(),
          defs.BasicRecoverOk
        );
      }
      qos(count, global2) {
        return this.rpc(
          defs.BasicQos,
          Args.prefetch(count, global2),
          defs.BasicQosOk
        );
      }
    };
    Channel.prototype.prefetch = Channel.prototype.qos;
    var ConfirmChannel = class extends Channel {
      publish(exchange, routingKey, content, options, cb) {
        this.pushConfirmCallback(cb);
        return Channel.prototype.publish.call(this, exchange, routingKey, content, options);
      }
      sendToQueue(queue, content, options, cb) {
        return this.publish("", queue, content, options, cb);
      }
      waitForConfirms() {
        const awaiting = [];
        const unconfirmed = this.unconfirmed;
        unconfirmed.forEach((val, index) => {
          if (val !== null) {
            const confirmed = new Promise((resolve, reject) => {
              unconfirmed[index] = (err) => {
                if (val)
                  val(err);
                if (err === null)
                  resolve();
                else
                  reject(err);
              };
            });
            awaiting.push(confirmed);
          }
        });
        if (!this.pending) {
          var cb;
          while (cb = this.unconfirmed.shift()) {
            if (cb)
              cb(new Error("channel closed"));
          }
        }
        return Promise.all(awaiting);
      }
    };
    module2.exports.ConfirmChannel = ConfirmChannel;
    module2.exports.Channel = Channel;
    module2.exports.ChannelModel = ChannelModel;
  }
});

// node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/channel_api.js
var require_channel_api = __commonJS({
  "node_modules/.pnpm/amqplib@0.10.3/node_modules/amqplib/channel_api.js"(exports, module2) {
    var raw_connect = require_connect().connect;
    var ChannelModel = require_channel_model().ChannelModel;
    var promisify = require("util").promisify;
    function connect(url, connOptions) {
      return promisify(function(cb) {
        return raw_connect(url, connOptions, cb);
      })().then(function(conn) {
        return new ChannelModel(conn);
      });
    }
    module2.exports.connect = connect;
    module2.exports.credentials = require_credentials();
    module2.exports.IllegalOperationError = require_error().IllegalOperationError;
  }
});

// src/index.ts
var core = __toESM(require_core());
var import_amqplib = __toESM(require_channel_api());
console.log("amqp created.");
var RABBITMQ_HOST = core.getInput("rabbitmq_host");
var RABBITMQ_VHOSTNAME = core.getInput("rabbitmq_vhostname");
var RABBITMQ_USERNAME = core.getInput("rabbitmq_username");
var RABBITMQ_PASSWORD = core.getInput("rabbitmq_password");
var RABBITMQ_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}/${RABBITMQ_VHOSTNAME}`;
var APP_ID = core.getInput("app_id");
var MESSAGE = core.getInput("message");
var QUEUE_NAME = core.getInput("queue_name");
function checkMsgIsJSON(msg) {
  try {
    JSON.parse(msg);
  } catch (error) {
    return false;
  }
  return true;
}
async function main() {
  var _a, _b;
  let connection = null;
  let channel = null;
  const msgIsJSON = checkMsgIsJSON(MESSAGE);
  const msg = msgIsJSON ? JSON.parse(MESSAGE) : MESSAGE;
  const contentType = msgIsJSON ? "application/json" : void 0;
  try {
    console.log("amqp connecting...");
    connection = await import_amqplib.default.connect(RABBITMQ_URL);
    console.log("creating channel");
    channel = await connection.createChannel();
    console.log("asserting channel");
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("sending message");
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(msg)), {
      appId: APP_ID,
      contentType
    });
    console.log(" [x] Sent %s", MESSAGE);
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  } finally {
    await ((_a = channel == null ? void 0 : channel.close) == null ? void 0 : _a.call(channel));
    await ((_b = connection == null ? void 0 : connection.close) == null ? void 0 : _b.call(connection));
  }
}
main();
/*! Bundled license information:

amqplib/lib/defs.js:
  (** @preserve This file is generated by the script
   * ../bin/generate-defs.js, which is not in general included in a
   * distribution, but is available in the source repository e.g. at
   * https://github.com/squaremo/amqp.node/
   *)
*/
