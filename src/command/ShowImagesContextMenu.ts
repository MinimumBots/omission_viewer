import { ContextMenuCommandBuilder, ContextMenuCommandInteraction, ApplicationCommandType, LocalizationMap } from 'discord.js';
import { Translation } from '../common/Translation';
import { Locales } from '../common/Locales';
import { TranslateCode } from '../constant/TranslateCode';
import { ImplementedContextMenu } from '../interface/ImplementedContextMenu';

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
