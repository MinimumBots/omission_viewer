import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import { ImplementedContextMenu } from '../interface/ImplementedContextMenu.js';
import { Locales } from '../common/Locales.js';
import { TranslateCode } from '../constant/TranslateCode.js';
import { Translation } from '../common/Translation.js';

import { ContextMenuCommandInteraction } from 'discord.js';

export class ShowImagesContextMenu extends ImplementedContextMenu {
	protected override readonly name: string = ShowImagesContextMenu.name;

	protected override readonly nameLocalizations = Locales.buildLocalizations(
		(locale) => Translation.do(TranslateCode.L0000001, {}, locale)
	);

	public override build(): ContextMenuCommandBuilder {
		return new ContextMenuCommandBuilder()
			.setName(this.name)
			.setType(ApplicationCommandType.Message)
			.setDMPermission(false)
			.setNameLocalizations(this.nameLocalizations);
	}

	public override match(interaction: ContextMenuCommandInteraction): boolean {
		return interaction.commandName === this.name;
	}
}
