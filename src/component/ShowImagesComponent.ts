import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { ImplementedComponent } from '../interface/ImplementedComponent.js';
import { TranslateCode } from '../constant/TranslateCode.js';
import { Translation } from '../common/Translation.js';

import type { ButtonInteraction } from 'discord.js';

export class ShowImagesComponent extends ImplementedComponent {
	protected override readonly customId = ShowImagesComponent.name;

	public override build(imageCount: number, locale: string): ButtonBuilder {
		return new ButtonBuilder()
			.setStyle(ButtonStyle.Success)
			.setCustomId(this.customId)
			.setLabel(Translation.do(TranslateCode.L0000002, { imageCount: `${imageCount}` }, locale));
	}

	public override match(interaction: ButtonInteraction): boolean {
		return interaction.customId === this.customId;
	}
}
