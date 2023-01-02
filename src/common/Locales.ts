import type { LocaleString, LocalizationMap } from 'discord.js';

const emptyLocaleMap: Record<LocaleString, string> = {
	'en-US': '',
	'en-GB': '',
	bg: '',
	'zh-CN': '',
	'zh-TW': '',
	hr: '',
	cs: '',
	da: '',
	nl: '',
	fi: '',
	fr: '',
	de: '',
	el: '',
	hi: '',
	hu: '',
	it: '',
	ja: '',
	ko: '',
	lt: '',
	no: '',
	pl: '',
	'pt-BR': '',
	ro: '',
	ru: '',
	'es-ES': '',
	'sv-SE': '',
	th: '',
	tr: '',
	uk: '',
	vi: '',
	id: '',
};

export class Locales {
	public static readonly keys = Object.keys(emptyLocaleMap);

	public static buildLocalizations(factory: (locale: string) => string): LocalizationMap {
		return this.keys.reduce((obj, locale) => Object.assign(obj, { [locale]: factory(locale) }), {});
	}
}
