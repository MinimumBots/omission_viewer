import { ShowImagesContextMenu } from '../command/ShowImagesContextMenu.js';

import type { ImplementedCommand } from '../constant/typing.js';

export const CommandMap: { [k: string]: ImplementedCommand | undefined } = {
	[ShowImagesContextMenu.name]: ShowImagesContextMenu.singleton,
};
