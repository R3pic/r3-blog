import path from 'path';
import fs from 'fs';
import { AbstractAction } from './AbstractAction';
import { isExist } from '@/utils/path';
import { CONFIG_ALREADY_EXIST, show } from '../ui';

export class InitAction extends AbstractAction {
    handle(): never {
        const configFilePath = path.join(process.cwd(), 'blog.config.ts');

        if (isExist(configFilePath)) {
            show.errMsg(CONFIG_ALREADY_EXIST);
            process.exit(1);
        }

        fs.writeFileSync(configFilePath, configContent, { encoding: 'utf-8', flag: 'w' });
        show.successMsg('기본 설정 파일이 생성되었습니다.');
        process.exit(0);
    }
}

const configContent = `
import type { BlogConfig } from 'r3-blog';

const blogConfig: BlogConfig = {
  title: 'R3',
  url: 'https://localhost:3000',
  postDir: '_posts'
};

export default blogConfig;
`.trim();