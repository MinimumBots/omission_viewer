import path from 'path';

const pathResolver = (filename: string) => path.resolve(__dirname, `../../resource/${filename}`);

export class ResourcePath {
  public static readonly settings: string = pathResolver('settings.yml');
  public static readonly translate: string = pathResolver('translate.yml');
}
