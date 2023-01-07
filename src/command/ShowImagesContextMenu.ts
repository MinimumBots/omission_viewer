import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import { ImplementedContextMenu } from '../base/ImplementedContextMenu.js';
import { Locales } from '../common/Locales.js';
import { TranslateCode } from '../constant/TranslateCode.js';
import { Translate } from '../common/Translate.js';

import { ContextMenuCommandInteraction } from 'discord.js';

export class ShowImagesContextMenu extends ImplementedContextMenu {
	public static readonly singleton = new this();

	protected override readonly name: string = ShowImagesContextMenu.name;

	protected override readonly nameLocalizations = Locales.buildLocalizations(
		(locale) => Translate.do(TranslateCode.CMD00001, {}, locale)
	);

	public override builder = new ContextMenuCommandBuilder()
			.setName(this.name)
			.setType(ApplicationCommandType.Message)
			.setDMPermission(false)
			.setNameLocalizations(this.nameLocalizations);

	public override match(interaction: ContextMenuCommandInteraction): boolean {
		return interaction.commandName === this.name;
	}
}
