import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathResolver = (filename: string) => path.resolve(__dirname, `../../resource/${filename}`);

export class ResourcePath {
	public static readonly settings: string = pathResolver('settings.yml');
	public static readonly translate: string = pathResolver('translate.yml');
	public static readonly command: string = pathResolver('command.yml');
}
