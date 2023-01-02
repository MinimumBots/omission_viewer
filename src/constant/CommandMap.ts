import { ShowImagesContextMenu } from '../command/ShowImagesContextMenu.js';

import type { ImplementedCommand } from '../base/ImplementedCommand.js';

export const CommandMap: Map<string, ImplementedCommand> = new Map();

CommandMap.set(ShowImagesContextMenu.name, ShowImagesContextMenu.singleton);
