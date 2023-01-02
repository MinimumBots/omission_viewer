import log4js from 'log4js';
import { Settings } from './Settings.js';

log4js.configure({
	appenders: {
		[Settings.applicationName]: { type: 'console' },
	},
	categories: {
		default: { appenders: [Settings.applicationName], level: Settings.loggingLevel },
	},
});

export const Logger = log4js.getLogger(Settings.applicationName);
