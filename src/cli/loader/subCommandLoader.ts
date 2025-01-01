import type { Command } from 'commander';
import { CategoryCommand } from '../command/category';

export class SubCommandLoader {
    public static load(program: Command) {
        new CategoryCommand().register(program);
    }
}