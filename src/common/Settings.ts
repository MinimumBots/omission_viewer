import { readFileSync } from 'fs';
import { ResourcePath } from '../constant/ResourcePath.js';
import YAML from 'yaml';

export class Settings {
	private static readonly settings: { [key: string]: any } = YAML.parse(readFileSync(ResourcePath.settings, 'utf-8'));

	public static readonly applicationName: string = this.settings['applicationName'];
	public static readonly loggingLevel: string = this.settings['loggingLevel'];
	public static readonly locale: string = this.settings['locale'];
	public static readonly presenceMessage: string = this.settings['presenceMessage'];
}
