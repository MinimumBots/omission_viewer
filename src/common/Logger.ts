import log4js from 'log4js';
import { Settings } from './Settings.js';

const logName = `${Settings.applicationName} [${process.env['SHARDS'] ?? 'NO SHARDING'}]`;

log4js.configure({
	appenders: {
		[logName]: { type: 'console' },
	},
	categories: {
		default: { appenders: [logName], level: Settings.loggingLevel },
	},
});

export const Logger = log4js.getLogger(logName);
