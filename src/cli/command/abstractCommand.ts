import chalk from 'chalk';
import { Command } from 'commander';

export abstract class AbstractCommand extends Command {
    constructor(name: string) {
        super(name);
    }

    register(program: Command) {
        program.addCommand(this);
        this.configureHelp({
            styleTitle: (str: string) => chalk.greenBright(str),
            styleCommandText: (str: string) => chalk.greenBright(str),
            styleCommandDescription: (str: string) => chalk.greenBright(str),
            styleOptionText: (str: string) => chalk.greenBright(str),
            styleOptionDescription: (str: string) => chalk.greenBright(str),
            styleSubcommandText: (str: string) => chalk.greenBright(str),
            styleSubcommandDescription: (str: string) => chalk.greenBright(str),
            styleArgumentText: (str: string) => chalk.greenBright(str),
            styleArgumentDescription: (str: string) => chalk.greenBright(str)            
        });
    }
}