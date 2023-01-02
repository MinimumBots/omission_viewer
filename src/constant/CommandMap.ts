import { ImplementedCommand } from '../base/ImplementedCommand';
import { ShowImagesContextMenu } from '../command/ShowImagesContextMenu';

export const CommandMap: Map<string, ImplementedCommand> = new Map();

CommandMap.set(ShowImagesContextMenu.name, ShowImagesContextMenu.singleton);
