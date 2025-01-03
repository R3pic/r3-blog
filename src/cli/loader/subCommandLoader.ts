import type { Command } from 'commander';
import { CategoryCommand } from '../command/category';
import { PostCommand } from '../command/post';
import { HELP_CONFIGURATION } from '../ui';

export class SubCommandLoader {
    public static load(program: Command) {
        program.configureHelp(HELP_CONFIGURATION);
        new CategoryCommand().register(program);
        new PostCommand().register(program);
    }
}