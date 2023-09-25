/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9484:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5688);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 8434:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(9484);
const file_command_1 = __nccwpck_require__(9585);
const utils_1 = __nccwpck_require__(5688);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(3032);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(4591);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(4591);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(5266);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 9585:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const uuid_1 = __nccwpck_require__(6529);
const utils_1 = __nccwpck_require__(5688);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 3032:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(5871);
const auth_1 = __nccwpck_require__(9041);
const core_1 = __nccwpck_require__(8434);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 5266:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(1017));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 4591:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(2037);
const fs_1 = __nccwpck_require__(7147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
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
            }
            catch (_a) {
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
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
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
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
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
        this._buffer = '';
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
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
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
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
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
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
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
        const element = this.wrap('details', this.wrap('summary', label) + content);
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
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
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
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
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
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
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
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 5688:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
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
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 9041:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 5871:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(3685));
const https = __importStar(__nccwpck_require__(5687));
const pm = __importStar(__nccwpck_require__(1593));
const tunnel = __importStar(__nccwpck_require__(4798));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
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
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
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
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
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
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
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
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
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
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
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
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
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
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
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
            return new Promise(resolve => setTimeout(() => resolve(), ms));
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
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
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
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1593:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 9922:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports.parse = __nccwpck_require__(1606).parse;
module.exports.match = __nccwpck_require__(3882).match;
module.exports.build = __nccwpck_require__(5735).build;
module.exports.write = __nccwpck_require__(5735).write;

module.exports.matcher = module.exports.compile = __nccwpck_require__(2059).compile;
module.exports.builder = __nccwpck_require__(2059).compile_builder;


/***/ }),

/***/ 2059:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
var __webpack_unused_export__;
// Compile patterns to recognisers and constructors



__nccwpck_require__(7660);
var $ = (__nccwpck_require__(3837).format);

var parse = (__nccwpck_require__(1606).parse);
var interp = __nccwpck_require__(3882),
  parse_int = interp.parse_int,
  parse_float = interp.parse_float;
var construct = __nccwpck_require__(5735),
  write_int = construct.write_int,
  write_float = construct.write_float;

var Buffer = (__nccwpck_require__(4818).Buffer);

var lines = [];
function $start() {
  lines = [];
}
function $line(/* format , args */) {
  lines.push($.apply(null, arguments));
}
function $result() {
  return lines.join('\n');
}

function bits_expr(segment) {
  if (typeof segment.size === 'string') {
    return $('%s * %d', var_name(segment.size), segment.unit);
  }
  else {
    return (segment.size * segment.unit).toString();
  }
}

function get_number(segment) {
  $line('bits = %s;\n', bits_expr(segment));
  var parser = (segment.type === 'integer') ?
    'parse_int' : 'parse_float';
  var be = segment.bigendian, sg = segment.signed;
  $line("byteoffset = offset / 8; offset += bits");
  $line("if (offset > binsize) { return false; }");
  $line("else { result = %s(bin, byteoffset, bits / 8, %s, %s); }",
        parser, be, sg);
}

function get_binary(segment) {
  $line("byteoffset = offset / 8;");
  if (segment.size === true) {
    $line("offset = binsize;");
    $line("result = bin.slice(byteoffset);");
  }
  else {
    $line("bits = %s;", bits_expr(segment));
    $line("offset += bits;");
    $line("if (offset > binsize) { return false; }");
    $line("else { result = bin.slice(byteoffset,",
          "byteoffset + bits / 8); }");
  }
}

function get_string(segment) {
  $line("byteoffset = offset / 8;");
  var strlen = segment.value.length;
  var strlenbits = strlen * 8;
  $line("offset += %d;", strlenbits);
  $line("if (offset > binsize) { return false; }");
  $line("else { result = bin.toString(byteoffset,",
        $("byteoffset + %d); }", strlen));
}

function skip_bits(segment) {
  if (typeof segment.size === 'string') {
    // Damn. Have to look up the size.
    $line("var skipbits = %s * %d;",
          var_name(segment.size), segment.unit);
    $line("if (offset + skipbits > binsize) { return false; }");
    $line("else { offset += skipbits; }");
  }
  else if (segment.size === true) {
    $line("if (offset % 8 === 0) { offset = binsize; }");
    $line("else { return false; }");
  }
  else {
    var bits = segment.unit * segment.size;
    $line("if (offset + %d > binsize) { return false; }", bits);
    $line("else { offset += %d; }", bits);
  }
}

function match_seg(segment) {
  if (segment.name === '_') {
    skip_bits(segment);
  }
  else {
    var assign_result;
    switch (segment.type) {
    case 'integer':
    case 'float':
      get_number(segment);
      break;
    case 'binary':
      get_binary(segment);
      break;
    case 'string':
      get_string(segment);
      break;
    }
    $line("if (result === false) return false;");
    if (segment.name) {
      // variable is given a value in the environment
      $line("else if (%s !== undefined) {", var_name(segment.name));
      // .. and it is not the same as that matched
      $line("if (%s != result) return false;",
            var_name(segment.name));
      $line("}");
      // variable is free
      $line('else %s = result;', var_name(segment.name));
    }
    else {
      var repr = JSON.stringify(segment.value);
      $line("else if (result != %s) return false;", repr);
    }
  }
}

function var_name(name) {
  return  'var_' + name;
}

function variables(segments) {
  var names = {};
  for (var i = 0; i < segments.length; i++) {
    var name = segments[i].name;
    if (name && name !== '_') {
      names[name] = true;
    }
    name = segments[i].size;
    if (typeof name === 'string') {
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
  $line('};');
  $line('}'); // if offset == binsize
  $line("else return false;");
  $line("}"); // end function

  var fn = new Function('parse_int', 'parse_float', $result());
  return fn(parse_int, parse_float);
}


function write_seg(segment) {
  switch (segment.type) {
  case 'string':
    $line("offset += buf.write(%s, offset, 'utf8');",
          JSON.stringify(segment.value));
    break;
  case 'binary':
    $line("val = bindings['%s'];", segment.name);
    if (segment.size === true) {
      $line('size = val.length;');
    }
    else if (typeof segment.size === 'string') {
      $line("size = (bindings['%s'] * %d) / 8;",
            segment.size, segment.unit);
    }
    else {
      $line("size = %d;", (segment.size * segment.unit) / 8);
    }
    $line('val.copy(buf, offset, 0, size);');
    $line('offset += size;');
    break;
  case 'integer':
  case 'float':
    write_number(segment);
    break;
  }
}

function write_number(segment) {
  if (segment.name) {
    $line("val = bindings['%s'];", segment.name);
  }
  else {
    $line("val = %d", segment.value);
  }
  var writer = (segment.type === 'integer') ?
    'write_int' : 'write_float';
  if (typeof segment.size === 'string') {
    $line("size = (bindings['%s'] * %d) / 8;",
          segment.size, segment.unit);
  }
  else {
    $line('size = %d;', (segment.size * segment.unit) / 8);
  }
  $line('%s(buf, val, offset, size, %s);',
        writer, segment.bigendian);
  $line('offset += size;');
}

function size_of(segments) {
  var variable = [];
  var fixed = 0;

  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (typeof segment.size === 'string' ||
        segment.size === true) {
      variable.push(segment);
    }
    else if (segment.type === 'string') {
      fixed += Buffer.byteLength(segment.value);
    }
    else {
      fixed += (segment.size * segment.unit) / 8;
    }
  }

  $line('var buffersize = %d;', fixed);

  if (variable.length > 0) {
    for (var j = 0; j < variable.length; j++) {
      var segment = variable[j];
      if (segment.size === true) {
        $line("buffersize += bindings['%s'].length;", segment.name);
      }
      else {
        $line("buffersize += (bindings['%s'] * %d) / 8;",
              segment.size, segment.unit);
      }
    }
  }
}

function emit_write(segments) {
  $line('var val, size;');

  var len = segments.length;
  for (var i = 0; i < len; i++) {
    var segment = segments[i];
    $line('// %s', JSON.stringify(segment));
    write_seg(segment);
  }
}

function compile_ctor(segments) {
  $start();
  $line('return function(bindings) {');
  $line("'use strict';");
  size_of(segments);
  $line('var buf = Buffer.alloc(buffersize);');
  $line('var offset = 0;');
  emit_write(segments);
  $line('return buf;');
  $line('}'); // end function

  return new Function('write_int', 'write_float', 'Buffer',
                      $result())(write_int, write_float, Buffer);
}

__webpack_unused_export__ = compile_pattern;
module.exports.compile = function() {
  var str = [].join.call(arguments, ',');
  var p = parse(str);
  return compile_pattern(p);
};
module.exports.compile_builder = function() {
  var str = [].join.call(arguments, ',');
  var p = parse(str);
  return compile_ctor(p);
};


/***/ }),

/***/ 5735:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// -*- js-indent-level: 2 -*-

// Constructors given patterns



var ints = __nccwpck_require__(7660);
var Buffer = (__nccwpck_require__(4818).Buffer);

// Interpret the pattern, writing values into a buffer
function write(buf, offset, pattern, bindings) {
  for (var i=0, len = pattern.length; i < len; i++) {
    var segment = pattern[i];
    switch (segment.type) {
    case 'string':
      offset += buf.write(segment.value, offset, 'utf8');
      break;
    case 'binary':
      offset += writeBinary(segment, buf, offset, bindings);
      break;
    case 'integer':
      offset += writeInteger(segment, buf, offset, bindings);
      break;
    case 'float':
      offset += writeFloat(segment, buf, offset, bindings);
      break;
    }
  }
  return offset;
}

function build(pattern, bindings) {
  var bufsize = size_of(pattern, bindings);
  var buf = Buffer.alloc(bufsize);
  write(buf, 0, pattern, bindings);
  return buf;
}

// In bytes
function size_of_segment(segment, bindings) {
  // size refers to a variable
  if (typeof segment.size === 'string') {
    return (bindings[segment.size] * segment.unit) / 8;
  }
  if (segment.type === 'string') {
    return Buffer.byteLength(segment.value, 'utf8');
  }
  if (segment.type === 'binary' && segment.size === true) {
    var val = bindings[segment.name];
    return val.length;
  }
  return (segment.size * segment.unit) / 8;
}

// size of the to-be-constructed binary, in bytes
function size_of(segments, bindings) {
  var size = 0;
  for (var i=0, len = segments.length; i < len; i++) {
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

// TODO in ff might use the noAssert argument to Buffer.write*() but
// need to check that it does the right thing wrt little-endian

function writeInteger(segment, buf, offset, bindings) {
  var value = (segment.name) ? bindings[segment.name] : segment.value;
  var size = size_of_segment(segment, bindings);
  return write_int(buf, value, offset, size, segment.bigendian);
}

function write_int(buf, value, offset, size, bigendian) {
  switch (size) {
  case 1:
    buf.writeUInt8(value, offset);
    break;
  case 2:
    (bigendian) ?
      buf.writeUInt16BE(value, offset) :
      buf.writeUInt16LE(value, offset);
    break;
  case 4:
    (bigendian) ?
      buf.writeUInt32BE(value, offset) :
      buf.writeUInt32LE(value, offset);
    break;
  case 8:
    (bigendian) ?
      ints.writeUInt64BE(buf, value, offset) :
      ints.writeUInt64LE(buf, value, offset);
    break;
  default:
    throw new Error("integer size * unit must be 8, 16, 32 or 64");
  }
  return size;
}

function writeFloat(segment, buf, offset, bindings) {
  var value = (segment.name) ? bindings[segment.name] : segment.value;
  var size = size_of_segment(segment, bindings);
  return write_float(buf, value, offset, size, segment.bigendian);
}

function write_float(buf, value, offset, size, bigendian) {
  if (size === 4) {
    (bigendian) ?
      buf.writeFloatBE(value, offset) :
      buf.writeFloatLE(value, offset);
  }
  else if (size === 8) {
    (bigendian) ?
      buf.writeDoubleBE(value, offset) :
      buf.writeDoubleLE(value, offset);
  }
  else {
    throw new Error("float size * unit must be 32 or 64");
  }
  return size;
}

var parse = (__nccwpck_require__(1606).parse);

module.exports.write = write;
module.exports.build = build;
module.exports.write_int = write_int;
module.exports.write_float = write_float;

module.exports.builder = function(pstr) {
  pstr = (arguments.length > 1) ? [].join.call(arguments, ',') : pstr;
  var pattern = parse(pstr);
  return function(vars) {
    return build(pattern, vars);
  };
};


/***/ }),

/***/ 3882:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// -*- js-indent: 2 -*-
// Interpreter for bit syntax AST.
// Grammar:
//
// pattern   := segment ("," segment)*
// segment   := (value | var) (":" size)? ("/" specifier ("-" specifier)*)? | string
// var       := "_" | identifier
// size      := integer | var
// specifier := "little" | "big" | "signed" | "unsigned" | "unit" ":" 0..256 | type
// type      := "integer" | "binary" | "float"
//
// where integer has the obvious meaning, and identifier is anything
// other than "_" that fits the JavaScript identifier specification.
//

// We'll use an object to represent each segment, and an array of
// segments for a pattern. We won't try to optimise for groups of
// patterns; we'll just step through each to see if it works. We rely
// a hypothetical prior step to check that it's a valid pattern.

// ? compile to intermediate instructions ?

// A segment looks like
// {
//    type: string, // 'string' is special case
//    size: integer | true, // true means 'all remaining'
//    name: string | null, // (may be '_')
//    value: value | null, // either name OR value
//    unit: integer,
//    signed: boolean,
//    bigendian: boolean
// }



var ints    = __nccwpck_require__(7660),
    debug   = __nccwpck_require__(3510)('bitsyntax-Interpreter');

function parse_int(bin, off, sizeInBytes, bigendian, signed) {
  switch (sizeInBytes) {
  case 1:
    return (signed) ? bin.readInt8(off) : bin.readUInt8(off);
  case 2:
    return (bigendian) ?
      (signed) ? bin.readInt16BE(off) : bin.readUInt16BE(off) :
      (signed) ? bin.readInt16LE(off) : bin.readUInt16LE(off);
  case 4:
    return (bigendian) ?
      (signed) ? bin.readInt32BE(off) : bin.readUInt32BE(off) :
      (signed) ? bin.readInt32LE(off) : bin.readUInt32LE(off);
  case 8:
    return (bigendian) ?
      ((signed) ? ints.readInt64BE : ints.readUInt64BE)(bin, off) :
      ((signed) ? ints.readInt64LE : ints.readUInt64LE)(bin, off);
  default:
    throw "Integers must be 8-, 16-, 32- or 64-bit";
  }
}

function parse_float(bin, off, sizeInBytes, bigendian) {
  switch (sizeInBytes) {
  case 4:
    return (bigendian) ? bin.readFloatBE(off) : bin.readFloatLE(off);
  case 8:
    return (bigendian) ? bin.readDoubleBE(off) : bin.readDoubleLE(off);
  default:
    throw "Floats must be 32- or 64-bit";
  }
}

function size_of(segment, bound) {
  var size = segment.size;
  if (typeof size === 'string') {
    return bound[size];
  }
  else {
    return size;
  }
}

function new_scope(env) {
  function scope() {};
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

  function skip_bits(segment) {
    debug("skip bits"); debug(segment);
    var size = size_of(segment, vars);
    if (size === true) {
      if (offset % 8 === 0) {
        offset = binsize;
        return true;
      }
      else {
        return false;
      }
    }

    var bits = segment.unit * size;
    if (offset + bits > binsize) {
      return false;
    }
    else {
      offset += bits;
    }
  }

  function get_integer(segment) {
    debug("get_integer"); debug(segment);
    // let's do only multiples of eight bits for now
    var unit = segment.unit, size = size_of(segment, vars);
    var bitsize = size * unit;
    var byteoffset = offset / 8; // NB assumes aligned
    offset += bitsize;
    if (bitsize % 8 > 0 || (offset > binsize)) {
      return false;
    }
    else {
      return parse_int(binary, byteoffset, bitsize / 8,
                       segment.bigendian, segment.signed);
    }
  }

  function get_float(segment) {
    debug("get_float"); debug(segment);
    var unit = segment.unit; var size = size_of(segment, vars);
    var bitsize = size * unit;
    var byteoffset = offset / 8; // assume aligned
    offset += bitsize;
    if (offset > binsize) {
      return false;
    }
    else {
      return parse_float(binary, byteoffset,
                         bitsize / 8, segment.bigendian);
    }
  }

  function get_binary(segment) {
    debug("get_binary"); debug(segment);
    var unit = segment.unit, size = size_of(segment, vars);
    var byteoffset = offset / 8; // NB alignment

    if (size === true) {
      offset = binsize;
      return binary.slice(byteoffset);
    }
    else {
      var bitsize = size * unit;
      if (bitsize % 8 > 0 || (offset + bitsize) > binsize) {
        return false;
      }
      else {
        offset += bitsize;
        return binary.slice(byteoffset, byteoffset + bitsize / 8);
      }
    }
  }

  function get_string(segment) {
    debug("get_string"); debug(segment);
    var len = segment.value.length;
    var byteoffset = offset / 8;

    offset += len * 8;
    if (offset > binsize) {
      return false;
    }
    // FIXME bytes vs UTF8 characters
    return binary.slice(byteoffset, byteoffset + len).toString('utf8');
  }

  var patternlen = pattern.length;
  for (var i = 0;  i < patternlen; i++) {
    var segment = pattern[i];
    var result = false;
    if (segment.name === '_') {
      result = skip_bits(segment);
    }
    else {
      switch (segment.type) {
      case 'string':
        result = get_string(segment);
        break;
      case 'integer':
        result = get_integer(segment);
        break;
      case 'float':
        result = get_float(segment);
        break;
      case 'binary':
        result = get_binary(segment);
        break;
      }

      if (result === false) {
        return false;
      }
      else if (segment.name) {
        vars[segment.name] = result;
      }
      else if (segment.value != result) {
        return false;
      }
    }
  }
  if (offset == binsize) {
    return bindings(vars);
  }
  else {
    return false;
  }
}

module.exports.match = match;
module.exports.parse_int = parse_int;
module.exports.parse_float = parse_float;


/***/ }),

/***/ 1606:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Parse patterns in string form into the form we use for interpreting
// (and later, for compiling).



var ast = __nccwpck_require__(3694);
var parser = __nccwpck_require__(878);

function parse_pattern(string) {
  var segments = parser.parse(string);
  for (var i=0, len = segments.length; i < len; i++) {
    var s = segments[i];
    if (s.string != undefined) {
      segments[i] = ast.string(s.string);
    }
    else if (s.value != undefined) {
      segments[i] = ast.value(s.value, s.size, s.specifiers);
    }
    else if (s.name != undefined) {
      segments[i] = ast.variable(s.name, s.size, s.specifiers);
    }
    else {
      throw "Unknown segment " + s;
    }
  }
  return segments;
}

module.exports.parse = function() {
  var str = [].join.call(arguments, ',');
  return parse_pattern(str);
};


/***/ }),

/***/ 878:
/***/ ((module) => {

module.exports = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
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
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
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
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ws();
        if (result0 !== null) {
          result1 = parse_segment();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_segmentTail();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_segmentTail();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
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
          result0 = (function(offset, head, tail) { tail.unshift(head); return tail; })(pos0, result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_segmentTail() {
        var result0, result1, result2, result3;
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
              matchFailed("\",\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_ws();
            if (result2 !== null) {
              result3 = parse_segment();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
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
          result0 = (function(offset, seg) { return seg; })(pos0, result0[3]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_segment() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        result0 = parse_string();
        if (result0 !== null) {
          result0 = (function(offset, str) { return {string: str}; })(pos0, result0);
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
              result2 = parse_specifierList();
              result2 = result2 !== null ? result2 : "";
              if (result2 !== null) {
                result0 = [result0, result1, result2];
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
            result0 = (function(offset, v, size, specs) { return {name: v, size: size, specifiers: specs}; })(pos0, result0[0], result0[1], result0[2]);
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
                result2 = parse_specifierList();
                result2 = result2 !== null ? result2 : "";
                if (result2 !== null) {
                  result0 = [result0, result1, result2];
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
              result0 = (function(offset, v, size, specs) { return {value: v, size: size, specifiers: specs}; })(pos0, result0[0], result0[1], result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
        }
        return result0;
      }
      
      function parse_string() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 34) {
          result0 = "\"";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\"\"");
          }
        }
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 34) {
            result1 = "\"";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\"\"");
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
          result0 = (function(offset) { return "";    })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 34) {
            result0 = "\"";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\"\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_chars();
            if (result1 !== null) {
              if (input.charCodeAt(pos) === 34) {
                result2 = "\"";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\\"\"");
                }
              }
              if (result2 !== null) {
                result0 = [result0, result1, result2];
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
            result0 = (function(offset, chars) { return chars; })(pos0, result0[1]);
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
          result0 = (function(offset, chars) { return chars.join(""); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_char() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        if (/^[^"\\\0-\x1F]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[^\"\\\\\\0-\\x1F]");
          }
        }
        if (result0 === null) {
          pos0 = pos;
          if (input.substr(pos, 2) === "\\\"") {
            result0 = "\\\"";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\\\\\"\"");
            }
          }
          if (result0 !== null) {
            result0 = (function(offset) { return '"';  })(pos0);
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
                matchFailed("\"\\\\\\\\\"");
              }
            }
            if (result0 !== null) {
              result0 = (function(offset) { return "\\"; })(pos0);
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
                  matchFailed("\"\\\\/\"");
                }
              }
              if (result0 !== null) {
                result0 = (function(offset) { return "/";  })(pos0);
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
                    matchFailed("\"\\\\b\"");
                  }
                }
                if (result0 !== null) {
                  result0 = (function(offset) { return "\b"; })(pos0);
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
                      matchFailed("\"\\\\f\"");
                    }
                  }
                  if (result0 !== null) {
                    result0 = (function(offset) { return "\f"; })(pos0);
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
                        matchFailed("\"\\\\n\"");
                      }
                    }
                    if (result0 !== null) {
                      result0 = (function(offset) { return "\n"; })(pos0);
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
                          matchFailed("\"\\\\r\"");
                        }
                      }
                      if (result0 !== null) {
                        result0 = (function(offset) { return "\r"; })(pos0);
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
                            matchFailed("\"\\\\t\"");
                          }
                        }
                        if (result0 !== null) {
                          result0 = (function(offset) { return "\t"; })(pos0);
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
                              matchFailed("\"\\\\u\"");
                            }
                          }
                          if (result0 !== null) {
                            result1 = parse_hexDigit();
                            if (result1 !== null) {
                              result2 = parse_hexDigit();
                              if (result2 !== null) {
                                result3 = parse_hexDigit();
                                if (result3 !== null) {
                                  result4 = parse_hexDigit();
                                  if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
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
                            result0 = (function(offset, h1, h2, h3, h4) {
                                return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
                              })(pos0, result0[1], result0[2], result0[3], result0[4]);
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
        var result0, result1, result2;
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
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[_a-zA-Z0-9]");
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            if (/^[_a-zA-Z0-9]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
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
          result0 = (function(offset, head, tail) { return head + tail.join(''); })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_number() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        if (input.charCodeAt(pos) === 48) {
          result0 = "0";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"0\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) { return 0; })(pos0);
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
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9]");
              }
            }
            while (result2 !== null) {
              result1.push(result2);
              if (/^[0-9]/.test(input.charAt(pos))) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
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
            result0 = (function(offset, head, tail) { return parseInt(head + tail.join('')); })(pos0, result0[0], result0[1]);
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
            matchFailed("\":\"");
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
          result0 = (function(offset, num) { return num; })(pos0, result0[1]);
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
              matchFailed("\":\"");
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
            result0 = (function(offset, id) { return id; })(pos0, result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        return result0;
      }
      
      function parse_specifierList() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 47) {
          result0 = "/";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"/\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_specifier();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_specifierTail();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_specifierTail();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
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
          result0 = (function(offset, head, tail) { tail.unshift(head); return tail; })(pos0, result0[1], result0[2]);
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
            matchFailed("\"-\"");
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
          result0 = (function(offset, spec) { return spec; })(pos0, result0[1]);
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
            matchFailed("\"little\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 3) === "big") {
            result0 = "big";
            pos += 3;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"big\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 6) === "signed") {
              result0 = "signed";
              pos += 6;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"signed\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 8) === "unsigned") {
                result0 = "unsigned";
                pos += 8;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"unsigned\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 7) === "integer") {
                  result0 = "integer";
                  pos += 7;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"integer\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 6) === "binary") {
                    result0 = "binary";
                    pos += 6;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"binary\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos, 5) === "float") {
                      result0 = "float";
                      pos += 5;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"float\"");
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
            matchFailed("\"unit:\"");
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
          result0 = (function(offset, num) { return 'unit:' + num; })(pos0, result0[1]);
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
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
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
        
        return { line: line, column: column };
      }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
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
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
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
})();


/***/ }),

/***/ 3694:
/***/ ((module) => {

"use strict";
// -*- js-indent-level: 2 -*-
// Constructing patterns



function set(values) {
  var s = {};
  for (var i in values) {
    if (!Object.prototype.hasOwnProperty.call(values, i)) continue;
    s[values[i]] = 1;
  }
  return s;
}

// Construct a segment bound to a variable, e.g., from a segment like
// "Len:32/unsigned-big". `specifiers0` is an array.
function variable(name, size, specifiers0) {
  var specifiers = set(specifiers0);
  var segment = {name: name};
  segment.type = type_in(specifiers);
  specs(segment, segment.type, specifiers);
  segment.size = size_of(segment, segment.type, size, segment.unit);
  return segment;
}

module.exports.variable = variable;
module.exports.rest = function() {
  return variable('_', true, ['binary']);
}

// Construct a segment with a literal value, e.g., from a segment like
// "206". `specifiers0` is an array.

function value(val, size, specifiers0) {
  var specifiers = set(specifiers0);
  var segment = {value: val};
  segment.type = type_in(specifiers);
  // TODO check type v. value ..
  specs(segment, segment.type, specifiers);
  segment.size = size_of(segment, segment.type, size, segment.unit);
  return segment;
}

module.exports.value = value;

// A string can appear as a literal, but it must appear without
// specifiers.
function string(val) {
  return {value: val, type: 'string'};
}
module.exports.string = string;

var TYPES = {'integer': 1, 'binary': 1, 'float': 1};
function type_in(specifiers) {
  for (var t in specifiers) {
    if (!Object.prototype.hasOwnProperty.call(specifiers, t)) continue;
    if (TYPES[t]) { return t; }
  }
  return 'integer';
}

function specs(segment, type, specifiers) {
  switch (type) {
  case 'integer':
    segment.signed = signed_in(specifiers);
    // fall through
  case 'float':
    segment.bigendian = endian_in(specifiers);
    // fall through
  default:
    segment.unit = unit_in(specifiers, segment.type);
  }
  return segment;
}

function endian_in(specifiers) {
  // default is big, but I have chosen true = bigendian
  return !specifiers['little'];
}

function signed_in(specifiers) {
  // this time I got it right; default is unsigned
  return specifiers['signed'];
}

function unit_in(specifiers, type) {
  for (var s in specifiers) {
    if (!Object.prototype.hasOwnProperty.call(specifiers, s)) continue;
    if (s.substr(0, 5) == 'unit:') {
      var unit = parseInt(s.substr(5));
      // TODO check sane for type
      return unit;
    }
  }
  // OK defaults then
  switch (type) {
  case 'binary':
    return 8;
  case 'integer':
  case 'float':
    return 1;
  }
}

function size_of(segment, type, size, unit) {
  if (size !== undefined && size !== '') {
    return size;
  }
  else {
    switch (type) {
    case 'integer':
      return 8;
    case 'float':
      return 64;
    case 'binary':
      return true;
    }
  }
}


/***/ }),

/***/ 3374:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var raw_connect = (__nccwpck_require__(4909)/* .connect */ .$);
var ChannelModel = (__nccwpck_require__(3383)/* .ChannelModel */ .K2);
var promisify = (__nccwpck_require__(3837).promisify);

function connect(url, connOptions) {
  return promisify(function(cb) {
    return raw_connect(url, connOptions, cb);
  })()
  .then(function(conn) {
    return new ChannelModel(conn);
  });
};

module.exports.connect = connect;
module.exports.credentials = __nccwpck_require__(9154);
module.exports.IllegalOperationError = __nccwpck_require__(5785).IllegalOperationError;


/***/ }),

/***/ 8058:
/***/ ((module) => {

"use strict";
//
//
//



/*
The channel (promise) and callback APIs have similar signatures, and
in particular, both need AMQP fields prepared from the same arguments
and options. The arguments marshalling is done here. Each of the
procedures below takes arguments and options (the latter in an object)
particular to the operation it represents, and returns an object with
fields for handing to the encoder.
*/

// A number of AMQP methods have a table-typed field called
// `arguments`, that is intended to carry extension-specific
// values. RabbitMQ uses this in a number of places; e.g., to specify
// an 'alternate exchange'.
//
// Many of the methods in this API have an `options` argument, from
// which I take both values that have a default in AMQP (e.g.,
// autoDelete in QueueDeclare) *and* values that are specific to
// RabbitMQ (e.g., 'alternate-exchange'), which would normally be
// supplied in `arguments`. So that extensions I don't support yet can
// be used, I include `arguments` itself among the options.
//
// The upshot of this is that I often need to prepare an `arguments`
// value that has any values passed in `options.arguments` as well as
// any I've promoted to being options themselves. Since I don't want
// to mutate anything passed in, the general pattern is to create a
// fresh object with the `arguments` value given as its prototype; all
// fields in the supplied value will be serialised, as well as any I
// set on the fresh object. What I don't want to do, however, is set a
// field to undefined by copying possibly missing field values,
// because that will mask a value in the prototype.
//
// NB the `arguments` field already has a default value of `{}`, so
// there's no need to explicitly default it unless I'm setting values.
function setIfDefined(obj, prop, value) {
  if (value != undefined) obj[prop] = value;
}

var EMPTY_OPTIONS = Object.freeze({});

var Args = {};

Args.assertQueue = function(queue, options) {
  queue = queue || '';
  options = options || EMPTY_OPTIONS;

  var argt = Object.create(options.arguments || null);
  setIfDefined(argt, 'x-expires', options.expires);
  setIfDefined(argt, 'x-message-ttl', options.messageTtl);
  setIfDefined(argt, 'x-dead-letter-exchange',
               options.deadLetterExchange);
  setIfDefined(argt, 'x-dead-letter-routing-key',
               options.deadLetterRoutingKey);
  setIfDefined(argt, 'x-max-length', options.maxLength);
  setIfDefined(argt, 'x-max-priority', options.maxPriority);
  setIfDefined(argt, 'x-overflow', options.overflow);
  setIfDefined(argt, 'x-queue-mode', options.queueMode);

  return {
    queue: queue,
    exclusive: !!options.exclusive,
    durable: (options.durable === undefined) ? true : options.durable,
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
    queue: queue,
    passive: true, // switch to "completely different" mode
    nowait: false,
    durable: true, autoDelete: false, exclusive: false, // ignored
    ticket: 0,
  };
};

Args.deleteQueue = function(queue, options) {
  options = options || EMPTY_OPTIONS;
  return {
    queue: queue,
    ifUnused: !!options.ifUnused,
    ifEmpty: !!options.ifEmpty,
    ticket: 0, nowait: false
  };
};

Args.purgeQueue = function(queue) {
  return {
    queue: queue,
    ticket: 0, nowait: false
  };
};

Args.bindQueue = function(queue, source, pattern, argt) {
  return {
    queue: queue,
    exchange: source,
    routingKey: pattern,
    arguments: argt,
    ticket: 0, nowait: false
  };
};

Args.unbindQueue = function(queue, source, pattern, argt) {
  return {
    queue: queue,
    exchange: source,
    routingKey: pattern,
    arguments: argt,
    ticket: 0, nowait: false
  };
};

Args.assertExchange = function(exchange, type, options) {
  options = options || EMPTY_OPTIONS;
  var argt = Object.create(options.arguments || null);
  setIfDefined(argt, 'alternate-exchange', options.alternateExchange);
  return {
    exchange: exchange,
    ticket: 0,
    type: type,
    passive: false,
    durable: (options.durable === undefined) ? true : options.durable,
    autoDelete: !!options.autoDelete,
    internal: !!options.internal,
    nowait: false,
    arguments: argt
  };
};

Args.checkExchange = function(exchange) {
  return {
    exchange: exchange,
    passive: true, // switch to 'may as well be another method' mode
    nowait: false,
    // ff are ignored
    durable: true, internal: false,  type: '',  autoDelete: false,
    ticket: 0
  };
};

Args.deleteExchange = function(exchange, options) {
  options = options || EMPTY_OPTIONS;
  return {
    exchange: exchange,
    ifUnused: !!options.ifUnused,
    ticket: 0, nowait: false
  };
};

Args.bindExchange = function(dest, source, pattern, argt) {
  return {
    source: source,
    destination: dest,
    routingKey: pattern,
    arguments: argt,
    ticket: 0, nowait: false
  };
};

Args.unbindExchange = function(dest, source, pattern, argt) {
  return {
    source: source,
    destination: dest,
    routingKey: pattern,
    arguments: argt,
    ticket: 0, nowait: false
  };
};

// It's convenient to construct the properties and the method fields
// at the same time, since in the APIs, values for both can appear in
// `options`. Since the property or mthod field names don't overlap, I
// just return one big object that can be used for both purposes, and
// the encoder will pick out what it wants.
Args.publish = function(exchange, routingKey, options) {
  options = options || EMPTY_OPTIONS;

  // The CC and BCC fields expect an array of "longstr", which would
  // normally be buffer values in JavaScript; however, since a field
  // array (or table) cannot have shortstr values, the codec will
  // encode all strings as longstrs anyway.
  function convertCC(cc) {
    if (cc === undefined) {
      return undefined;
    }
    else if (Array.isArray(cc)) {
      return cc.map(String);
    }
    else return [String(cc)];
  }

  var headers = Object.create(options.headers || null);
  setIfDefined(headers, 'CC', convertCC(options.CC));
  setIfDefined(headers, 'BCC', convertCC(options.BCC));

  var deliveryMode; // undefined will default to 1 (non-persistent)

  // Previously I overloaded deliveryMode be a boolean meaning
  // 'persistent or not'; better is to name this option for what it
  // is, but I need to have backwards compatibility for applications
  // that either supply a numeric or boolean value.
  if (options.persistent !== undefined)
    deliveryMode = (options.persistent) ? 2 : 1;
  else if (typeof options.deliveryMode === 'number')
    deliveryMode = options.deliveryMode;
  else if (options.deliveryMode) // is supplied and truthy
    deliveryMode = 2;

  var expiration = options.expiration;
  if (expiration !== undefined) expiration = expiration.toString();

  return {
    // method fields
    exchange: exchange,
    routingKey: routingKey,
    mandatory: !!options.mandatory,
    immediate: false, // RabbitMQ doesn't implement this any more
    ticket: undefined,
    // properties
    contentType: options.contentType,
    contentEncoding: options.contentEncoding,
    headers: headers,
    deliveryMode: deliveryMode,
    priority: options.priority,
    correlationId: options.correlationId,
    replyTo: options.replyTo,
    expiration: expiration,
    messageId: options.messageId,
    timestamp: options.timestamp,
    type: options.type,
    userId: options.userId,
    appId: options.appId,
    clusterId: undefined
  };
};

Args.consume = function(queue, options) {
  options = options || EMPTY_OPTIONS;
  var argt = Object.create(options.arguments || null);
  setIfDefined(argt, 'x-priority', options.priority);
  return {
    ticket: 0,
    queue: queue,
    consumerTag: options.consumerTag || '',
    noLocal: !!options.noLocal,
    noAck: !!options.noAck,
    exclusive: !!options.exclusive,
    nowait: false,
    arguments: argt
  };
};

Args.cancel = function(consumerTag) {
  return {
    consumerTag: consumerTag,
    nowait: false
  };
};

Args.get = function(queue, options) {
  options = options || EMPTY_OPTIONS;
  return {
    ticket: 0,
    queue: queue,
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
    requeue: (requeue === undefined) ? true : requeue
  };
};

Args.reject = function(tag, requeue) {
  return {
    deliveryTag: tag,
    requeue: (requeue === undefined) ? true : requeue
  };
};

Args.prefetch = function(count, global) {
  return {
    prefetchCount: count || 0,
    prefetchSize: 0,
    global: !!global
  };
};

Args.recover = function() {
  return {requeue: true};
};

module.exports = Object.freeze(Args);


/***/ }),

/***/ 3393:
/***/ ((module) => {

"use strict";
//
//
//



/**
 * A bitset implementation, after that in java.util.  Yes there
 * already exist such things, but none implement next{Clear|Set}Bit or
 * equivalent, and none involved me tooling about for an evening.
 */
class BitSet {
  /**
   * @param {number} [size]
   */
  constructor(size) {
    if (size) {
      const numWords = Math.ceil(size / 32);
      this.words = new Array(numWords);
    }
    else {
      this.words = [];
    }
    this.wordsInUse = 0; // = number, not index
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
    if (w >= this.wordsInUse) return;
    const mask = ~(1 << bitIndex);
    this.words[w] &= mask;
  }

  /**
   * @param {number} bitIndex
   */
  get(bitIndex) {
    const w = wordIndex(bitIndex);
    if (w >= this.wordsInUse) return false; // >= since index vs size
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
    if (w >= this.wordsInUse) return -1;

    // the right-hand side is shifted to only test the bits of the first
    // word that are > fromIndex
    let word = this.words[w] & (0xffffffff << fromIndex);
    while (true) {
      if (word) return (w * 32) + trailingZeros(word);
      w++;
      if (w === this.wordsInUse) return -1;
      word = this.words[w];
    }
  }

  /**
   * @param {number} fromIndex
   */
  nextClearBit(fromIndex) {
    let w = wordIndex(fromIndex);
    if (w >= this.wordsInUse) return fromIndex;

    let word = ~(this.words[w]) & (0xffffffff << fromIndex);
    while (true) {
      if (word) return (w * 32) + trailingZeros(word);
      w++;
      if (w == this.wordsInUse) return w * 32;
      word = ~(this.words[w]);
    }
  }
}

/**
 * @param {number} bitIndex
 */
function wordIndex(bitIndex) {
  return Math.floor(bitIndex / 32);
}

/**
 * @param {number} i
 */
function trailingZeros(i) {
  // From Hacker's Delight, via JDK. Probably far less effective here,
  // since bit ops are not necessarily the quick way to do things in
  // JS.
  if (i === 0) return 32;
  let y, n = 31;
  y = i << 16; if (y != 0) { n = n -16; i = y; }
  y = i << 8;  if (y != 0) { n = n - 8; i = y; }
  y = i << 4;  if (y != 0) { n = n - 4; i = y; }
  y = i << 2;  if (y != 0) { n = n - 2; i = y; }
  return n - ((i << 1) >>> 31);
}

module.exports.q = BitSet;


/***/ }),

/***/ 8522:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
//
//
//

// Channel machinery.



var defs = __nccwpck_require__(7818);
var closeMsg = (__nccwpck_require__(6629).closeMessage);
var inspect = (__nccwpck_require__(6629).inspect);
var methodName = (__nccwpck_require__(6629).methodName);
var assert = __nccwpck_require__(9491);
var inherits = (__nccwpck_require__(3837).inherits);
var EventEmitter = (__nccwpck_require__(2361).EventEmitter);
var fmt = (__nccwpck_require__(3837).format);
var IllegalOperationError = (__nccwpck_require__(5785).IllegalOperationError);
var stackCapture = (__nccwpck_require__(5785)/* .stackCapture */ .t);
function Channel(connection) {
  EventEmitter.call( this );
  this.connection = connection;
  // for the presently outstanding RPC
  this.reply = null;
  // for the RPCs awaiting action
  this.pending = [];
  // for unconfirmed messages
  this.lwm = 1; // the least, unconfirmed deliveryTag
  this.unconfirmed = []; // rolling window of delivery callbacks
  this.on('ack', this.handleConfirm.bind(this, function(cb) {
    if (cb) cb(null);
  }));
  this.on('nack', this.handleConfirm.bind(this, function(cb) {
    if (cb) cb(new Error('message nacked'));
  }));
  this.on('close', function () {
    var cb;
    while (cb = this.unconfirmed.shift()) {
      if (cb) cb(new Error('channel closed'));
    }
  })
  // message frame state machine
  this.handleMessage = acceptDeliveryOrReturn;
}
inherits(Channel, EventEmitter);

module.exports.Channel = Channel;
module.exports.acceptMessage = acceptMessage;

var C = Channel.prototype;

C.allocate = function() {
  this.ch = this.connection.freshChannel(this);
  return this;
}

// Incoming frames are either notifications of e.g., message delivery,
// or replies to something we've sent. In general I deal with the
// former by emitting an event, and with the latter by keeping a track
// of what's expecting a reply.
//
// The AMQP specification implies that RPCs can't be pipelined; that
// is, you can have only one outstanding RPC on a channel at a
// time. Certainly that's what RabbitMQ and its clients assume. For
// this reason, I buffer RPCs if the channel is already waiting for a
// reply.

// Just send the damn frame.
C.sendImmediately = function(method, fields) {
  return this.connection.sendMethod(this.ch, method, fields);
};

// Invariant: !this.reply -> pending.length == 0. That is, whenever we
// clear a reply, we must send another RPC (and thereby fill
// this.reply) if there is one waiting. The invariant relevant here
// and in `accept`.
C.sendOrEnqueue = function(method, fields, reply) {
  if (!this.reply) { // if no reply waiting, we can go
    assert(this.pending.length === 0);
    this.reply = reply;
    this.sendImmediately(method, fields);
  }
  else {
    this.pending.push({method: method,
                       fields: fields,
                       reply: reply});
  }
};

C.sendMessage = function(fields, properties, content) {
  return this.connection.sendMessage(
    this.ch,
    defs.BasicPublish, fields,
    defs.BasicProperties, properties,
    content);
};

// Internal, synchronously resolved RPC; the return value is resolved
// with the whole frame.
C._rpc = function(method, fields, expect, cb) {
  var self = this;

  function reply(err, f) {
    if (err === null) {
      if (f.id === expect) {
        return cb(null, f);
      }
      else {
        // We have detected a problem, so it's up to us to close the
        // channel
        var expectedName = methodName(expect);

        var e = new Error(fmt("Expected %s; got %s",
                              expectedName, inspect(f, false)));
        self.closeWithError(f.id, fmt('Expected %s; got %s',
                                expectedName, methodName(f.id)),
                            defs.constants.UNEXPECTED_FRAME, e);
        return cb(e);
      }
    }
    // An error will be given if, for example, this is waiting to be
    // sent and the connection closes
    else if (err instanceof Error) return cb(err);
    // A close frame will be given if this is the RPC awaiting reply
    // and the channel is closed by the server
    else {
      // otherwise, it's a close frame
      var closeReason =
        (err.fields.classId << 16) + err.fields.methodId;
      var e = (method === closeReason)
        ? fmt("Operation failed: %s; %s",
              methodName(method), closeMsg(err))
        : fmt("Channel closed by server: %s", closeMsg(err));
      var closeFrameError = new Error(e);
      closeFrameError.code = err.fields.replyCode;
      closeFrameError.classId = err.fields.classId;
      closeFrameError.methodId = err.fields.methodId;
      return cb(closeFrameError);
    }
  }

  this.sendOrEnqueue(method, fields, reply);
};

// Shutdown protocol. There's three scenarios:
//
// 1. The application decides to shut the channel
// 2. The server decides to shut the channel, possibly because of
// something the application did
// 3. The connection is closing, so there won't be any more frames
// going back and forth.
//
// 1 and 2 involve an exchange of method frames (Close and CloseOk),
// while 3 doesn't; the connection simply says "shutdown" to the
// channel, which then acts as if it's closing, without going through
// the exchange.

function invalidOp(msg, stack) {
  return function() {
    throw new IllegalOperationError(msg, stack);
  };
}

function invalidateSend(ch, msg, stack) {
  ch.sendImmediately = ch.sendOrEnqueue = ch.sendMessage =
    invalidOp(msg, stack);
}

// Move to entirely closed state.
C.toClosed = function(capturedStack) {
  this._rejectPending();
  invalidateSend(this, 'Channel closed', capturedStack);
  this.accept = invalidOp('Channel closed', capturedStack);
  this.connection.releaseChannel(this.ch);
  this.emit('close');
};

// Stop being able to send and receive methods and content. Used when
// we close the channel. Invokes the continuation once the server has
// acknowledged the close, but before the channel is moved to the
// closed state.
C.toClosing = function(capturedStack, k) {
  var send = this.sendImmediately.bind(this);
  invalidateSend(this, 'Channel closing', capturedStack);

  this.accept = function(f) {
    if (f.id === defs.ChannelCloseOk) {
      if (k) k();
      var s = stackCapture('ChannelCloseOk frame received');
      this.toClosed(s);
    }
    else if (f.id === defs.ChannelClose) {
      send(defs.ChannelCloseOk, {});
    }
    // else ignore frame
  };
};

C._rejectPending = function() {
  function rej(r) {
    r(new Error("Channel ended, no reply will be forthcoming"));
  }
  if (this.reply !== null) rej(this.reply);
  this.reply = null;

  var discard;
  while (discard = this.pending.shift()) rej(discard.reply);
  this.pending = null; // so pushes will break
};

C.closeBecause = function(reason, code, k) {
  this.sendImmediately(defs.ChannelClose, {
    replyText: reason,
    replyCode: code,
    methodId:0, classId: 0
  });
  var s = stackCapture('closeBecause called: ' + reason);
  this.toClosing(s, k);
};

// If we close because there's been an error, we need to distinguish
// between what we tell the server (`reason`) and what we report as
// the cause in the client (`error`).
C.closeWithError = function(id, reason, code, error) {
  var self = this;
  this.closeBecause(reason, code, function() {
    error.code = code;
    // content frames and consumer errors do not provide a method a class/method ID
    if (id) {
      error.classId = defs.info(id).classId;
      error.methodId = defs.info(id).methodId;
    }
    self.emit('error', error);
  });
};

// A trampolining state machine for message frames on a channel. A
// message arrives in at least two frames: first, a method announcing
// the message (either a BasicDeliver or BasicGetOk); then, a message
// header with the message properties; then, zero or more content
// frames.

// Keep the try/catch localised, in an attempt to avoid disabling
// optimisation
C.acceptMessageFrame = function(f) {
  try {
    this.handleMessage = this.handleMessage(f);
  }
  catch (msg) {
    if (typeof msg === 'string') {
      this.closeWithError(f.id, msg, defs.constants.UNEXPECTED_FRAME,
                          new Error(msg));
    }
    else if (msg instanceof Error) {
      this.closeWithError(f.id, 'Error while processing message',
                          defs.constants.INTERNAL_ERROR, msg);
    }
    else {
      this.closeWithError(f.id, 'Internal error while processing message',
                          defs.constants.INTERNAL_ERROR,
                          new Error(msg.toString()));
    }
  }
};

// Kick off a message delivery given a BasicDeliver or BasicReturn
// frame (BasicGet uses the RPC mechanism)
function acceptDeliveryOrReturn(f) {
  var event;
  if (f.id === defs.BasicDeliver) event = 'delivery';
  else if (f.id === defs.BasicReturn) event = 'return';
  else throw fmt("Expected BasicDeliver or BasicReturn; got %s",
                 inspect(f));

  var self = this;
  var fields = f.fields;
  return acceptMessage(function(message) {
    message.fields = fields;
    self.emit(event, message);
  });
}

// Move to the state of waiting for message frames (headers, then
// one or more content frames)
function acceptMessage(continuation) {
  var totalSize = 0, remaining = 0;
  var buffers = null;

  var message = {
    fields: null,
    properties: null,
    content: null
  };

  return headers;

  // expect a headers frame
  function headers(f) {
    if (f.id === defs.BasicProperties) {
      message.properties = f.fields;
      totalSize = remaining = f.size;

      // for zero-length messages, content frames aren't required.
      if (totalSize === 0) {
        message.content = Buffer.alloc(0);
        continuation(message);
        return acceptDeliveryOrReturn;
      }
      else {
        return content;
      }
    }
    else {
      throw "Expected headers frame after delivery";
    }
  }

  // expect a content frame
  // %%% TODO cancelled messages (sent as zero-length content frame)
  function content(f) {
    if (f.content) {
      var size = f.content.length;
      remaining -= size;
      if (remaining === 0) {
        if (buffers !== null) {
          buffers.push(f.content);
          message.content = Buffer.concat(buffers);
        }
        else {
          message.content = f.content;
        }
        continuation(message);
        return acceptDeliveryOrReturn;
      }
      else if (remaining < 0) {
        throw fmt("Too much content sent! Expected %d bytes",
                  totalSize);
      }
      else {
        if (buffers !== null)
          buffers.push(f.content);
        else
          buffers = [f.content];
        return content;
      }
    }
    else throw "Expected content frame after headers"
  }
}

C.handleConfirm = function(handle, f) {
  var tag = f.deliveryTag;
  var multi = f.multiple;

  if (multi) {
    var confirmed = this.unconfirmed.splice(0, tag - this.lwm + 1);
    this.lwm = tag + 1;
    confirmed.forEach(handle);
  }
  else {
    var c;
    if (tag === this.lwm) {
      c = this.unconfirmed.shift();
      this.lwm++;
      // Advance the LWM and the window to the next non-gap, or
      // possibly to the end
      while (this.unconfirmed[0] === null) {
        this.unconfirmed.shift();
        this.lwm++;
      }
    }
    else {
      c = this.unconfirmed[tag - this.lwm];
      this.unconfirmed[tag - this.lwm] = null;
    }
    // Technically, in the single-deliveryTag case, I should report a
    // protocol breach if it's already been confirmed.
    handle(c);
  }
};

C.pushConfirmCallback = function(cb) {
  // `null` is used specifically for marking already confirmed slots,
  // so I coerce `undefined` and `null` to false; functions are never
  // falsey.
  this.unconfirmed.push(cb || false);
};

// Interface for connection to use

C.accept = function(f) {

  switch (f.id) {

    // Message frames
  case undefined: // content frame!
  case defs.BasicDeliver:
  case defs.BasicReturn:
  case defs.BasicProperties:
    return this.acceptMessageFrame(f);

    // confirmations, need to do confirm.select first
  case defs.BasicAck:
    return this.emit('ack', f.fields);
  case defs.BasicNack:
    return this.emit('nack', f.fields);
  case defs.BasicCancel:
    // The broker can send this if e.g., the queue is deleted.
    return this.emit('cancel', f.fields);

  case defs.ChannelClose:
    // Any remote closure is an error to us. Reject the pending reply
    // with the close frame, so it can see whether it was that
    // operation that caused it to close.
    if (this.reply) {
      var reply = this.reply; this.reply = null;
      reply(f);
    }
    var emsg = "Channel closed by server: " + closeMsg(f);
    this.sendImmediately(defs.ChannelCloseOk, {});

    var error = new Error(emsg);
    error.code = f.fields.replyCode;
    error.classId = f.fields.classId;
    error.methodId = f.fields.methodId;
    this.emit('error', error);

    var s = stackCapture(emsg);
    this.toClosed(s);
    return;

  case defs.BasicFlow:
    // RabbitMQ doesn't send this, it just blocks the TCP socket
    return this.closeWithError(f.id, "Flow not implemented",
                               defs.constants.NOT_IMPLEMENTED,
                               new Error('Flow not implemented'));

  default: // assume all other things are replies
    // Resolving the reply may lead to another RPC; to make sure we
    // don't hold that up, clear this.reply
    var reply = this.reply; this.reply = null;
    // however, maybe there's an RPC waiting to go? If so, that'll
    // fill this.reply again, restoring the invariant. This does rely
    // on any response being recv'ed after resolving the promise,
    // below; hence, I use synchronous defer.
    if (this.pending.length > 0) {
      var send = this.pending.shift();
      this.reply = send.reply;
      this.sendImmediately(send.method, send.fields);
    }
    return reply(null, f);
  }
};

C.onBufferDrain = function() {
  this.emit('drain');
};


// This adds just a bit more stuff useful for the APIs, but not
// low-level machinery.
function BaseChannel(connection) {
  Channel.call(this, connection);
  this.consumers = new Map();
}
inherits(BaseChannel, Channel);

module.exports.BaseChannel = BaseChannel;

// Not sure I like the ff, it's going to be changing hidden classes
// all over the place. On the other hand, whaddya do.
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
  }
  else {
    // %%% Surely a race here
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


/***/ }),

/***/ 3383:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
var __webpack_unused_export__;
//
//
//



const EventEmitter = __nccwpck_require__(2361);
const promisify = (__nccwpck_require__(3837).promisify);
const defs = __nccwpck_require__(7818);
const {BaseChannel} = __nccwpck_require__(8522);
const {acceptMessage} = __nccwpck_require__(8522);
const Args = __nccwpck_require__(8058);
const {inspect} = __nccwpck_require__(6629);

class ChannelModel extends EventEmitter {
  constructor(connection) {
    super();
    this.connection = connection;

    ['error', 'close', 'blocked', 'unblocked'].forEach(ev => {
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
    await channel.rpc(defs.ConfirmSelect, {nowait: false}, defs.ConfirmSelectOk);
    return channel;
  }
}

// Channels

class Channel extends BaseChannel {
  constructor(connection) {
    super(connection);
    this.on('delivery', this.handleDelivery.bind(this));
    this.on('cancel', this.handleCancel.bind(this));
  }

  // An RPC that returns a 'proper' promise, which resolves to just the
  // response's fields; this is intended to be suitable for implementing
  // API procedures.
  async rpc(method, fields, expect) {
    const f = await promisify(cb => {
      return this._rpc(method, fields, expect, cb);
    })();

    return f.fields;
  }

  // Do the remarkably simple channel open handshake
  async open() {
    const ch = await this.allocate.bind(this)();
    return ch.rpc(defs.ChannelOpen, {outOfBand: ""},
                  defs.ChannelOpenOk);
  }

  close() {
    return promisify(cb => {
      return this.closeBecause("Goodbye", defs.constants.REPLY_SUCCESS,
                      cb);
    })();
  }

  // === Public API, declaring queues and stuff ===

  assertQueue(queue, options) {
    return this.rpc(defs.QueueDeclare,
                    Args.assertQueue(queue, options),
                    defs.QueueDeclareOk);
  }

  checkQueue(queue) {
    return this.rpc(defs.QueueDeclare,
                    Args.checkQueue(queue),
                    defs.QueueDeclareOk);
  }

  deleteQueue(queue, options) {
    return this.rpc(defs.QueueDelete,
                    Args.deleteQueue(queue, options),
                    defs.QueueDeleteOk);
  }

  purgeQueue(queue) {
    return this.rpc(defs.QueuePurge,
                    Args.purgeQueue(queue),
                    defs.QueuePurgeOk);
  }

  bindQueue(queue, source, pattern, argt) {
    return this.rpc(defs.QueueBind,
                    Args.bindQueue(queue, source, pattern, argt),
                    defs.QueueBindOk);
  }

  unbindQueue(queue, source, pattern, argt) {
    return this.rpc(defs.QueueUnbind,
                    Args.unbindQueue(queue, source, pattern, argt),
                    defs.QueueUnbindOk);
  }

  assertExchange(exchange, type, options) {
    // The server reply is an empty set of fields, but it's convenient
    // to have the exchange name handed to the continuation.
    return this.rpc(defs.ExchangeDeclare,
                    Args.assertExchange(exchange, type, options),
                    defs.ExchangeDeclareOk)
      .then(_ok => { return { exchange }; });
  }

  checkExchange(exchange) {
    return this.rpc(defs.ExchangeDeclare,
                    Args.checkExchange(exchange),
                    defs.ExchangeDeclareOk);
  }

  deleteExchange(name, options) {
    return this.rpc(defs.ExchangeDelete,
                    Args.deleteExchange(name, options),
                    defs.ExchangeDeleteOk);
  }

  bindExchange(dest, source, pattern, argt) {
    return this.rpc(defs.ExchangeBind,
                    Args.bindExchange(dest, source, pattern, argt),
                    defs.ExchangeBindOk);
  }

  unbindExchange(dest, source, pattern, argt) {
    return this.rpc(defs.ExchangeUnbind,
                    Args.unbindExchange(dest, source, pattern, argt),
                    defs.ExchangeUnbindOk);
  }

  // Working with messages

  publish(exchange, routingKey, content, options) {
    const fieldsAndProps = Args.publish(exchange, routingKey, options);
    return this.sendMessage(fieldsAndProps, fieldsAndProps, content);
  }

  sendToQueue(queue, content, options) {
    return this.publish('', queue, content, options);
  }

  consume(queue, callback, options) {
    // NB we want the callback to be run synchronously, so that we've
    // registered the consumerTag before any messages can arrive.
    const fields = Args.consume(queue, options);
    return new Promise((resolve, reject) => {
      this._rpc(defs.BasicConsume, fields, defs.BasicConsumeOk, (err, ok) => {
        if (err) return reject(err);
        this.registerConsumer(ok.fields.consumerTag, callback);
        resolve(ok.fields);
      });
    });
  }

  async cancel(consumerTag) {
    const ok = await promisify(cb => {
      this._rpc(defs.BasicCancel, Args.cancel(consumerTag),
            defs.BasicCancelOk,
            cb);
    })()
    .then(ok => {
      this.unregisterConsumer(consumerTag);
      return ok.fields;
    });
  }

  get(queue, options) {
    const fields = Args.get(queue, options);
    return new Promise((resolve, reject) => {
      this.sendOrEnqueue(defs.BasicGet, fields, (err, f) => {
        if (err) return reject(err);
        if (f.id === defs.BasicGetEmpty) {
          return resolve(false);
        }
        else if (f.id === defs.BasicGetOk) {
          const fields = f.fields;
          this.handleMessage = acceptMessage(m => {
            m.fields = fields;
            resolve(m);
          });
        }
        else {
          reject(new Error(`Unexpected response to BasicGet: ${inspect(f)}`));
        }
      });
    });
  }

  ack(message, allUpTo) {
    this.sendImmediately(
      defs.BasicAck,
      Args.ack(message.fields.deliveryTag, allUpTo));
  }

  ackAll() {
    this.sendImmediately(defs.BasicAck, Args.ack(0, true));
  }

  nack(message, allUpTo, requeue) {
    this.sendImmediately(
      defs.BasicNack,
      Args.nack(message.fields.deliveryTag, allUpTo, requeue));
  }

  nackAll(requeue) {
    this.sendImmediately(defs.BasicNack,
                         Args.nack(0, true, requeue));
  }

  // `Basic.Nack` is not available in older RabbitMQ versions (or in the
  // AMQP specification), so you have to use the one-at-a-time
  // `Basic.Reject`. This is otherwise synonymous with
  // `#nack(message, false, requeue)`.
  reject(message, requeue) {
    this.sendImmediately(
      defs.BasicReject,
      Args.reject(message.fields.deliveryTag, requeue));
  }

  recover() {
    return this.rpc(defs.BasicRecover,
                    Args.recover(),
                    defs.BasicRecoverOk);
  }

  qos(count, global) {
    return this.rpc(defs.BasicQos,
                    Args.prefetch(count, global),
                    defs.BasicQosOk);
  }
}

// There are more options in AMQP than exposed here; RabbitMQ only
// implements prefetch based on message count, and only for individual
// channels or consumers. RabbitMQ v3.3.0 and after treat prefetch
// (without `global` set) as per-consumer (for consumers following),
// and prefetch with `global` set as per-channel.
Channel.prototype.prefetch = Channel.prototype.qos

// Confirm channel. This is a channel with confirms 'switched on',
// meaning sent messages will provoke a responding 'ack' or 'nack'
// from the server. The upshot of this is that `publish` and
// `sendToQueue` both take a callback, which will be called either
// with `null` as its argument to signify 'ack', or an exception as
// its argument to signify 'nack'.

class ConfirmChannel extends Channel {
  publish(exchange, routingKey, content, options, cb) {
    this.pushConfirmCallback(cb);
    return Channel.prototype.publish.call(this, exchange, routingKey, content, options);
  }

  sendToQueue(queue, content, options, cb) {
    return this.publish('', queue, content, options, cb);
  }

  waitForConfirms() {
    const awaiting = [];
    const unconfirmed = this.unconfirmed;
    unconfirmed.forEach((val, index) => {
      if (val !== null) {
        const confirmed = new Promise((resolve, reject) => {
          unconfirmed[index] = err => {
            if (val) val(err);
            if (err === null) resolve();
            else reject(err);
          };
        });
        awaiting.push(confirmed);
      }
    });
    // Channel closed
    if (!this.pending) {
      var cb;
      while (cb = this.unconfirmed.shift()) {
        if (cb) cb(new Error('channel closed'));
      }
    }
    return Promise.all(awaiting);
  }
}

__webpack_unused_export__ = ConfirmChannel;
__webpack_unused_export__ = Channel;
module.exports.K2 = ChannelModel;


/***/ }),

/***/ 6830:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
//
//
//

/*

The AMQP 0-9-1 is a mess when it comes to the types that can be
encoded on the wire.

There are four encoding schemes, and three overlapping sets of types:
frames, methods, (field-)tables, and properties.

Each *frame type* has a set layout in which values of given types are
concatenated along with sections of "raw binary" data.

In frames there are `shortstr`s, that is length-prefixed strings of
UTF8 chars, 8 bit unsigned integers (called `octet`), unsigned 16 bit
integers (called `short` or `short-uint`), unsigned 32 bit integers
(called `long` or `long-uint`), unsigned 64 bit integers (called
`longlong` or `longlong-uint`), and flags (called `bit`).

Methods are encoded as a frame giving a method ID and a sequence of
arguments of known types. The encoded method argument values are
concatenated (with some fun complications around "packing" consecutive
bit values into bytes).

Along with the types given in frames, method arguments may be long
byte strings (`longstr`, not required to be UTF8) or 64 bit unsigned
integers to be interpreted as timestamps (yeah I don't know why
either), or arbitrary sets of key-value pairs (called `field-table`).

Inside a field table the keys are `shortstr` and the values are
prefixed with a byte tag giving the type. The types are any of the
above except for bits (which are replaced by byte-wide `bool`), along
with a NULL value `void`, a special fixed-precision number encoding
(`decimal`), IEEE754 `float`s and `double`s, signed integers,
`field-array` (a sequence of tagged values), and nested field-tables.

RabbitMQ and QPid use a subset of the field-table types, and different
value tags, established before the AMQP 0-9-1 specification was
published. So far as I know, no-one uses the types and tags as
published. http://www.rabbitmq.com/amqp-0-9-1-errata.html gives the
list of field-table types.

Lastly, there are (sets of) properties, only one of which is given in
AMQP 0-9-1: `BasicProperties`. These are almost the same as methods,
except that they appear in content header frames, which include a
content size, and they carry a set of flags indicating which
properties are present. This scheme can save ones of bytes per message
(messages which take a minimum of three frames each to send).

*/



var ints = __nccwpck_require__(7660);

// JavaScript uses only doubles so what I'm testing for is whether
// it's *better* to encode a number as a float or double. This really
// just amounts to testing whether there's a fractional part to the
// number, except that see below. NB I don't use bitwise operations to
// do this 'efficiently' -- it would mask the number to 32 bits.
//
// At 2^50, doubles don't have sufficient precision to distinguish
// between floating point and integer numbers (`Math.pow(2, 50) + 0.1
// === Math.pow(2, 50)` (and, above 2^53, doubles cannot represent all
// integers (`Math.pow(2, 53) + 1 === Math.pow(2, 53)`)). Hence
// anything with a magnitude at or above 2^50 may as well be encoded
// as a 64-bit integer. Except that only signed integers are supported
// by RabbitMQ, so anything above 2^63 - 1 must be a double.
function isFloatingPoint(n) {
    return n >= 0x8000000000000000 ||
        (Math.abs(n) < 0x4000000000000
         && Math.floor(n) !== n);
}

function encodeTable(buffer, val, offset) {
    var start = offset;
    offset += 4; // leave room for the table length
    for (var key in val) {
        if (val[key] !== undefined) {
          var len = Buffer.byteLength(key);
          buffer.writeUInt8(len, offset); offset++;
          buffer.write(key, offset, 'utf8'); offset += len;
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
    for (var i=0, num=val.length; i < num; i++) {
        offset += encodeFieldValue(buffer, val[i], offset);
    }
    var size = offset - start;
    buffer.writeUInt32BE(size - 4, start);
    return size;
}

function encodeFieldValue(buffer, value, offset) {
    var start = offset;
    var type = typeof value, val = value;
    // A trapdoor for specifying a type, e.g., timestamp
    if (value && type === 'object' && value.hasOwnProperty('!')) {
        val = value.value;
        type = value['!'];
    }

    // If it's a JS number, we'll have to guess what type to encode it
    // as.
    if (type == 'number') {
        // Making assumptions about the kind of number (floating point
        // v integer, signed, unsigned, size) desired is dangerous in
        // general; however, in practice RabbitMQ uses only
        // longstrings and unsigned integers in its arguments, and
        // other clients generally conflate number types anyway. So
        // the only distinction we care about is floating point vs
        // integers, preferring integers since those can be promoted
        // if necessary. If floating point is required, we may as well
        // use double precision.
        if (isFloatingPoint(val)) {
            type = 'double';
        }
        else { // only signed values are used in tables by
               // RabbitMQ. It *used* to (< v3.3.0) treat the byte 'b'
               // type as unsigned, but most clients (and the spec)
               // think it's signed, and now RabbitMQ does too.
            if (val < 128 && val >= -128) {
                type = 'byte';
            }
            else if (val >= -0x8000 && val < 0x8000) {
                type = 'short'
            }
            else if (val >= -0x80000000 && val < 0x80000000) {
                type = 'int';
            }
            else {
                type = 'long';
            }
        }
    }

    function tag(t) { buffer.write(t, offset); offset++; }

    switch (type) {
    case 'string': // no shortstr in field tables
        var len = Buffer.byteLength(val, 'utf8');
        tag('S');
        buffer.writeUInt32BE(len, offset); offset += 4;
        buffer.write(val, offset, 'utf8'); offset += len;
        break;
    case 'object':
        if (val === null) {
            tag('V');
        }
        else if (Array.isArray(val)) {
            tag('A');
            offset += encodeArray(buffer, val, offset);
        }
        else if (Buffer.isBuffer(val)) {
            tag('x');
            buffer.writeUInt32BE(val.length, offset); offset += 4;
            val.copy(buffer, offset); offset += val.length;
        }
        else {
            tag('F');
            offset += encodeTable(buffer, val, offset);
        }
        break;
    case 'boolean':
        tag('t');
        buffer.writeUInt8((val) ? 1 : 0, offset); offset++;
        break;
    // These are the types that are either guessed above, or
    // explicitly given using the {'!': type} notation.
    case 'double':
    case 'float64':
        tag('d');
        buffer.writeDoubleBE(val, offset);
        offset += 8;
        break;
    case 'byte':
    case 'int8':
        tag('b');
        buffer.writeInt8(val, offset); offset++;
        break;
    case 'short':
    case 'int16':
        tag('s');
        buffer.writeInt16BE(val, offset); offset += 2;
        break;
    case 'int':
    case 'int32':
        tag('I');
        buffer.writeInt32BE(val, offset); offset += 4;
        break;
    case 'long':
    case 'int64':
        tag('l');
        ints.writeInt64BE(buffer, val, offset); offset += 8;
        break;

    // Now for exotic types, those can _only_ be denoted by using
    // `{'!': type, value: val}
    case 'timestamp':
        tag('T');
        ints.writeUInt64BE(buffer, val, offset); offset += 8;
        break;
    case 'float':
        tag('f');
        buffer.writeFloatBE(val, offset); offset += 4;
        break;
    case 'decimal':
        tag('D');
        if (val.hasOwnProperty('places') && val.hasOwnProperty('digits')
            && val.places >= 0 && val.places < 256) {
            buffer[offset] = val.places; offset++;
            buffer.writeUInt32BE(val.digits, offset); offset += 4;
        }
        else throw new TypeError(
            "Decimal value must be {'places': 0..255, 'digits': uint32}, " +
                "got " + JSON.stringify(val));
        break;
    default:
        throw new TypeError('Unknown type to encode: ' + type);
    }
    return offset - start;
}

// Assume we're given a slice of the buffer that contains just the
// fields.
function decodeFields(slice) {
    var fields = {}, offset = 0, size = slice.length;
    var len, key, val;

    function decodeFieldValue() {
        var tag = String.fromCharCode(slice[offset]); offset++;
        switch (tag) {
        case 'b':
            val = slice.readInt8(offset); offset++;
            break;
        case 'S':
            len = slice.readUInt32BE(offset); offset += 4;
            val = slice.toString('utf8', offset, offset + len);
            offset += len;
            break;
        case 'I':
            val = slice.readInt32BE(offset); offset += 4;
            break;
        case 'D': // only positive decimals, apparently.
            var places = slice[offset]; offset++;
            var digits = slice.readUInt32BE(offset); offset += 4;
            val = {'!': 'decimal', value: {places: places, digits: digits}};
            break;
        case 'T':
            val = ints.readUInt64BE(slice, offset); offset += 8;
            val = {'!': 'timestamp', value: val};
            break;
        case 'F':
            len = slice.readUInt32BE(offset); offset += 4;
            val = decodeFields(slice.slice(offset, offset + len));
            offset += len;
            break;
        case 'A':
            len = slice.readUInt32BE(offset); offset += 4;
            decodeArray(offset + len);
            // NB decodeArray will itself update offset and val
            break;
        case 'd':
            val = slice.readDoubleBE(offset); offset += 8;
            break;
        case 'f':
            val = slice.readFloatBE(offset); offset += 4;
            break;
        case 'l':
            val = ints.readInt64BE(slice, offset); offset += 8;
            break;
        case 's':
            val = slice.readInt16BE(offset); offset += 2;
            break;
        case 't':
            val = slice[offset] != 0; offset++;
            break;
        case 'V':
            val = null;
            break;
        case 'x':
            len = slice.readUInt32BE(offset); offset += 4;
            val = slice.slice(offset, offset + len);
            offset += len;
            break;
        default:
            throw new TypeError('Unexpected type tag "' + tag +'"');
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
        len = slice.readUInt8(offset); offset++;
        key = slice.toString('utf8', offset, offset + len);
        offset += len;
        decodeFieldValue();
        fields[key] = val;
    }
    return fields;
}

module.exports.encodeTable = encodeTable;
module.exports.decodeFields = decodeFields;


/***/ }),

/***/ 4909:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
var __webpack_unused_export__;
//
//
//

// General-purpose API for glueing everything together.



var URL = __nccwpck_require__(6521);
var QS = __nccwpck_require__(3477);
var Connection = (__nccwpck_require__(1134)/* .Connection */ .e);
var fmt = (__nccwpck_require__(3837).format);
var credentials = __nccwpck_require__(9154);

function copyInto(obj, target) {
  var keys = Object.keys(obj);
  var i = keys.length;
  while (i--) {
    var k = keys[i];
    target[k] = obj[k];
  }
  return target;
}

// Adapted from util._extend, which is too fringe to use.
function clone(obj) {
  return copyInto(obj, {});
}

var CLIENT_PROPERTIES = {
  "product": "amqplib",
  "version": (__nccwpck_require__(3069)/* .version */ .i8),
  "platform": fmt('Node.JS %s', process.version),
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

// Construct the main frames used in the opening handshake
function openFrames(vhost, query, credentials, extraClientProperties) {
  if (!vhost)
    vhost = '/';
  else
    vhost = QS.unescape(vhost);

  var query = query || {};

  function intOrDefault(val, def) {
    return (val === undefined) ? def : parseInt(val);
  }

  var clientProperties = Object.create(CLIENT_PROPERTIES);

  return {
    // start-ok
    'clientProperties': copyInto(extraClientProperties, clientProperties),
    'mechanism': credentials.mechanism,
    'response': credentials.response(),
    'locale': query.locale || 'en_US',

    // tune-ok
    'channelMax': intOrDefault(query.channelMax, 0),
    'frameMax': intOrDefault(query.frameMax, 0x1000),
    'heartbeat': intOrDefault(query.heartbeat, 0),

    // open
    'virtualHost': vhost,
    'capabilities': '',
    'insist': 0
  };
}

// Decide on credentials based on what we're supplied.
function credentialsFromUrl(parts) {
  var user = 'guest', passwd = 'guest';
  if (parts.username != '' || parts.password != '') {
    user = (parts.username) ? unescape(parts.username) : '';
    passwd = (parts.password) ? unescape(parts.password) : '';
  }
  return credentials.plain(user, passwd);
}

function connect(url, socketOptions, openCallback) {
  // tls.connect uses `util._extend()` on the options given it, which
  // copies only properties mentioned in `Object.keys()`, when
  // processing the options. So I have to make copies too, rather
  // than using `Object.create()`.
  var sockopts = clone(socketOptions || {});
  url = url || 'amqp://localhost';

  var noDelay = !!sockopts.noDelay;
  var timeout = sockopts.timeout;
  var keepAlive = !!sockopts.keepAlive;
  // 0 is default for node
  var keepAliveDelay = sockopts.keepAliveDelay || 0;

  var extraClientProperties = sockopts.clientProperties || {};

  var protocol, fields;
  if (typeof url === 'object') {
    protocol = (url.protocol || 'amqp') + ':';
    sockopts.host = url.hostname;
    sockopts.servername = sockopts.servername || url.hostname;
    sockopts.port = url.port || ((protocol === 'amqp:') ? 5672 : 5671);

    var user, pass;
    // Only default if both are missing, to have the same behaviour as
    // the stringly URL.
    if (url.username == undefined && url.password == undefined) {
      user = 'guest'; pass = 'guest';
    } else {
      user = url.username || '';
      pass = url.password || '';
    }

    var config = {
      locale: url.locale,
      channelMax: url.channelMax,
      frameMax: url.frameMax,
      heartbeat: url.heartbeat,
    };

    fields = openFrames(url.vhost, config, sockopts.credentials || credentials.plain(user, pass), extraClientProperties);
  } else {
    var parts = URL(url, true); // yes, parse the query string
    protocol = parts.protocol;
    sockopts.host = parts.hostname;
    sockopts.servername = sockopts.servername || parts.hostname;
    sockopts.port = parseInt(parts.port) || ((protocol === 'amqp:') ? 5672 : 5671);
    var vhost = parts.pathname ? parts.pathname.substr(1) : null;
    fields = openFrames(vhost, parts.query, sockopts.credentials || credentialsFromUrl(parts), extraClientProperties);
  }

  var sockok = false;
  var sock;

  function onConnect() {
    sockok = true;
    sock.setNoDelay(noDelay);
    if (keepAlive) sock.setKeepAlive(keepAlive, keepAliveDelay);

    var c = new Connection(sock);
    c.open(fields, function(err, ok) {
      // disable timeout once the connection is open, we don't want
      // it fouling things
      if (timeout) sock.setTimeout(0);
      if (err === null) {
        openCallback(null, c);
      } else {
        // The connection isn't closed by the server on e.g. wrong password
        sock.end();
        sock.destroy();
        openCallback(err);
      }
    });
  }

  if (protocol === 'amqp:') {
    sock = (__nccwpck_require__(1808).connect)(sockopts, onConnect);
  }
  else if (protocol === 'amqps:') {
    sock = (__nccwpck_require__(4404).connect)(sockopts, onConnect);
  }
  else {
    throw new Error("Expected amqp: or amqps: as the protocol; got " + protocol);
  }

  if (timeout) {
    sock.setTimeout(timeout, function() {
      sock.end();
      sock.destroy();
      openCallback(new Error('connect ETIMEDOUT'));
    });
  }

  sock.once('error', function(err) {
    if (!sockok) openCallback(err);
  });

}

module.exports.$ = connect;
__webpack_unused_export__ = credentialsFromUrl;


/***/ }),

/***/ 1134:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
var __webpack_unused_export__;
//
//
//



var defs = __nccwpck_require__(7818);
var constants = defs.constants;
var frame = __nccwpck_require__(8028);
var HEARTBEAT = frame.HEARTBEAT;
var Mux = (__nccwpck_require__(3708)/* .Mux */ .v);

var Duplex =
  (__nccwpck_require__(2781).Duplex) ||
  __nccwpck_require__(7683);
var EventEmitter = (__nccwpck_require__(2361).EventEmitter);
var Heart = (__nccwpck_require__(4636)/* .Heart */ .X);

var methodName = (__nccwpck_require__(6629).methodName);
var closeMsg = (__nccwpck_require__(6629).closeMessage);
var inspect = (__nccwpck_require__(6629).inspect);

var BitSet = (__nccwpck_require__(3393)/* .BitSet */ .q);
var inherits = (__nccwpck_require__(3837).inherits);
var fmt = (__nccwpck_require__(3837).format);
var PassThrough = (__nccwpck_require__(2781).PassThrough) ||
  __nccwpck_require__(6450);
var IllegalOperationError = (__nccwpck_require__(5785).IllegalOperationError);
var stackCapture = (__nccwpck_require__(5785)/* .stackCapture */ .t);

// High-water mark for channel write buffers, in 'objects' (which are
// encoded frames as buffers).
var DEFAULT_WRITE_HWM = 1024;
// If all the frames of a message (method, properties, content) total
// to less than this, copy them into a single buffer and write it all
// at once. Note that this is less than the minimum frame size: if it
// was greater, we might have to fragment the content.
var SINGLE_CHUNK_THRESHOLD = 2048;

function Connection(underlying) {
  EventEmitter.call( this );
  var stream = this.stream = wrapStream(underlying);
  this.muxer = new Mux(stream);

  // frames
  this.rest = Buffer.alloc(0);
  this.frameMax = constants.FRAME_MIN_SIZE;
  this.sentSinceLastCheck = false;
  this.recvSinceLastCheck = false;

  this.expectSocketClose = false;
  this.freeChannels = new BitSet();
  this.channels = [{channel: {accept: channel0(this)},
                    buffer: underlying}];
}
inherits(Connection, EventEmitter);

var C = Connection.prototype;

// Usual frame accept mode
function mainAccept(frame) {
  var rec = this.channels[frame.channel];
  if (rec) { return rec.channel.accept(frame); }
  // NB CHANNEL_ERROR may not be right, but I don't know what is ..
  else
    this.closeWithError(
      fmt('Frame on unknown channel %d', frame.channel),
      constants.CHANNEL_ERROR,
      new Error(fmt("Frame on unknown channel: %s",
                    inspect(frame, false))));
}

// Handle anything that comes through on channel 0, that's the
// connection control channel. This is only used once mainAccept is
// installed as the frame handler, after the opening handshake.
function channel0(connection) {
  return function(f) {
    // Once we get a 'close', we know 1. we'll get no more frames, and
    // 2. anything we send except close, or close-ok, will be
    // ignored. If we already sent 'close', this won't be invoked since
    // we're already in closing mode; if we didn't well we're not going
    // to send it now are we.
    if (f === HEARTBEAT); // ignore; it's already counted as activity
                          // on the socket, which is its purpose
    else if (f.id === defs.ConnectionClose) {
      // Oh. OK. I guess we're done here then.
      connection.sendMethod(0, defs.ConnectionCloseOk, {});
      var emsg = fmt('Connection closed: %s', closeMsg(f));
      var s = stackCapture(emsg);
      var e = new Error(emsg);
      e.code = f.fields.replyCode;
      if (isFatalError(e)) {
        connection.emit('error', e);
      }
      connection.toClosed(s, e);
    }
    else if (f.id === defs.ConnectionBlocked) {
      connection.emit('blocked', f.fields.reason);
    }
    else if (f.id === defs.ConnectionUnblocked) {
      connection.emit('unblocked');
    }
    else {
      connection.closeWithError(
        fmt("Unexpected frame on channel 0"),
        constants.UNEXPECTED_FRAME,
        new Error(fmt("Unexpected frame on channel 0: %s",
                      inspect(f, false))));
    }
  };
}

// This changed between versions, as did the codec, methods, etc. AMQP
// 0-9-1 is fairly similar to 0.8, but better, and nothing implements
// 0.8 that doesn't implement 0-9-1. In other words, it doesn't make
// much sense to generalise here.
C.sendProtocolHeader = function() {
  this.sendBytes(frame.PROTOCOL_HEADER);
};

/*
  The frighteningly complicated opening protocol (spec section 2.2.4):

     Client -> Server

       protocol header ->
         <- start
       start-ok ->
     .. next two zero or more times ..
         <- secure
       secure-ok ->
         <- tune
       tune-ok ->
       open ->
         <- open-ok

If I'm only supporting SASL's PLAIN mechanism (which I am for the time
being), it gets a bit easier since the server won't in general send
back a `secure`, it'll just send `tune` after the `start-ok`.
(SASL PLAIN: http://tools.ietf.org/html/rfc4616)

*/

C.open = function(allFields, openCallback0) {
  var self = this;
  var openCallback = openCallback0 || function() {};

  // This is where we'll put our negotiated values
  var tunedOptions = Object.create(allFields);

  function wait(k) {
    self.step(function(err, frame) {
      if (err !== null) bail(err);
      else if (frame.channel !== 0) {
        bail(new Error(
          fmt("Frame on channel != 0 during handshake: %s",
              inspect(frame, false))));
      }
      else k(frame);
    });
  }

  function expect(Method, k) {
    wait(function(frame) {
      if (frame.id === Method) k(frame);
      else {
        bail(new Error(
          fmt("Expected %s; got %s",
              methodName(Method), inspect(frame, false))));
      }
    });
  }

  function bail(err) {
    openCallback(err);
  }

  function send(Method) {
    // This can throw an exception if there's some problem with the
    // options; e.g., something is a string instead of a number.
    self.sendMethod(0, Method, tunedOptions);
  }

  function negotiate(server, desired) {
    // We get sent values for channelMax, frameMax and heartbeat,
    // which we may accept or lower (subject to a minimum for
    // frameMax, but we'll leave that to the server to enforce). In
    // all cases, `0` really means "no limit", or rather the highest
    // value in the encoding, e.g., unsigned short for channelMax.
    if (server === 0 || desired === 0) {
      // i.e., whichever places a limit, if either
      return Math.max(server, desired);
    }
    else {
      return Math.min(server, desired);
    }
  }

  function onStart(start) {
    var mechanisms = start.fields.mechanisms.toString().split(' ');
    if (mechanisms.indexOf(allFields.mechanism) < 0) {
      bail(new Error(fmt('SASL mechanism %s is not provided by the server',
                         allFields.mechanism)));
      return;
    }
    self.serverProperties = start.fields.serverProperties;
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
        "Wasn't expecting to have to go through secure"));
      break;
    case defs.ConnectionClose:
      bail(new Error(fmt("Handshake terminated by server: %s",
                         closeMsg(reply))));
      break;
    case defs.ConnectionTune:
      var fields = reply.fields;
      tunedOptions.frameMax =
        negotiate(fields.frameMax, allFields.frameMax);
      tunedOptions.channelMax =
        negotiate(fields.channelMax, allFields.channelMax);
      tunedOptions.heartbeat =
        negotiate(fields.heartbeat, allFields.heartbeat);
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
        fmt("Expected connection.secure, connection.close, " +
            "or connection.tune during handshake; got %s",
            inspect(reply, false))));
      break;
    }
  }

  function onOpenOk(openOk) {
    // Impose the maximum of the encoded value, if the negotiated
    // value is zero, meaning "no, no limits"
    self.channelMax = tunedOptions.channelMax || 0xffff;
    self.frameMax = tunedOptions.frameMax || 0xffffffff;
    // 0 means "no heartbeat", rather than "maximum period of
    // heartbeating"
    self.heartbeat = tunedOptions.heartbeat;
    self.heartbeater = self.startHeartbeater();
    self.accept = mainAccept;
    succeed(openOk);
  }

  // If the server closes the connection, it's probably because of
  // something we did
  function endWhileOpening(err) {
    bail(err || new Error('Socket closed abruptly ' +
                          'during opening handshake'));
  }

  this.stream.on('end', endWhileOpening);
  this.stream.on('error', endWhileOpening);

  function succeed(ok) {
    self.stream.removeListener('end', endWhileOpening);
    self.stream.removeListener('error', endWhileOpening);
    self.stream.on('error', self.onSocketError.bind(self));
    self.stream.on('end', self.onSocketError.bind(
      self, new Error('Unexpected close')));
    self.on('frameError', self.onSocketError.bind(self));
    self.acceptLoop();
    openCallback(null, ok);
  }

  // Now kick off the handshake by prompting the server
  this.sendProtocolHeader();
  expect(defs.ConnectionStart, onStart);
};

// Closing things: AMQP has a closing handshake that applies to
// closing both connects and channels. As the initiating party, I send
// Close, then ignore all frames until I see either CloseOK --
// which signifies that the other party has seen the Close and shut
// the connection or channel down, so it's fine to free resources; or
// Close, which means the other party also wanted to close the
// whatever, and I should send CloseOk so it can free resources,
// then go back to waiting for the CloseOk. If I receive a Close
// out of the blue, I should throw away any unsent frames (they will
// be ignored anyway) and send CloseOk, then clean up resources. In
// general, Close out of the blue signals an error (or a forced
// closure, which may as well be an error).
//
//  RUNNING [1] --- send Close ---> Closing [2] ---> recv Close --+
//     |                               |                         [3]
//     |                               +------ send CloseOk ------+
//  recv Close                   recv CloseOk
//     |                               |
//     V                               V
//  Ended [4] ---- send CloseOk ---> Closed [5]
//
// [1] All frames accepted; getting a Close frame from the server
// moves to Ended; client may initiate a close by sending Close
// itself.
// [2] Client has initiated a close; only CloseOk or (simulataneously
// sent) Close is accepted.
// [3] Simultaneous close
// [4] Server won't send any more frames; accept no more frames, send
// CloseOk.
// [5] Fully closed, client will send no more, server will send no
// more. Signal 'close' or 'error'.
//
// There are two signalling mechanisms used in the API. The first is
// that calling `close` will return a promise, that will either
// resolve once the connection or channel is cleanly shut down, or
// will reject if the shutdown times out.
//
// The second is the 'close' and 'error' events. These are
// emitted as above. The events will fire *before* promises are
// resolved.

// Close the connection without even giving a reason. Typical.
C.close = function(closeCallback) {
  var k = closeCallback && function() { closeCallback(null); };
  this.closeBecause("Cheers, thanks", constants.REPLY_SUCCESS, k);
};

// Close with a reason and a 'code'. I'm pretty sure RabbitMQ totally
// ignores these; maybe it logs them. The continuation will be invoked
// when the CloseOk has been received, and before the 'close' event.
C.closeBecause = function(reason, code, k) {
  this.sendMethod(0, defs.ConnectionClose, {
    replyText: reason,
    replyCode: code,
    methodId: 0, classId: 0
  });
  var s = stackCapture('closeBecause called: ' + reason);
  this.toClosing(s, k);
};

C.closeWithError = function(reason, code, error) {
  this.emit('error', error);
  this.closeBecause(reason, code);
};

C.onSocketError = function(err) {
  if (!this.expectSocketClose) {
    // forestall any more calls to onSocketError, since we're signed
    // up for `'error'` *and* `'end'`
    this.expectSocketClose = true;
    this.emit('error', err);
    var s = stackCapture('Socket error');
    this.toClosed(s, err);
  }
};

function invalidOp(msg, stack) {
  return function() {
    throw new IllegalOperationError(msg, stack);
  };
}

function invalidateSend(conn, msg, stack) {
  conn.sendMethod = conn.sendContent = conn.sendMessage =
    invalidOp(msg, stack);
}

// A close has been initiated. Repeat: a close has been initiated.
// This means we should not send more frames, anyway they will be
// ignored. We also have to shut down all the channels.
C.toClosing = function(capturedStack, k) {
  var send = this.sendMethod.bind(this);

  this.accept = function(f) {
    if (f.id === defs.ConnectionCloseOk) {
      if (k) k();
      var s = stackCapture('ConnectionCloseOk received');
      this.toClosed(s, undefined);
    }
    else if (f.id === defs.ConnectionClose) {
      send(0, defs.ConnectionCloseOk, {});
    }
    // else ignore frame
  };
  invalidateSend(this, 'Connection closing', capturedStack);
};

C._closeChannels = function(capturedStack) {
  for (var i = 1; i < this.channels.length; i++) {
    var ch = this.channels[i];
    if (ch !== null) {
      ch.channel.toClosed(capturedStack); // %%% or with an error? not clear
    }
  }
};

// A close has been confirmed. Cease all communication.
C.toClosed = function(capturedStack, maybeErr) {
  this._closeChannels(capturedStack);
  var info = fmt('Connection closed (%s)',
                 (maybeErr) ? maybeErr.toString() : 'by client');
  // Tidy up, invalidate enverything, dynamite the bridges.
  invalidateSend(this, info, capturedStack);
  this.accept = invalidOp(info, capturedStack);
  this.close = function(cb) {
    cb && cb(new IllegalOperationError(info, capturedStack));
  };
  if (this.heartbeater) this.heartbeater.clear();
  // This is certainly true now, if it wasn't before
  this.expectSocketClose = true;
  this.stream.end();
  this.emit('close', maybeErr);
};

// ===

C.startHeartbeater = function() {
  if (this.heartbeat === 0) return null;
  else {
    var self = this;
    var hb = new Heart(this.heartbeat,
                       this.checkSend.bind(this),
                       this.checkRecv.bind(this));
    hb.on('timeout', function() {
      var hberr = new Error("Heartbeat timeout");
      self.emit('error', hberr);
      var s = stackCapture('Heartbeat timeout');
      self.toClosed(s, hberr);
    });
    hb.on('beat', function() {
      self.sendHeartbeat();
    });
    return hb;
  }
};

// I use an array to keep track of the channels, rather than an
// object. The channel identifiers are numbers, and allocated by the
// connection. If I try to allocate low numbers when they are
// available (which I do, by looking from the start of the bitset),
// this ought to keep the array small, and out of 'sparse array
// storage'. I also set entries to null, rather than deleting them, in
// the expectation that the next channel allocation will fill the slot
// again rather than growing the array. See
// http://www.html5rocks.com/en/tutorials/speed/v8/
C.freshChannel = function(channel, options) {
  var next = this.freeChannels.nextClearBit(1);
  if (next < 0 || next > this.channelMax)
    throw new Error("No channels left to allocate");
  this.freeChannels.set(next);

  var hwm = (options && options.highWaterMark) || DEFAULT_WRITE_HWM;
  var writeBuffer = new PassThrough({
    objectMode: true, highWaterMark: hwm
  });
  this.channels[next] = {channel: channel, buffer: writeBuffer};
  writeBuffer.on('drain', function() {
    channel.onBufferDrain();
  });
  this.muxer.pipeFrom(writeBuffer);
  return next;
};

C.releaseChannel = function(channel) {
  this.freeChannels.clear(channel);
  var buffer = this.channels[channel].buffer;
  buffer.end(); // will also cause it to be unpiped
  this.channels[channel] = null;
};

C.acceptLoop = function() {
  var self = this;

  function go() {
    try {
      var f; while (f = self.recvFrame()) self.accept(f);
    }
    catch (e) {
      self.emit('frameError', e);
    }
  }
  self.stream.on('readable', go);
  go();
};

C.step = function(cb) {
  var self = this;
  function recv() {
    var f;
    try {
      f = self.recvFrame();
    }
    catch (e) {
      cb(e, null);
      return;
    }
    if (f) cb(null, f);
    else self.stream.once('readable', recv);
  }
  recv();
};

C.checkSend = function() {
  var check = this.sentSinceLastCheck;
  this.sentSinceLastCheck = false;
  return check;
}

C.checkRecv = function() {
  var check = this.recvSinceLastCheck;
  this.recvSinceLastCheck = false;
  return check;
}

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
  var frame = encodeMethod(Method, channel, fields);
  this.sentSinceLastCheck = true;
  var buffer = this.channels[channel].buffer;
  return buffer.write(frame);
};

C.sendMessage = function(channel,
                         Method, fields,
                         Properties, props,
                         content) {
  if (!Buffer.isBuffer(content))
    throw new TypeError('content is not a buffer');

  var mframe = encodeMethod(Method, channel, fields);
  var pframe = encodeProperties(Properties, channel,
                                content.length, props);
  var buffer = this.channels[channel].buffer;
  this.sentSinceLastCheck = true;

  var methodHeaderLen = mframe.length + pframe.length;
  var bodyLen = (content.length > 0) ?
    content.length + FRAME_OVERHEAD : 0;
  var allLen = methodHeaderLen + bodyLen;

  if (allLen < SINGLE_CHUNK_THRESHOLD) {
    // Use `allocUnsafe` to avoid excessive allocations and CPU usage
    // from zeroing. The returned Buffer is not zeroed and so must be
    // completely filled to be used safely.
    // See https://github.com/amqp-node/amqplib/pull/695
    var all = Buffer.allocUnsafe(allLen);
    var offset = mframe.copy(all, 0);
    offset += pframe.copy(all, offset);

    if (bodyLen > 0)
      makeBodyFrame(channel, content).copy(all, offset);
    return buffer.write(all);
  }
  else {
    if (methodHeaderLen < SINGLE_CHUNK_THRESHOLD) {
      // Use `allocUnsafe` to avoid excessive allocations and CPU usage
      // from zeroing. The returned Buffer is not zeroed and so must be
      // completely filled to be used safely.
      // See https://github.com/amqp-node/amqplib/pull/695
      var both = Buffer.allocUnsafe(methodHeaderLen);
      var offset = mframe.copy(both, 0);
      pframe.copy(both, offset);
      buffer.write(both);
    }
    else {
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
    var slice = (end > body.length) ? body.slice(offset) : body.slice(offset, end);
    var bodyFrame = makeBodyFrame(channel, slice);
    writeResult = buffer.write(bodyFrame);
  }
  this.sentSinceLastCheck = true;
  return writeResult;
};

var parseFrame = frame.parseFrame;
var decodeFrame = frame.decodeFrame;

C.recvFrame = function() {
  // %%% identifying invariants might help here?
  var frame = parseFrame(this.rest, this.frameMax);

  if (!frame) {
    var incoming = this.stream.read();
    if (incoming === null) {
      return false;
    }
    else {
      this.recvSinceLastCheck = true;
      this.rest = Buffer.concat([this.rest, incoming]);
      return this.recvFrame();
    }
  }
  else {
    this.rest = frame.rest;
    return decodeFrame(frame);
  }
};

function wrapStream(s) {
  if (s instanceof Duplex) return s;
  else {
    var ws = new Duplex();
    ws.wrap(s); //wraps the readable side of things
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

module.exports.e = Connection;
__webpack_unused_export__ = isFatalError;


/***/ }),

/***/ 9154:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

//
//
//

// Different kind of credentials that can be supplied when opening a
// connection, corresponding to SASL mechanisms There's only two
// useful mechanisms that RabbitMQ implements:
//  * PLAIN (send username and password in the plain)
//  * EXTERNAL (assume the server will figure out who you are from
//    context, i.e., your SSL certificate)
var codec = __nccwpck_require__(6830)

module.exports.plain = function(user, passwd) {
  return {
    mechanism: 'PLAIN',
    response: function() {
      return Buffer.from(['', user, passwd].join(String.fromCharCode(0)))
    },
    username: user,
    password: passwd
  }
}

module.exports.amqplain = function(user, passwd) {
  return {
    mechanism: 'AMQPLAIN',
    response: function() {
      const buffer = Buffer.alloc(16384);
      const size = codec.encodeTable(buffer, { LOGIN: user, PASSWORD: passwd}, 0);
      return buffer.slice(4, size);
    },
    username: user,
    password: passwd
  }
}

module.exports.external = function() {
  return {
    mechanism: 'EXTERNAL',
    response: function() { return Buffer.from(''); }
  }
}


/***/ }),

/***/ 7818:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/** @preserve This file is generated by the script
 * ../bin/generate-defs.js, which is not in general included in a
 * distribution, but is available in the source repository e.g. at
 * https://github.com/squaremo/amqp.node/
 */


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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'serverProperties'");
  if ("object" != typeof val) throw new TypeError("Field 'serverProperties' is the wrong type; must be an object");
  len = encodeTable(SCRATCH, val, scratchOffset);
  var serverProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
  scratchOffset += len;
  varyingSize += serverProperties_encoded.length;
  val = fields.mechanisms;
  if (void 0 === val) val = Buffer.from("PLAIN"); else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'mechanisms' is the wrong type; must be a Buffer");
  varyingSize += val.length;
  val = fields.locales;
  if (void 0 === val) val = Buffer.from("en_US"); else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'locales' is the wrong type; must be a Buffer");
  varyingSize += val.length;
  var buffer = Buffer.alloc(22 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(655370, 7);
  offset = 11;
  val = fields.versionMajor;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'versionMajor' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt8(val, offset);
  offset++;
  val = fields.versionMinor;
  if (void 0 === val) val = 9; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'versionMinor' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'clientProperties'");
  if ("object" != typeof val) throw new TypeError("Field 'clientProperties' is the wrong type; must be an object");
  len = encodeTable(SCRATCH, val, scratchOffset);
  var clientProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
  scratchOffset += len;
  varyingSize += clientProperties_encoded.length;
  val = fields.mechanism;
  if (void 0 === val) val = "PLAIN"; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'mechanism' is the wrong type; must be a string (up to 255 chars)");
  var mechanism_len = Buffer.byteLength(val, "utf8");
  varyingSize += mechanism_len;
  val = fields.response;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'response'");
  if (!Buffer.isBuffer(val)) throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
  varyingSize += val.length;
  val = fields.locale;
  if (void 0 === val) val = "en_US"; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'locale' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'challenge'");
  if (!Buffer.isBuffer(val)) throw new TypeError("Field 'challenge' is the wrong type; must be a Buffer");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'response'");
  if (!Buffer.isBuffer(val)) throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.frameMax;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt32BE(val, offset);
  offset += 4;
  val = fields.heartbeat;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.frameMax;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt32BE(val, offset);
  offset += 4;
  val = fields.heartbeat;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = "/"; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'virtualHost' is the wrong type; must be a string (up to 255 chars)");
  var virtualHost_len = Buffer.byteLength(val, "utf8");
  varyingSize += virtualHost_len;
  val = fields.capabilities;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'capabilities' is the wrong type; must be a string (up to 255 chars)");
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
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'knownHosts' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
  var replyText_len = Buffer.byteLength(val, "utf8");
  varyingSize += replyText_len;
  var buffer = Buffer.alloc(19 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(655410, 7);
  offset = 11;
  val = fields.replyCode;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.replyText;
  void 0 === val && (val = "");
  buffer[offset] = replyText_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += replyText_len;
  val = fields.classId;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'classId'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.methodId;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'methodId'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'outOfBand' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) val = Buffer.from(""); else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'channelId' is the wrong type; must be a Buffer");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'active'");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'active'");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
  var replyText_len = Buffer.byteLength(val, "utf8");
  varyingSize += replyText_len;
  var buffer = Buffer.alloc(19 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(1310760, 7);
  offset = 11;
  val = fields.replyCode;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.replyText;
  void 0 === val && (val = "");
  buffer[offset] = replyText_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += replyText_len;
  val = fields.classId;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'classId'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.methodId;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'methodId'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = "/data"; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'realm' is the wrong type; must be a string (up to 255 chars)");
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
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.passive;
  void 0 === val && (val = !0);
  val && (bits += 2);
  val = fields.active;
  void 0 === val && (val = !0);
  val && (bits += 4);
  val = fields.write;
  void 0 === val && (val = !0);
  val && (bits += 8);
  val = fields.read;
  void 0 === val && (val = !0);
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
  if (void 0 === val) val = 1; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.type;
  if (void 0 === val) val = "direct"; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
  var type_len = Buffer.byteLength(val, "utf8");
  varyingSize += type_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.durable;
  void 0 === val && (val = !1);
  val && (bits += 2);
  val = fields.autoDelete;
  void 0 === val && (val = !1);
  val && (bits += 4);
  val = fields.internal;
  void 0 === val && (val = !1);
  val && (bits += 8);
  val = fields.nowait;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  var buffer = Buffer.alloc(16 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(2621460, 7);
  offset = 11;
  val = fields.ticket;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.exchange;
  void 0 === val && (val = void 0);
  buffer[offset] = exchange_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += exchange_len;
  val = fields.ifUnused;
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.nowait;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'destination'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
  var destination_len = Buffer.byteLength(val, "utf8");
  varyingSize += destination_len;
  val = fields.source;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'source'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
  var source_len = Buffer.byteLength(val, "utf8");
  varyingSize += source_len;
  val = fields.routingKey;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'destination'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
  var destination_len = Buffer.byteLength(val, "utf8");
  varyingSize += destination_len;
  val = fields.source;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'source'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
  var source_len = Buffer.byteLength(val, "utf8");
  varyingSize += source_len;
  val = fields.routingKey;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.queue;
  void 0 === val && (val = "");
  buffer[offset] = queue_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += queue_len;
  val = fields.passive;
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.durable;
  void 0 === val && (val = !1);
  val && (bits += 2);
  val = fields.exclusive;
  void 0 === val && (val = !1);
  val && (bits += 4);
  val = fields.autoDelete;
  void 0 === val && (val = !1);
  val && (bits += 8);
  val = fields.nowait;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'queue'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt32BE(val, offset);
  offset += 4;
  val = fields.consumerCount;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerCount'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'consumerCount' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  val = fields.exchange;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.routingKey;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  var buffer = Buffer.alloc(16 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(3276830, 7);
  offset = 11;
  val = fields.ticket;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.queue;
  void 0 === val && (val = "");
  buffer[offset] = queue_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += queue_len;
  val = fields.nowait;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  var buffer = Buffer.alloc(16 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(3276840, 7);
  offset = 11;
  val = fields.ticket;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.queue;
  void 0 === val && (val = "");
  buffer[offset] = queue_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += queue_len;
  val = fields.ifUnused;
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.ifEmpty;
  void 0 === val && (val = !1);
  val && (bits += 2);
  val = fields.nowait;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  val = fields.exchange;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.routingKey;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'prefetchSize' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt32BE(val, offset);
  offset += 4;
  val = fields.prefetchCount;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'prefetchCount' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.global;
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  val = fields.consumerTag;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
  var consumerTag_len = Buffer.byteLength(val, "utf8");
  varyingSize += consumerTag_len;
  val = fields.arguments;
  if (void 0 === val) val = {}; else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.noAck;
  void 0 === val && (val = !1);
  val && (bits += 2);
  val = fields.exclusive;
  void 0 === val && (val = !1);
  val && (bits += 4);
  val = fields.nowait;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
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
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.routingKey;
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  var buffer = Buffer.alloc(17 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(3932200, 7);
  offset = 11;
  val = fields.ticket;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
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
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.immediate;
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
  var replyText_len = Buffer.byteLength(val, "utf8");
  varyingSize += replyText_len;
  val = fields.exchange;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.routingKey;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  var buffer = Buffer.alloc(17 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(3932210, 7);
  offset = 11;
  val = fields.replyCode;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
  var consumerTag_len = Buffer.byteLength(val, "utf8");
  varyingSize += consumerTag_len;
  val = fields.exchange;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.routingKey;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
  ints.writeUInt64BE(buffer, val, offset);
  offset += 8;
  val = fields.redelivered;
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
  var queue_len = Buffer.byteLength(val, "utf8");
  varyingSize += queue_len;
  var buffer = Buffer.alloc(16 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(3932230, 7);
  offset = 11;
  val = fields.ticket;
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
  buffer.writeUInt16BE(val, offset);
  offset += 2;
  val = fields.queue;
  void 0 === val && (val = "");
  buffer[offset] = queue_len;
  offset++;
  buffer.write(val, offset, "utf8");
  offset += queue_len;
  val = fields.noAck;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
  var exchange_len = Buffer.byteLength(val, "utf8");
  varyingSize += exchange_len;
  val = fields.routingKey;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
  if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
  var routingKey_len = Buffer.byteLength(val, "utf8");
  varyingSize += routingKey_len;
  var buffer = Buffer.alloc(27 + varyingSize);
  buffer[0] = 1;
  buffer.writeUInt16BE(channel, 1);
  buffer.writeUInt32BE(3932231, 7);
  offset = 11;
  val = fields.deliveryTag;
  if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
  ints.writeUInt64BE(buffer, val, offset);
  offset += 8;
  val = fields.redelivered;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
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
  if (void 0 === val) val = ""; else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
  ints.writeUInt64BE(buffer, val, offset);
  offset += 8;
  val = fields.multiple;
  void 0 === val && (val = !1);
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
  if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
  if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
  ints.writeUInt64BE(buffer, val, offset);
  offset += 8;
  val = fields.requeue;
  void 0 === val && (val = !0);
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
  void 0 === val && (val = !1);
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
  void 0 === val && (val = !1);
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
  if (void 0 === val) val = 0; else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
  ints.writeUInt64BE(buffer, val, offset);
  offset += 8;
  val = fields.multiple;
  void 0 === val && (val = !1);
  val && (bits += 1);
  val = fields.requeue;
  void 0 === val && (val = !0);
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
  void 0 === val && (val = !1);
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
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'contentType' is the wrong type; must be a string (up to 255 chars)");
    var contentType_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += contentType_len;
  }
  val = fields.contentEncoding;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'contentEncoding' is the wrong type; must be a string (up to 255 chars)");
    var contentEncoding_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += contentEncoding_len;
  }
  val = fields.headers;
  if (void 0 != val) {
    if ("object" != typeof val) throw new TypeError("Field 'headers' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var headers_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += headers_encoded.length;
  }
  val = fields.deliveryMode;
  if (void 0 != val) {
    if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryMode' is the wrong type; must be a number (but not NaN)");
    varyingSize += 1;
  }
  val = fields.priority;
  if (void 0 != val) {
    if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'priority' is the wrong type; must be a number (but not NaN)");
    varyingSize += 1;
  }
  val = fields.correlationId;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'correlationId' is the wrong type; must be a string (up to 255 chars)");
    var correlationId_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += correlationId_len;
  }
  val = fields.replyTo;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyTo' is the wrong type; must be a string (up to 255 chars)");
    var replyTo_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += replyTo_len;
  }
  val = fields.expiration;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'expiration' is the wrong type; must be a string (up to 255 chars)");
    var expiration_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += expiration_len;
  }
  val = fields.messageId;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'messageId' is the wrong type; must be a string (up to 255 chars)");
    var messageId_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += messageId_len;
  }
  val = fields.timestamp;
  if (void 0 != val) {
    if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'timestamp' is the wrong type; must be a number (but not NaN)");
    varyingSize += 8;
  }
  val = fields.type;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
    var type_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += type_len;
  }
  val = fields.userId;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'userId' is the wrong type; must be a string (up to 255 chars)");
    var userId_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += userId_len;
  }
  val = fields.appId;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'appId' is the wrong type; must be a string (up to 255 chars)");
    var appId_len = Buffer.byteLength(val, "utf8");
    varyingSize += 1;
    varyingSize += appId_len;
  }
  val = fields.clusterId;
  if (void 0 != val) {
    if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
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
  if (0 === flags) return {};
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

var codec = __nccwpck_require__(6830), ints = __nccwpck_require__(7660), encodeTable = codec.encodeTable, decodeFields = codec.decodeFields, SCRATCH = Buffer.alloc(65536), EMPTY_OBJECT = Object.freeze({});

module.exports.constants = {
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

module.exports.constant_strs = {
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

module.exports.FRAME_OVERHEAD = 8;

module.exports.decode = function(id, buf) {
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

module.exports.encodeMethod = function(id, channel, fields) {
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

module.exports.encodeProperties = function(id, channel, size, fields) {
  switch (id) {
   case 60:
    return encodeBasicProperties(channel, size, fields);

   default:
    throw new Error("Unknown class/properties ID");
  }
};

module.exports.info = function(id) {
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

module.exports.ConnectionStart = 655370;

var methodInfoConnectionStart = module.exports.methodInfoConnectionStart = {
  id: 655370,
  classId: 10,
  methodId: 10,
  name: "ConnectionStart",
  args: [ {
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
  } ]
};

module.exports.ConnectionStartOk = 655371;

var methodInfoConnectionStartOk = module.exports.methodInfoConnectionStartOk = {
  id: 655371,
  classId: 10,
  methodId: 11,
  name: "ConnectionStartOk",
  args: [ {
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
  } ]
};

module.exports.ConnectionSecure = 655380;

var methodInfoConnectionSecure = module.exports.methodInfoConnectionSecure = {
  id: 655380,
  classId: 10,
  methodId: 20,
  name: "ConnectionSecure",
  args: [ {
    type: "longstr",
    name: "challenge"
  } ]
};

module.exports.ConnectionSecureOk = 655381;

var methodInfoConnectionSecureOk = module.exports.methodInfoConnectionSecureOk = {
  id: 655381,
  classId: 10,
  methodId: 21,
  name: "ConnectionSecureOk",
  args: [ {
    type: "longstr",
    name: "response"
  } ]
};

module.exports.ConnectionTune = 655390;

var methodInfoConnectionTune = module.exports.methodInfoConnectionTune = {
  id: 655390,
  classId: 10,
  methodId: 30,
  name: "ConnectionTune",
  args: [ {
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
  } ]
};

module.exports.ConnectionTuneOk = 655391;

var methodInfoConnectionTuneOk = module.exports.methodInfoConnectionTuneOk = {
  id: 655391,
  classId: 10,
  methodId: 31,
  name: "ConnectionTuneOk",
  args: [ {
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
  } ]
};

module.exports.ConnectionOpen = 655400;

var methodInfoConnectionOpen = module.exports.methodInfoConnectionOpen = {
  id: 655400,
  classId: 10,
  methodId: 40,
  name: "ConnectionOpen",
  args: [ {
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
    default: !1
  } ]
};

module.exports.ConnectionOpenOk = 655401;

var methodInfoConnectionOpenOk = module.exports.methodInfoConnectionOpenOk = {
  id: 655401,
  classId: 10,
  methodId: 41,
  name: "ConnectionOpenOk",
  args: [ {
    type: "shortstr",
    name: "knownHosts",
    default: ""
  } ]
};

module.exports.ConnectionClose = 655410;

var methodInfoConnectionClose = module.exports.methodInfoConnectionClose = {
  id: 655410,
  classId: 10,
  methodId: 50,
  name: "ConnectionClose",
  args: [ {
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
  } ]
};

module.exports.ConnectionCloseOk = 655411;

var methodInfoConnectionCloseOk = module.exports.methodInfoConnectionCloseOk = {
  id: 655411,
  classId: 10,
  methodId: 51,
  name: "ConnectionCloseOk",
  args: []
};

module.exports.ConnectionBlocked = 655420;

var methodInfoConnectionBlocked = module.exports.methodInfoConnectionBlocked = {
  id: 655420,
  classId: 10,
  methodId: 60,
  name: "ConnectionBlocked",
  args: [ {
    type: "shortstr",
    name: "reason",
    default: ""
  } ]
};

module.exports.ConnectionUnblocked = 655421;

var methodInfoConnectionUnblocked = module.exports.methodInfoConnectionUnblocked = {
  id: 655421,
  classId: 10,
  methodId: 61,
  name: "ConnectionUnblocked",
  args: []
};

module.exports.ChannelOpen = 1310730;

var methodInfoChannelOpen = module.exports.methodInfoChannelOpen = {
  id: 1310730,
  classId: 20,
  methodId: 10,
  name: "ChannelOpen",
  args: [ {
    type: "shortstr",
    name: "outOfBand",
    default: ""
  } ]
};

module.exports.ChannelOpenOk = 1310731;

var methodInfoChannelOpenOk = module.exports.methodInfoChannelOpenOk = {
  id: 1310731,
  classId: 20,
  methodId: 11,
  name: "ChannelOpenOk",
  args: [ {
    type: "longstr",
    name: "channelId",
    default: ""
  } ]
};

module.exports.ChannelFlow = 1310740;

var methodInfoChannelFlow = module.exports.methodInfoChannelFlow = {
  id: 1310740,
  classId: 20,
  methodId: 20,
  name: "ChannelFlow",
  args: [ {
    type: "bit",
    name: "active"
  } ]
};

module.exports.ChannelFlowOk = 1310741;

var methodInfoChannelFlowOk = module.exports.methodInfoChannelFlowOk = {
  id: 1310741,
  classId: 20,
  methodId: 21,
  name: "ChannelFlowOk",
  args: [ {
    type: "bit",
    name: "active"
  } ]
};

module.exports.ChannelClose = 1310760;

var methodInfoChannelClose = module.exports.methodInfoChannelClose = {
  id: 1310760,
  classId: 20,
  methodId: 40,
  name: "ChannelClose",
  args: [ {
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
  } ]
};

module.exports.ChannelCloseOk = 1310761;

var methodInfoChannelCloseOk = module.exports.methodInfoChannelCloseOk = {
  id: 1310761,
  classId: 20,
  methodId: 41,
  name: "ChannelCloseOk",
  args: []
};

module.exports.AccessRequest = 1966090;

var methodInfoAccessRequest = module.exports.methodInfoAccessRequest = {
  id: 1966090,
  classId: 30,
  methodId: 10,
  name: "AccessRequest",
  args: [ {
    type: "shortstr",
    name: "realm",
    default: "/data"
  }, {
    type: "bit",
    name: "exclusive",
    default: !1
  }, {
    type: "bit",
    name: "passive",
    default: !0
  }, {
    type: "bit",
    name: "active",
    default: !0
  }, {
    type: "bit",
    name: "write",
    default: !0
  }, {
    type: "bit",
    name: "read",
    default: !0
  } ]
};

module.exports.AccessRequestOk = 1966091;

var methodInfoAccessRequestOk = module.exports.methodInfoAccessRequestOk = {
  id: 1966091,
  classId: 30,
  methodId: 11,
  name: "AccessRequestOk",
  args: [ {
    type: "short",
    name: "ticket",
    default: 1
  } ]
};

module.exports.ExchangeDeclare = 2621450;

var methodInfoExchangeDeclare = module.exports.methodInfoExchangeDeclare = {
  id: 2621450,
  classId: 40,
  methodId: 10,
  name: "ExchangeDeclare",
  args: [ {
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
    default: !1
  }, {
    type: "bit",
    name: "durable",
    default: !1
  }, {
    type: "bit",
    name: "autoDelete",
    default: !1
  }, {
    type: "bit",
    name: "internal",
    default: !1
  }, {
    type: "bit",
    name: "nowait",
    default: !1
  }, {
    type: "table",
    name: "arguments",
    default: {}
  } ]
};

module.exports.ExchangeDeclareOk = 2621451;

var methodInfoExchangeDeclareOk = module.exports.methodInfoExchangeDeclareOk = {
  id: 2621451,
  classId: 40,
  methodId: 11,
  name: "ExchangeDeclareOk",
  args: []
};

module.exports.ExchangeDelete = 2621460;

var methodInfoExchangeDelete = module.exports.methodInfoExchangeDelete = {
  id: 2621460,
  classId: 40,
  methodId: 20,
  name: "ExchangeDelete",
  args: [ {
    type: "short",
    name: "ticket",
    default: 0
  }, {
    type: "shortstr",
    name: "exchange"
  }, {
    type: "bit",
    name: "ifUnused",
    default: !1
  }, {
    type: "bit",
    name: "nowait",
    default: !1
  } ]
};

module.exports.ExchangeDeleteOk = 2621461;

var methodInfoExchangeDeleteOk = module.exports.methodInfoExchangeDeleteOk = {
  id: 2621461,
  classId: 40,
  methodId: 21,
  name: "ExchangeDeleteOk",
  args: []
};

module.exports.ExchangeBind = 2621470;

var methodInfoExchangeBind = module.exports.methodInfoExchangeBind = {
  id: 2621470,
  classId: 40,
  methodId: 30,
  name: "ExchangeBind",
  args: [ {
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
    default: !1
  }, {
    type: "table",
    name: "arguments",
    default: {}
  } ]
};

module.exports.ExchangeBindOk = 2621471;

var methodInfoExchangeBindOk = module.exports.methodInfoExchangeBindOk = {
  id: 2621471,
  classId: 40,
  methodId: 31,
  name: "ExchangeBindOk",
  args: []
};

module.exports.ExchangeUnbind = 2621480;

var methodInfoExchangeUnbind = module.exports.methodInfoExchangeUnbind = {
  id: 2621480,
  classId: 40,
  methodId: 40,
  name: "ExchangeUnbind",
  args: [ {
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
    default: !1
  }, {
    type: "table",
    name: "arguments",
    default: {}
  } ]
};

module.exports.ExchangeUnbindOk = 2621491;

var methodInfoExchangeUnbindOk = module.exports.methodInfoExchangeUnbindOk = {
  id: 2621491,
  classId: 40,
  methodId: 51,
  name: "ExchangeUnbindOk",
  args: []
};

module.exports.QueueDeclare = 3276810;

var methodInfoQueueDeclare = module.exports.methodInfoQueueDeclare = {
  id: 3276810,
  classId: 50,
  methodId: 10,
  name: "QueueDeclare",
  args: [ {
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
    default: !1
  }, {
    type: "bit",
    name: "durable",
    default: !1
  }, {
    type: "bit",
    name: "exclusive",
    default: !1
  }, {
    type: "bit",
    name: "autoDelete",
    default: !1
  }, {
    type: "bit",
    name: "nowait",
    default: !1
  }, {
    type: "table",
    name: "arguments",
    default: {}
  } ]
};

module.exports.QueueDeclareOk = 3276811;

var methodInfoQueueDeclareOk = module.exports.methodInfoQueueDeclareOk = {
  id: 3276811,
  classId: 50,
  methodId: 11,
  name: "QueueDeclareOk",
  args: [ {
    type: "shortstr",
    name: "queue"
  }, {
    type: "long",
    name: "messageCount"
  }, {
    type: "long",
    name: "consumerCount"
  } ]
};

module.exports.QueueBind = 3276820;

var methodInfoQueueBind = module.exports.methodInfoQueueBind = {
  id: 3276820,
  classId: 50,
  methodId: 20,
  name: "QueueBind",
  args: [ {
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
    default: !1
  }, {
    type: "table",
    name: "arguments",
    default: {}
  } ]
};

module.exports.QueueBindOk = 3276821;

var methodInfoQueueBindOk = module.exports.methodInfoQueueBindOk = {
  id: 3276821,
  classId: 50,
  methodId: 21,
  name: "QueueBindOk",
  args: []
};

module.exports.QueuePurge = 3276830;

var methodInfoQueuePurge = module.exports.methodInfoQueuePurge = {
  id: 3276830,
  classId: 50,
  methodId: 30,
  name: "QueuePurge",
  args: [ {
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
    default: !1
  } ]
};

module.exports.QueuePurgeOk = 3276831;

var methodInfoQueuePurgeOk = module.exports.methodInfoQueuePurgeOk = {
  id: 3276831,
  classId: 50,
  methodId: 31,
  name: "QueuePurgeOk",
  args: [ {
    type: "long",
    name: "messageCount"
  } ]
};

module.exports.QueueDelete = 3276840;

var methodInfoQueueDelete = module.exports.methodInfoQueueDelete = {
  id: 3276840,
  classId: 50,
  methodId: 40,
  name: "QueueDelete",
  args: [ {
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
    default: !1
  }, {
    type: "bit",
    name: "ifEmpty",
    default: !1
  }, {
    type: "bit",
    name: "nowait",
    default: !1
  } ]
};

module.exports.QueueDeleteOk = 3276841;

var methodInfoQueueDeleteOk = module.exports.methodInfoQueueDeleteOk = {
  id: 3276841,
  classId: 50,
  methodId: 41,
  name: "QueueDeleteOk",
  args: [ {
    type: "long",
    name: "messageCount"
  } ]
};

module.exports.QueueUnbind = 3276850;

var methodInfoQueueUnbind = module.exports.methodInfoQueueUnbind = {
  id: 3276850,
  classId: 50,
  methodId: 50,
  name: "QueueUnbind",
  args: [ {
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
  } ]
};

module.exports.QueueUnbindOk = 3276851;

var methodInfoQueueUnbindOk = module.exports.methodInfoQueueUnbindOk = {
  id: 3276851,
  classId: 50,
  methodId: 51,
  name: "QueueUnbindOk",
  args: []
};

module.exports.BasicQos = 3932170;

var methodInfoBasicQos = module.exports.methodInfoBasicQos = {
  id: 3932170,
  classId: 60,
  methodId: 10,
  name: "BasicQos",
  args: [ {
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
    default: !1
  } ]
};

module.exports.BasicQosOk = 3932171;

var methodInfoBasicQosOk = module.exports.methodInfoBasicQosOk = {
  id: 3932171,
  classId: 60,
  methodId: 11,
  name: "BasicQosOk",
  args: []
};

module.exports.BasicConsume = 3932180;

var methodInfoBasicConsume = module.exports.methodInfoBasicConsume = {
  id: 3932180,
  classId: 60,
  methodId: 20,
  name: "BasicConsume",
  args: [ {
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
    default: !1
  }, {
    type: "bit",
    name: "noAck",
    default: !1
  }, {
    type: "bit",
    name: "exclusive",
    default: !1
  }, {
    type: "bit",
    name: "nowait",
    default: !1
  }, {
    type: "table",
    name: "arguments",
    default: {}
  } ]
};

module.exports.BasicConsumeOk = 3932181;

var methodInfoBasicConsumeOk = module.exports.methodInfoBasicConsumeOk = {
  id: 3932181,
  classId: 60,
  methodId: 21,
  name: "BasicConsumeOk",
  args: [ {
    type: "shortstr",
    name: "consumerTag"
  } ]
};

module.exports.BasicCancel = 3932190;

var methodInfoBasicCancel = module.exports.methodInfoBasicCancel = {
  id: 3932190,
  classId: 60,
  methodId: 30,
  name: "BasicCancel",
  args: [ {
    type: "shortstr",
    name: "consumerTag"
  }, {
    type: "bit",
    name: "nowait",
    default: !1
  } ]
};

module.exports.BasicCancelOk = 3932191;

var methodInfoBasicCancelOk = module.exports.methodInfoBasicCancelOk = {
  id: 3932191,
  classId: 60,
  methodId: 31,
  name: "BasicCancelOk",
  args: [ {
    type: "shortstr",
    name: "consumerTag"
  } ]
};

module.exports.BasicPublish = 3932200;

var methodInfoBasicPublish = module.exports.methodInfoBasicPublish = {
  id: 3932200,
  classId: 60,
  methodId: 40,
  name: "BasicPublish",
  args: [ {
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
    default: !1
  }, {
    type: "bit",
    name: "immediate",
    default: !1
  } ]
};

module.exports.BasicReturn = 3932210;

var methodInfoBasicReturn = module.exports.methodInfoBasicReturn = {
  id: 3932210,
  classId: 60,
  methodId: 50,
  name: "BasicReturn",
  args: [ {
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
  } ]
};

module.exports.BasicDeliver = 3932220;

var methodInfoBasicDeliver = module.exports.methodInfoBasicDeliver = {
  id: 3932220,
  classId: 60,
  methodId: 60,
  name: "BasicDeliver",
  args: [ {
    type: "shortstr",
    name: "consumerTag"
  }, {
    type: "longlong",
    name: "deliveryTag"
  }, {
    type: "bit",
    name: "redelivered",
    default: !1
  }, {
    type: "shortstr",
    name: "exchange"
  }, {
    type: "shortstr",
    name: "routingKey"
  } ]
};

module.exports.BasicGet = 3932230;

var methodInfoBasicGet = module.exports.methodInfoBasicGet = {
  id: 3932230,
  classId: 60,
  methodId: 70,
  name: "BasicGet",
  args: [ {
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
    default: !1
  } ]
};

module.exports.BasicGetOk = 3932231;

var methodInfoBasicGetOk = module.exports.methodInfoBasicGetOk = {
  id: 3932231,
  classId: 60,
  methodId: 71,
  name: "BasicGetOk",
  args: [ {
    type: "longlong",
    name: "deliveryTag"
  }, {
    type: "bit",
    name: "redelivered",
    default: !1
  }, {
    type: "shortstr",
    name: "exchange"
  }, {
    type: "shortstr",
    name: "routingKey"
  }, {
    type: "long",
    name: "messageCount"
  } ]
};

module.exports.BasicGetEmpty = 3932232;

var methodInfoBasicGetEmpty = module.exports.methodInfoBasicGetEmpty = {
  id: 3932232,
  classId: 60,
  methodId: 72,
  name: "BasicGetEmpty",
  args: [ {
    type: "shortstr",
    name: "clusterId",
    default: ""
  } ]
};

module.exports.BasicAck = 3932240;

var methodInfoBasicAck = module.exports.methodInfoBasicAck = {
  id: 3932240,
  classId: 60,
  methodId: 80,
  name: "BasicAck",
  args: [ {
    type: "longlong",
    name: "deliveryTag",
    default: 0
  }, {
    type: "bit",
    name: "multiple",
    default: !1
  } ]
};

module.exports.BasicReject = 3932250;

var methodInfoBasicReject = module.exports.methodInfoBasicReject = {
  id: 3932250,
  classId: 60,
  methodId: 90,
  name: "BasicReject",
  args: [ {
    type: "longlong",
    name: "deliveryTag"
  }, {
    type: "bit",
    name: "requeue",
    default: !0
  } ]
};

module.exports.BasicRecoverAsync = 3932260;

var methodInfoBasicRecoverAsync = module.exports.methodInfoBasicRecoverAsync = {
  id: 3932260,
  classId: 60,
  methodId: 100,
  name: "BasicRecoverAsync",
  args: [ {
    type: "bit",
    name: "requeue",
    default: !1
  } ]
};

module.exports.BasicRecover = 3932270;

var methodInfoBasicRecover = module.exports.methodInfoBasicRecover = {
  id: 3932270,
  classId: 60,
  methodId: 110,
  name: "BasicRecover",
  args: [ {
    type: "bit",
    name: "requeue",
    default: !1
  } ]
};

module.exports.BasicRecoverOk = 3932271;

var methodInfoBasicRecoverOk = module.exports.methodInfoBasicRecoverOk = {
  id: 3932271,
  classId: 60,
  methodId: 111,
  name: "BasicRecoverOk",
  args: []
};

module.exports.BasicNack = 3932280;

var methodInfoBasicNack = module.exports.methodInfoBasicNack = {
  id: 3932280,
  classId: 60,
  methodId: 120,
  name: "BasicNack",
  args: [ {
    type: "longlong",
    name: "deliveryTag",
    default: 0
  }, {
    type: "bit",
    name: "multiple",
    default: !1
  }, {
    type: "bit",
    name: "requeue",
    default: !0
  } ]
};

module.exports.TxSelect = 5898250;

var methodInfoTxSelect = module.exports.methodInfoTxSelect = {
  id: 5898250,
  classId: 90,
  methodId: 10,
  name: "TxSelect",
  args: []
};

module.exports.TxSelectOk = 5898251;

var methodInfoTxSelectOk = module.exports.methodInfoTxSelectOk = {
  id: 5898251,
  classId: 90,
  methodId: 11,
  name: "TxSelectOk",
  args: []
};

module.exports.TxCommit = 5898260;

var methodInfoTxCommit = module.exports.methodInfoTxCommit = {
  id: 5898260,
  classId: 90,
  methodId: 20,
  name: "TxCommit",
  args: []
};

module.exports.TxCommitOk = 5898261;

var methodInfoTxCommitOk = module.exports.methodInfoTxCommitOk = {
  id: 5898261,
  classId: 90,
  methodId: 21,
  name: "TxCommitOk",
  args: []
};

module.exports.TxRollback = 5898270;

var methodInfoTxRollback = module.exports.methodInfoTxRollback = {
  id: 5898270,
  classId: 90,
  methodId: 30,
  name: "TxRollback",
  args: []
};

module.exports.TxRollbackOk = 5898271;

var methodInfoTxRollbackOk = module.exports.methodInfoTxRollbackOk = {
  id: 5898271,
  classId: 90,
  methodId: 31,
  name: "TxRollbackOk",
  args: []
};

module.exports.ConfirmSelect = 5570570;

var methodInfoConfirmSelect = module.exports.methodInfoConfirmSelect = {
  id: 5570570,
  classId: 85,
  methodId: 10,
  name: "ConfirmSelect",
  args: [ {
    type: "bit",
    name: "nowait",
    default: !1
  } ]
};

module.exports.ConfirmSelectOk = 5570571;

var methodInfoConfirmSelectOk = module.exports.methodInfoConfirmSelectOk = {
  id: 5570571,
  classId: 85,
  methodId: 11,
  name: "ConfirmSelectOk",
  args: []
};

module.exports.BasicProperties = 60;

var propertiesInfoBasicProperties = module.exports.propertiesInfoBasicProperties = {
  id: 60,
  name: "BasicProperties",
  args: [ {
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
  } ]
};

/***/ }),

/***/ 5785:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var inherits = (__nccwpck_require__(3837).inherits);

function trimStack(stack, num) {
  return stack && stack.split('\n').slice(num).join('\n');
}

function IllegalOperationError(msg, stack) {
  var tmp = new Error();
  this.message = msg;
  this.stack = this.toString() + '\n' + trimStack(tmp.stack, 2);
  this.stackAtStateChange = stack;
}
inherits(IllegalOperationError, Error);

IllegalOperationError.prototype.name = 'IllegalOperationError';

function stackCapture(reason) {
  var e = new Error();
  return 'Stack capture: ' + reason + '\n' +
    trimStack(e.stack, 2);
}

module.exports.IllegalOperationError = IllegalOperationError;
module.exports.t = stackCapture;


/***/ }),

/***/ 6629:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
//
//
//

// Stringifying various things



var defs = __nccwpck_require__(7818);
var format = (__nccwpck_require__(3837).format);
var inherits = (__nccwpck_require__(3837).inherits);
var HEARTBEAT = (__nccwpck_require__(8028).HEARTBEAT);

module.exports.closeMessage = function(close) {
  var code = close.fields.replyCode;
  return format('%d (%s) with message "%s"',
                code, defs.constant_strs[code],
                close.fields.replyText);
}

module.exports.methodName = function(id) {
  return defs.info(id).name;
};

module.exports.inspect = function(frame, showFields) {
  if (frame === HEARTBEAT) {
    return '<Heartbeat>';
  }
  else if (!frame.id) {
    return format('<Content channel:%d size:%d>',
                  frame.channel, frame.size);
  }
  else {
    var info = defs.info(frame.id);
    return format('<%s channel:%d%s>', info.name, frame.channel,
                  (showFields)
                  ? ' ' + JSON.stringify(frame.fields, undefined, 2)
                  : '');
  }
}


/***/ }),

/***/ 8028:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// The river sweeps through
// Silt and twigs, gravel and leaves
// Driving the wheel on



var defs = __nccwpck_require__(7818);
var constants = defs.constants;
var decode = defs.decode;

var Bits = __nccwpck_require__(9922);

module.exports.PROTOCOL_HEADER = "AMQP" + String.fromCharCode(0, 0, 9, 1);

/*
  Frame format:

  0      1         3             7                size+7 size+8
  +------+---------+-------------+ +------------+ +-----------+
  | type | channel | size        | | payload    | | frame-end |
  +------+---------+-------------+ +------------+ +-----------+
  octet   short     long            size octets    octet

  In general I want to know those first three things straight away, so I
  can discard frames early.

*/

// framing constants
var FRAME_METHOD = constants.FRAME_METHOD,
FRAME_HEARTBEAT = constants.FRAME_HEARTBEAT,
FRAME_HEADER = constants.FRAME_HEADER,
FRAME_BODY = constants.FRAME_BODY,
FRAME_END = constants.FRAME_END;

var bodyCons =
  Bits.builder(FRAME_BODY,
               'channel:16, size:32, payload:size/binary',
               FRAME_END);

// %%% TESTME possibly better to cons the first bit and write the
// second directly, in the absence of IO lists
module.exports.makeBodyFrame = function(channel, payload) {
  return bodyCons({channel: channel, size: payload.length, payload: payload});
};

var frameHeaderPattern = Bits.matcher('type:8', 'channel:16',
                                      'size:32', 'rest/binary');

function parseFrame(bin, max) {
  var fh = frameHeaderPattern(bin);
  if (fh) {
    var size = fh.size, rest = fh.rest;
    if (size > max) {
      throw new Error('Frame size exceeds frame max');
    }
    else if (rest.length > size) {
      if (rest[size] !== FRAME_END)
        throw new Error('Invalid frame');

      return {
        type: fh.type,
        channel: fh.channel,
        size: size,
        payload: rest.slice(0, size),
        rest: rest.slice(size + 1)
      };
    }
  }
  return false;
}

module.exports.parseFrame = parseFrame;

var headerPattern = Bits.matcher('class:16',
                                 '_weight:16',
                                 'size:64',
                                 'flagsAndfields/binary');

var methodPattern = Bits.matcher('id:32, args/binary');

var HEARTBEAT = {channel: 0};

module.exports.decodeFrame = function(frame) {
  var payload = frame.payload;
  switch (frame.type) {
  case FRAME_METHOD:
    var idAndArgs = methodPattern(payload);
    var id = idAndArgs.id;
    var fields = decode(id, idAndArgs.args);
    return {id: id, channel: frame.channel, fields: fields};
  case FRAME_HEADER:
    var parts = headerPattern(payload);
    var id = parts['class'];
    var fields = decode(id, parts.flagsAndfields);
    return {id: id, channel: frame.channel,
            size: parts.size, fields: fields};
  case FRAME_BODY:
    return {channel: frame.channel, content: frame.payload};
  case FRAME_HEARTBEAT:
    return HEARTBEAT;
  default:
    throw new Error('Unknown frame type ' + frame.type);
  }
}

// encoded heartbeat
module.exports.HEARTBEAT_BUF = Buffer.from([constants.FRAME_HEARTBEAT,
                                           0, 0, 0, 0, // size = 0
                                           0, 0, // channel = 0
                                           constants.FRAME_END]);

module.exports.HEARTBEAT = HEARTBEAT;


/***/ }),

/***/ 4636:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
//
//
//

// Heartbeats. In AMQP both clients and servers may expect a heartbeat
// frame if there is no activity on the connection for a negotiated
// period of time. If there's no activity for two such intervals, the
// server or client is allowed to close the connection on the
// presumption that the other party is dead.
//
// The client has two jobs here: the first is to send a heartbeat
// frame if it's not sent any frames for a while, so that the server
// doesn't think it's dead; the second is to check periodically that
// it's seen activity from the server, and to advise if there doesn't
// appear to have been any for over two intervals.
//
// Node.JS timers are a bit unreliable, in that they endeavour only to
// fire at some indeterminate point *after* the given time (rather
// gives the lie to 'realtime', dunnit). Because the scheduler is just
// an event loop, it's quite easy to delay timers indefinitely by
// reacting to some I/O with a lot of computation.
//
// To mitigate this I need a bit of creative interpretation:
//
//  - I'll schedule a server activity check for every `interval`, and
//    check just how much time has passed. It will overshoot by at
//    least a small margin; modulo missing timer deadlines, it'll
//    notice between two and three intervals after activity actually
//    stops (otherwise, at some point after two intervals).
//
//  - Every `interval / 2` I'll check that we've sent something since
//    the last check, and if not, send a heartbeat frame. If we're
//    really too busy to even run the check for two whole heartbeat
//    intervals, there must be a lot of I (but not O, at least not on
//    the connection), or computation, in which case perhaps it's best
//    the server cuts us off anyway. Why `interval / 2`? Because the
//    edge case is that the client sent a frame just after a
//    heartbeat, which would mean I only send one after almost two
//    intervals. (NB a heartbeat counts as a send, so it'll be checked
//    at least twice before sending another)
//
// This design is based largely on RabbitMQ's heartbeating:
// https://github.com/rabbitmq/rabbitmq-common/blob/master/src/rabbit_heartbeat.erl

// %% Yes, I could apply the same 'actually passage of time' thing to
// %% send as well as to recv.



var inherits = (__nccwpck_require__(3837).inherits);
var EventEmitter = (__nccwpck_require__(2361).EventEmitter);

// Exported so that we can mess with it in tests
module.exports.B = 1000;

function Heart(interval, checkSend, checkRecv) {
  EventEmitter.call(this);
  this.interval = interval;

  var intervalMs = interval * module.exports.B;
  // Function#bind is my new best friend
  var beat = this.emit.bind(this, 'beat');
  var timeout = this.emit.bind(this, 'timeout');

  this.sendTimer = setInterval(
    this.runHeartbeat.bind(this, checkSend, beat), intervalMs / 2);

  // A timeout occurs if I see nothing for *two consecutive* intervals
  var recvMissed = 0;
  function missedTwo() {
    if (!checkRecv()) return (++recvMissed < 2);
    else { recvMissed = 0; return true; }
  }
  this.recvTimer = setInterval(
    this.runHeartbeat.bind(this, missedTwo, timeout), intervalMs);
}
inherits(Heart, EventEmitter);

module.exports.X = Heart;

Heart.prototype.clear = function() {
  clearInterval(this.sendTimer);
  clearInterval(this.recvTimer);
};

Heart.prototype.runHeartbeat = function(check, fail) {
  // Have we seen activity?
  if (!check()) fail();
};


/***/ }),

/***/ 3708:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
//
//
//



// A Mux is an object into which other readable streams may be piped;
// it then writes 'packets' from the upstreams to the given
// downstream.

var assert = __nccwpck_require__(9491);

var schedule = (typeof setImmediate === 'function') ?
  setImmediate : process.nextTick;

function Mux(downstream) {
  this.newStreams = [];
  this.oldStreams = [];
  this.blocked = false;
  this.scheduledRead = false;

  this.out = downstream;
  var self = this;
  downstream.on('drain', function() {
    self.blocked = false;
    self._readIncoming();
  });
}

// There are 2 states we can be in:

// - waiting for outbound capacity, which will be signalled by a
// - 'drain' event on the downstream; or,

// - no packets to send, waiting for an inbound buffer to have
//   packets, which will be signalled by a 'readable' event

// If we write all packets available whenever there is outbound
// capacity, we will either run out of outbound capacity (`#write`
// returns false), or run out of packets (all calls to an
// `inbound.read()` have returned null).

Mux.prototype._readIncoming = function() {

  // We may be sent here speculatively, if an incoming stream has
  // become readable
  if (this.blocked) return;

  var accepting = true;
  var out = this.out;

  // Try to read a chunk from each stream in turn, until all streams
  // are empty, or we exhaust our ability to accept chunks.
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

  // Either we exhausted the new queues, or we ran out of capacity. If
  // we ran out of capacity, all the remaining new streams (i.e.,
  // those with packets left) become old streams. This effectively
  // prioritises streams that keep their buffers close to empty over
  // those that are constantly near full.

  if (accepting) { // all new queues are exhausted, write as many as
                   // we can from the old streams
    assert.equal(0, this.newStreams.length);
    roundrobin(this.oldStreams);
  }
  else { // ran out of room
    assert(this.newStreams.length > 0, "Expect some new streams to remain");
    Array.prototype.push.apply(this.oldStreams, this.newStreams);
    this.newStreams = [];
  }
  // We may have exhausted all the old queues, or run out of room;
  // either way, all we need to do is record whether we have capacity
  // or not, so any speculative reads will know
  this.blocked = !accepting;
};

Mux.prototype._scheduleRead = function() {
  var self = this;

  if (!self.scheduledRead) {
    schedule(function() {
      self.scheduledRead = false;
      self._readIncoming();
    });
    self.scheduledRead = true;
  }
};

Mux.prototype.pipeFrom = function(readable) {
  var self = this;

  function enqueue() {
    self.newStreams.push(readable);
    self._scheduleRead();
  }

  function cleanup() {
    readable.removeListener('readable', enqueue);
    readable.removeListener('error', cleanup);
    readable.removeListener('end', cleanup);
    readable.removeListener('unpipeFrom', cleanupIfMe);
  }
  function cleanupIfMe(dest) {
    if (dest === self) cleanup();
  }

  readable.on('unpipeFrom', cleanupIfMe);
  readable.on('end', cleanup);
  readable.on('error', cleanup);
  readable.on('readable', enqueue);
};

Mux.prototype.unpipeFrom = function(readable) {
  readable.emit('unpipeFrom', this);
};

module.exports.v = Mux;


/***/ }),

/***/ 7660:
/***/ ((module) => {

"use strict";


// JavaScript is numerically challenged
var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;

// The maximum contiguous integer that can be held in a IEEE754 double
var MAX_INT = 0x1fffffffffffff;

function isContiguousInt(val) {
    return val <= MAX_INT && val >= -MAX_INT;
}

function assertContiguousInt(val) {
    if (!isContiguousInt(val)) {
        throw new TypeError("number cannot be represented as a contiguous integer");
    }
}

module.exports.isContiguousInt = isContiguousInt;
module.exports.assertContiguousInt = assertContiguousInt;

// Fill in the regular procedures
['UInt', 'Int'].forEach(function (sign) {
  var suffix = sign + '8';
  module.exports['read' + suffix] =
    Buffer.prototype['read' + suffix].call;
  module.exports['write' + suffix] =
    Buffer.prototype['write' + suffix].call;

  ['16', '32'].forEach(function (size) {
    ['LE', 'BE'].forEach(function (endian) {
      var suffix = sign + size + endian;
      var read = Buffer.prototype['read' + suffix];
      module.exports['read' + suffix] =
        function (buf, offset) {
          return read.call(buf, offset);
        };
      var write = Buffer.prototype['write' + suffix];
      module.exports['write' + suffix] =
        function (buf, val, offset) {
          return write.call(buf, val, offset);
        };
    });
  });
});

// Check that a value is an integer within the given range
function check_value(val, min, max) {
    val = +val;
    if (typeof(val) != 'number' || val < min || val > max || Math.floor(val) !== val) {
        throw new TypeError("\"value\" argument is out of bounds");
    }
    return val;
}

// Check that something is within the Buffer bounds
function check_bounds(buf, offset, len) {
    if (offset < 0 || offset + len > buf.length) {
        throw new RangeError("Index out of range");
    }
}

function readUInt24BE(buf, offset) {
  return buf.readUInt8(offset) << 16 | buf.readUInt16BE(offset + 1);
}
module.exports.readUInt24BE = readUInt24BE;

function writeUInt24BE(buf, val, offset) {
    val = check_value(val, 0, 0xffffff);
    check_bounds(buf, offset, 3);
    buf.writeUInt8(val >>> 16, offset);
    buf.writeUInt16BE(val & 0xffff, offset + 1);
}
module.exports.writeUInt24BE = writeUInt24BE;

function readUInt40BE(buf, offset) {
    return (buf.readUInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
}
module.exports.readUInt40BE = readUInt40BE;

function writeUInt40BE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffff);
    check_bounds(buf, offset, 5);
    buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 1);
}
module.exports.writeUInt40BE = writeUInt40BE;

function readUInt48BE(buf, offset) {
    return buf.readUInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
}
module.exports.readUInt48BE = readUInt48BE;

function writeUInt48BE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffff);
    check_bounds(buf, offset, 6);
    buf.writeUInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 2);
}
module.exports.writeUInt48BE = writeUInt48BE;

function readUInt56BE(buf, offset) {
    return ((buf.readUInt8(offset) || 0) << 16 | buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
}
module.exports.readUInt56BE = readUInt56BE;

function writeUInt56BE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffffff);
    check_bounds(buf, offset, 7);

    if (val < 0x100000000000000) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt8(hi >>> 16, offset);
        buf.writeUInt16BE(hi & 0xffff, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
    } else {
        // Special case because 2^56-1 gets rounded up to 2^56
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
    }
}
module.exports.writeUInt56BE = writeUInt56BE;

function readUInt64BE(buf, offset) {
    return buf.readUInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
}
module.exports.readUInt64BE = readUInt64BE;

function writeUInt64BE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffffffff);
    check_bounds(buf, offset, 8);

    if (val < 0x10000000000000000) {
        buf.writeUInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
    } else {
        // Special case because 2^64-1 gets rounded up to 2^64
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
        buf[offset+7] = 0xff;
    }
}
module.exports.writeUInt64BE = writeUInt64BE;

function readUInt24LE(buf, offset) {
    return buf.readUInt8(offset + 2) << 16 | buf.readUInt16LE(offset);
}
module.exports.readUInt24LE = readUInt24LE;

function writeUInt24LE(buf, val, offset) {
    val = check_value(val, 0, 0xffffff);
    check_bounds(buf, offset, 3);

    buf.writeUInt16LE(val & 0xffff, offset);
    buf.writeUInt8(val >>> 16, offset + 2);
}
module.exports.writeUInt24LE = writeUInt24LE;

function readUInt40LE(buf, offset) {
    return (buf.readUInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readUInt40LE = readUInt40LE;

function writeUInt40LE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffff);
    check_bounds(buf, offset, 5);
    buf.writeInt32LE(val & -1, offset);
    buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
}
module.exports.writeUInt40LE = writeUInt40LE;

function readUInt48LE(buf, offset) {
    return buf.readUInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readUInt48LE = readUInt48LE;

function writeUInt48LE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffff);
    check_bounds(buf, offset, 6);
    buf.writeInt32LE(val & -1, offset);
    buf.writeUInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
}
module.exports.writeUInt48LE = writeUInt48LE;

function readUInt56LE(buf, offset) {
    return ((buf.readUInt8(offset + 6) || 0) << 16 | buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readUInt56LE = readUInt56LE;

function writeUInt56LE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffffff);
    check_bounds(buf, offset, 7);

    if (val < 0x100000000000000) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 0xffff, offset + 4);
        buf.writeUInt8(hi >>> 16, offset + 6);
    } else {
        // Special case because 2^56-1 gets rounded up to 2^56
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
    }
}
module.exports.writeUInt56LE = writeUInt56LE;

function readUInt64LE(buf, offset) {
    return buf.readUInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readUInt64LE = readUInt64LE;

function writeUInt64LE(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffffffff);
    check_bounds(buf, offset, 8);

    if (val < 0x10000000000000000) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    } else {
        // Special case because 2^64-1 gets rounded up to 2^64
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
        buf[offset+7] = 0xff;
    }
}
module.exports.writeUInt64LE = writeUInt64LE;


function readInt24BE(buf, offset) {
    return (buf.readInt8(offset) << 16) + buf.readUInt16BE(offset + 1);
}
module.exports.readInt24BE = readInt24BE;

function writeInt24BE(buf, val, offset) {
    val = check_value(val, -0x800000, 0x7fffff);
    check_bounds(buf, offset, 3);
    buf.writeInt8(val >> 16, offset);
    buf.writeUInt16BE(val & 0xffff, offset + 1);
}
module.exports.writeInt24BE = writeInt24BE;

function readInt40BE(buf, offset) {
    return (buf.readInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
}
module.exports.readInt40BE = readInt40BE;

function writeInt40BE(buf, val, offset) {
    val = check_value(val, -0x8000000000, 0x7fffffffff);
    check_bounds(buf, offset, 5);
    buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 1);
}
module.exports.writeInt40BE = writeInt40BE;

function readInt48BE(buf, offset) {
    return buf.readInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
}
module.exports.readInt48BE = readInt48BE;

function writeInt48BE(buf, val, offset) {
    val = check_value(val, -0x800000000000, 0x7fffffffffff);
    check_bounds(buf, offset, 6);
    buf.writeInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 2);
}
module.exports.writeInt48BE = writeInt48BE;

function readInt56BE(buf, offset) {
    return (((buf.readInt8(offset) || 0) << 16) + buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
}
module.exports.readInt56BE = readInt56BE;

function writeInt56BE(buf, val, offset) {
    val = check_value(val, -0x800000000000000, 0x7fffffffffffff);
    check_bounds(buf, offset, 7);

    if (val < 0x80000000000000) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeInt8(hi >> 16, offset);
        buf.writeUInt16BE(hi & 0xffff, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
    } else {
        // Special case because 2^55-1 gets rounded up to 2^55
        buf[offset] = 0x7f;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
    }
}
module.exports.writeInt56BE = writeInt56BE;

function readInt64BE(buf, offset) {
    return buf.readInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
}
module.exports.readInt64BE = readInt64BE;

function writeInt64BE(buf, val, offset) {
    val = check_value(val, -0x800000000000000000, 0x7fffffffffffffff);
    check_bounds(buf, offset, 8);

    if (val < 0x8000000000000000) {
        buf.writeInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
    } else {
        // Special case because 2^63-1 gets rounded up to 2^63
        buf[offset] = 0x7f;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
        buf[offset+7] = 0xff;
    }
}
module.exports.writeInt64BE = writeInt64BE;

function readInt24LE(buf, offset) {
    return (buf.readInt8(offset + 2) << 16) + buf.readUInt16LE(offset);
}
module.exports.readInt24LE = readInt24LE;

function writeInt24LE(buf, val, offset) {
    val = check_value(val, -0x800000, 0x7fffff);
    check_bounds(buf, offset, 3);
    buf.writeUInt16LE(val & 0xffff, offset);
    buf.writeInt8(val >> 16, offset + 2);
}
module.exports.writeInt24LE = writeInt24LE;

function readInt40LE(buf, offset) {
    return (buf.readInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readInt40LE = readInt40LE;

function writeInt40LE(buf, val, offset) {
    val = check_value(val, -0x8000000000, 0x7fffffffff);
    check_bounds(buf, offset, 5);
    buf.writeInt32LE(val & -1, offset);
    buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
}
module.exports.writeInt40LE = writeInt40LE;

function readInt48LE(buf, offset) {
    return buf.readInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readInt48LE = readInt48LE;

function writeInt48LE(buf, val, offset) {
    val = check_value(val, -0x800000000000, 0x7fffffffffff);
    check_bounds(buf, offset, 6);
    buf.writeInt32LE(val & -1, offset);
    buf.writeInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
}
module.exports.writeInt48LE = writeInt48LE;

function readInt56LE(buf, offset) {
    return (((buf.readInt8(offset + 6) || 0) << 16) + buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readInt56LE = readInt56LE;

function writeInt56LE(buf, val, offset) {
    val = check_value(val, -0x80000000000000, 0x7fffffffffffff);
    check_bounds(buf, offset, 7);

    if (val < 0x80000000000000) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 0xffff, offset + 4);
        buf.writeInt8(hi >> 16, offset + 6);
    } else {
        // Special case because 2^55-1 gets rounded up to 2^55
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0x7f;
    }
}
module.exports.writeInt56LE = writeInt56LE;

function readInt64LE(buf, offset) {
    return buf.readInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}
module.exports.readInt64LE = readInt64LE;

function writeInt64LE(buf, val, offset) {
    val = check_value(val, -0x8000000000000000, 0x7fffffffffffffff);
    check_bounds(buf, offset, 8);

    if (val < 0x8000000000000000) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    } else {
        // Special case because 2^55-1 gets rounded up to 2^55
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
        buf[offset+7] = 0x7f;
    }
}
module.exports.writeInt64LE = writeInt64LE;


/***/ }),

/***/ 2016:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
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
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __nccwpck_require__(4300).Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),

/***/ 4786:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

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
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(509)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 509:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(6269);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
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
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
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

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 3510:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(4786);
} else {
	module.exports = __nccwpck_require__(9923);
}


/***/ }),

/***/ 9923:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(6224);
const util = __nccwpck_require__(3837);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(3857);

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
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(509)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 8113:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 3500:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

try {
  var util = __nccwpck_require__(3837);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __nccwpck_require__(9718);
}


/***/ }),

/***/ 9718:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 9475:
/***/ ((module) => {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 6269:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
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
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 6164:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encode(key);
      value = encode(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),

/***/ 7683:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(949)


/***/ }),

/***/ 949:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


/*<replacement>*/
var util = __nccwpck_require__(2016);
util.inherits = __nccwpck_require__(3500);
/*</replacement>*/

var Readable = __nccwpck_require__(7671);
var Writable = __nccwpck_require__(6038);

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

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(this.end.bind(this));
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}


/***/ }),

/***/ 2734:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = __nccwpck_require__(3050);

/*<replacement>*/
var util = __nccwpck_require__(2016);
util.inherits = __nccwpck_require__(3500);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};


/***/ }),

/***/ 7671:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;

/*<replacement>*/
var isArray = __nccwpck_require__(9475);
/*</replacement>*/


/*<replacement>*/
var Buffer = (__nccwpck_require__(4300).Buffer);
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = (__nccwpck_require__(2361).EventEmitter);

/*<replacement>*/
if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

var Stream = __nccwpck_require__(2781);

/*<replacement>*/
var util = __nccwpck_require__(2016);
util.inherits = __nccwpck_require__(3500);
/*</replacement>*/

var StringDecoder;


/*<replacement>*/
var debug = __nccwpck_require__(3837);
if (debug && debug.debuglog) {
  debug = debug.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/


util.inherits(Readable, Stream);

function ReadableState(options, stream) {
  var Duplex = __nccwpck_require__(949);

  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = (__nccwpck_require__(7206)/* .StringDecoder */ .s);
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  var Duplex = __nccwpck_require__(949);

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (util.isString(chunk) && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (util.isNullOrUndefined(chunk)) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
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



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = (__nccwpck_require__(7206)/* .StringDecoder */ .s);
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
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
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (!util.isNumber(n) || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
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

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (!util.isNull(ret))
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
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

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
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
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
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
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
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
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    process.nextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      debug('false write response, pause',
            src._readableState.awaitDrain);
      src._readableState.awaitDrain++;
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];



  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        var self = this;
        process.nextTick(function() {
          debug('readable nexttick read 0');
          self.read(0);
        });
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    if (!state.reading) {
      debug('resume read 0');
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
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

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

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}


/***/ }),

/***/ 3050:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = __nccwpck_require__(949);

/*<replacement>*/
var util = __nccwpck_require__(2016);
util.inherits = __nccwpck_require__(3500);
/*</replacement>*/

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
    return stream.emit('error', new Error('no writecb in Transform class'));

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

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('prefinish', function() {
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

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}


/***/ }),

/***/ 6038:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;

/*<replacement>*/
var Buffer = (__nccwpck_require__(4300).Buffer);
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = __nccwpck_require__(2016);
util.inherits = __nccwpck_require__(3500);
/*</replacement>*/

var Stream = __nccwpck_require__(2781);

util.inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  var Duplex = __nccwpck_require__(949);

  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

function Writable(options) {
  var Duplex = __nccwpck_require__(949);

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  process.nextTick(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
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
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (!util.isFunction(cb))
    cb = function() {};

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

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.buffer.length)
      clearBuffer(this, state);
  }
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      util.isString(chunk)) {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (util.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
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
  stream.emit('error', er);
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
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.buffer.length) {
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

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  if (stream._writev && state.buffer.length > 1) {
    // Fast case, write everything using _writev()
    var cbs = [];
    for (var c = 0; c < state.buffer.length; c++)
      cbs.push(state.buffer[c].callback);

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
    state.buffer = [];
  } else {
    // Slow case, write chunks one-by-one
    for (var c = 0; c < state.buffer.length; c++) {
      var entry = state.buffer[c];
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);

      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
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
  cb(new Error('not implemented'));

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

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
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
      stream.once('finish', cb);
  }
  state.ended = true;
}


/***/ }),

/***/ 6450:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(2734)


/***/ }),

/***/ 4685:
/***/ ((module) => {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),

/***/ 4818:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-disable node/no-deprecated-api */
var buffer = __nccwpck_require__(4300)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 7206:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = (__nccwpck_require__(4300).Buffer);

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.s = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
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


/***/ }),

/***/ 3857:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const os = __nccwpck_require__(2037);
const tty = __nccwpck_require__(6224);
const hasFlag = __nccwpck_require__(8113);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
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

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 4798:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(8517);


/***/ }),

/***/ 8517:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


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
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
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
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 6521:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var required = __nccwpck_require__(4685)
  , qs = __nccwpck_require__(6164)
  , controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/
  , CRHTLF = /[\n\r\t]/g
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , port = /:\d+$/
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
  , windowsDriveLetter = /^[a-zA-Z]:/;

/**
 * Remove control characters and whitespace from the beginning of a string.
 *
 * @param {Object|String} str String to trim.
 * @returns {String} A new string representing `str` stripped of control
 *     characters and whitespace from its beginning.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(controlOrWhitespace, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address, url) {     // Sanitize what is left of the address
    return isSpecial(url.protocol) ? address.replace(/\\/g, '/') : address;
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d*)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof global !== 'undefined') globalVar = global;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * Check whether a protocol scheme is special.
 *
 * @param {String} The protocol scheme of the URL
 * @return {Boolean} `true` if the protocol scheme is special, else `false`
 * @private
 */
function isSpecial(scheme) {
  return (
    scheme === 'file:' ||
    scheme === 'ftp:' ||
    scheme === 'http:' ||
    scheme === 'https:' ||
    scheme === 'ws:' ||
    scheme === 'wss:'
  );
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @param {Object} location
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, '');
  location = location || {};

  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : '';
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
      rest = match[4]
    }
  }

  if (protocol === 'file:') {
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
    protocol: protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount: slashesCount,
    rest: rest
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, '');

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '', location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (
    extracted.protocol === 'file:' && (
      extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) ||
    (!extracted.slashes &&
      (extracted.protocol ||
        extracted.slashesCount < 2 ||
        !isSpecial(url.protocol)))
  ) {
    instructions[3] = [/(.*)/, 'pathname'];
  }

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address, url);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      index = parse === '@'
        ? address.lastIndexOf(parse)
        : address.indexOf(parse);

      if (~index) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // Default to a / for pathname if none exists. This normalizes the URL
  // to always have a /
  //
  if (url.pathname.charAt(0) !== '/' && isSpecial(url.protocol)) {
    url.pathname = '/' + url.pathname;
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';

  if (url.auth) {
    index = url.auth.indexOf(':');

    if (~index) {
      url.username = url.auth.slice(0, index);
      url.username = encodeURIComponent(decodeURIComponent(url.username));

      url.password = url.auth.slice(index + 1);
      url.password = encodeURIComponent(decodeURIComponent(url.password))
    } else {
      url.username = encodeURIComponent(decodeURIComponent(url.auth));
    }

    url.auth = url.password ? url.username +':'+ url.password : url.username;
  }

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (port.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    case 'username':
    case 'password':
      url[part] = encodeURIComponent(value);
      break;

    case 'auth':
      var index = value.indexOf(':');

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

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.auth = url.password ? url.username +':'+ url.password : url.username;

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , host = url.host
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result =
    protocol +
    ((url.protocol && url.slashes) || isSpecial(url.protocol) ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  } else if (url.password) {
    result += ':'+ url.password;
    result += '@';
  } else if (
    url.protocol !== 'file:' &&
    isSpecial(url.protocol) &&
    !host &&
    url.pathname !== '/'
  ) {
    //
    // Add back the empty userinfo, otherwise the original invalid URL
    // might be transformed into a valid one with `url.pathname` as host.
    //
    result += '@';
  }

  //
  // Trailing colon is removed from `url.host` when it is parsed. If it still
  // ends with a colon, then add back the trailing colon that was removed. This
  // prevents an invalid URL from being transformed into a valid one.
  //
  if (host[host.length - 1] === ':' || (port.test(url.hostname) && !url.port)) {
    host += ':';
  }

  result += host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;

module.exports = Url;


/***/ }),

/***/ 6529:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(1243));

var _v2 = _interopRequireDefault(__nccwpck_require__(5054));

var _v3 = _interopRequireDefault(__nccwpck_require__(1051));

var _v4 = _interopRequireDefault(__nccwpck_require__(682));

var _nil = _interopRequireDefault(__nccwpck_require__(6376));

var _version = _interopRequireDefault(__nccwpck_require__(2146));

var _validate = _interopRequireDefault(__nccwpck_require__(1702));

var _stringify = _interopRequireDefault(__nccwpck_require__(3122));

var _parse = _interopRequireDefault(__nccwpck_require__(6882));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 1539:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 6376:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 6882:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(1702));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 7972:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 2543:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 85:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 3122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(1702));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 1243:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(2543));

var _stringify = _interopRequireDefault(__nccwpck_require__(3122));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 5054:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(7598));

var _md = _interopRequireDefault(__nccwpck_require__(1539));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 7598:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(3122));

var _parse = _interopRequireDefault(__nccwpck_require__(6882));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 1051:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(2543));

var _stringify = _interopRequireDefault(__nccwpck_require__(3122));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(7598));

var _sha = _interopRequireDefault(__nccwpck_require__(85));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 1702:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(7972));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 2146:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(1702));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 4407:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(8434));
const amqplib_1 = __importDefault(__nccwpck_require__(3374));
console.log("amqp created.");
const RABBITMQ_HOST = core.getInput("rabbitmq_host");
const RABBITMQ_VHOSTNAME = core.getInput("rabbitmq_vhostname");
const RABBITMQ_USERNAME = core.getInput("rabbitmq_username");
const RABBITMQ_PASSWORD = core.getInput("rabbitmq_password");
const RABBITMQ_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}/${RABBITMQ_VHOSTNAME}`;
const APP_ID = core.getInput("app_id");
const MESSAGE = core.getInput("message");
const QUEUE_NAME = core.getInput("queue_name");
function checkMsgIsJSON(msg) {
    try {
        JSON.parse(msg);
    }
    catch (error) {
        return false;
    }
    return true;
}
async function main() {
    let connection = null;
    let channel = null;
    const msgIsJSON = checkMsgIsJSON(MESSAGE);
    const msg = msgIsJSON ? JSON.parse(MESSAGE) : MESSAGE;
    const contentType = msgIsJSON ? "application/json" : undefined;
    try {
        console.log("amqp connecting...");
        connection = await amqplib_1.default.connect(RABBITMQ_URL);
        console.log("creating channel");
        channel = await connection.createChannel();
        console.log("asserting channel");
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log("sending message");
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(msg)), {
            appId: APP_ID,
            contentType,
        });
        console.log(" [x] Sent %s", MESSAGE);
    }
    catch (error) {
        console.error(error);
        core.setFailed(error.message);
    }
    finally {
        await channel?.close?.();
        await connection?.close?.();
    }
}
main();


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 4300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 3477:
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 6224:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 3069:
/***/ ((module) => {

"use strict";
module.exports = {"i8":"0.10.3"};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(4407);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;