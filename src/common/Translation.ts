import { I18n } from 'i18n-js';
import { readFileSync } from 'fs';
import { ResourcePath } from '../constant/ResourcePath.js';
import { Settings } from './Settings.js';
import YAML from 'yaml';

import type { Dict } from 'i18n-js';
import type { TranslateOptions } from 'i18n-js/typings/typing.js';

export class Translation {
	private static readonly dict: Dict = YAML.parse(readFileSync(ResourcePath.translate, 'utf-8'));

	public static do(scope: string, options?: TranslateOptions, locale?: string): string {
		const translator: I18n = new I18n(this.dict, { defaultLocale: 'en-US' });

		translator.locale = locale ?? Settings.locale;

		return translator.t(scope, options);
	}
}
