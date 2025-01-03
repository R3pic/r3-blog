type TemplateContext<T> = {
    [K in keyof T]: undefined extends T[K] ? string | undefined : string;
};