import { Dict, I18n } from 'i18n-js';
import { Settings } from './Settings';
import { readFileSync } from 'fs';
import { ResourcePath } from '../constant/ResourcePath';
import YAML from 'yaml';

import type { TranslateOptions } from 'i18n-js/typings/typing';

export class Translation {
	private static readonly dict: Dict = YAML.parse(readFileSync(ResourcePath.translate, 'utf-8'));

	public static do(scope: string, options?: TranslateOptions, locale?: string): string {
		const i18n: I18n = new I18n(this.dict, { defaultLocale: 'en-US' });

		i18n.locale = locale ?? Settings.locale;

		return i18n.t(scope, options);
	}
}
