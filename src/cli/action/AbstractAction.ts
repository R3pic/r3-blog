export abstract class AbstractAction<T = void> {
    abstract handle(ctx: T): never;
}