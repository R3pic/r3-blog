import chalk from 'chalk';
import type { HelpConfiguration } from 'commander';

export const HELP_CONFIGURATION: HelpConfiguration = {
    styleTitle: (str: string) => chalk.greenBright(str),
    styleCommandText: (str: string) => chalk.greenBright(str),
    styleCommandDescription: (str: string) => chalk.greenBright(str),
    styleOptionText: (str: string) => chalk.greenBright(str),
    styleOptionDescription: (str: string) => chalk.greenBright(str),
    styleSubcommandText: (str: string) => chalk.greenBright(str),
    styleSubcommandDescription: (str: string) => chalk.greenBright(str),
    styleArgumentText: (str: string) => chalk.greenBright(str),
    styleArgumentDescription: (str: string) => chalk.greenBright(str)            
};