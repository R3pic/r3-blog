import chalk from 'chalk';

const styles = {
    prefix: chalk.bold.green.bgGreenBright,
    errorPrefix: chalk.bold.red.bgRedBright,
    error: chalk.red,
    success: chalk.blueBright
};

const PREFIX = styles.prefix('[R3 Blog CLI]');
const ERROR_PREFIX = styles.errorPrefix('[R3 Blog CLI]');

function errMsg(msg: string) {
    console.error(`${ERROR_PREFIX} ${styles.error(msg)}`);
}

function successMsg(msg: string) {
    console.log(`${PREFIX} ${styles.success(msg)}`);
}

export const show = {
    errMsg,
    successMsg
};