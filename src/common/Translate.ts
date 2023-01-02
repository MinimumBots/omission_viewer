import i18n from 'i18n';
import { readFileSync } from 'fs';
import { ResourcePath } from '../constant/ResourcePath.js';
import { Settings } from './Settings.js';
import YAML from 'yaml';

import type { GlobalCatalog, Replacements } from 'i18n';

const catalog: GlobalCatalog = YAML.parse(readFileSync(ResourcePath.translate, 'utf-8'));

i18n.configure({
	locales: ['ja', 'en-US'],
	defaultLocale: 'en-US',
	retryInDefaultLocale: true,
	updateFiles: false,
	staticCatalog: catalog
});

export class Translate {
	public static do(phrase: string, replacements?: Replacements, locale?: string): string {
		return i18n.__({ phrase, locale: locale ?? Settings.locale }, replacements ?? {});
	}
}
