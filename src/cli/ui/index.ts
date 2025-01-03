import chalk from 'chalk';
export { CategorySelector } from './CategorySelector';
export * from './message';
export { HELP_CONFIGURATION } from './helpConfiguration';

const styles = {
    prefix: chalk.bold.green.bgGreenBright,
    errorPrefix: chalk.bold.red.bgRedBright,
    warnPrefix: chalk.bold.yellow.bgYellowBright,
    error: chalk.red,
    warn: chalk.yellow,
    success: chalk.blueBright
};

const PREFIX = styles.prefix('[R3 Blog CLI]');
const ERROR_PREFIX = styles.errorPrefix('[R3 Blog CLI]');
const WARN_PREFIX = styles.warnPrefix('[R3 Blog CLI]');

function errMsg(msg: string) {
    console.error(`${ERROR_PREFIX} ${styles.error(msg)}`);
}

function warnMsg(msg: string) {
    console.warn(`${WARN_PREFIX} ${styles.warn(msg)}`);
}

function successMsg(msg: string) {
    console.log(`${PREFIX} ${styles.success(msg)}`);
}

export const show = {
    errMsg,
    warnMsg,
    successMsg
};