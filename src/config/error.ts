class ConfigError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export class InvaildConfigError extends ConfigError {
    constructor(field: string) {
        super(`Config에 ${field} 속성이 존재하지 않습니다.`);
    }
}