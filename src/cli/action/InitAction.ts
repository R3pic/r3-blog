import { AbstractAction } from './AbstractAction';

export class InitAction extends AbstractAction {
    handle(): never {
        console.log('콘피그 파일 생성하기');
        process.exit(0);
    }
}