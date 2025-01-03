import { Command } from 'commander';
import { HELP_CONFIGURATION } from '../ui';

export abstract class AbstractCommand extends Command {
    constructor(name: string) {
        super(name);
    }

    register(program: Command) {
        program.addCommand(this);
        this.configureHelp(HELP_CONFIGURATION);
    }
}