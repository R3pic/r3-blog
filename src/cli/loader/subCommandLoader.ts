import type { Command } from 'commander';
import { CategoryCommand } from '../command/category';
import { PostCommand } from '../command/post';

export class SubCommandLoader {
    public static load(program: Command) {
        new CategoryCommand().register(program);
        new PostCommand().register(program);
    }
}