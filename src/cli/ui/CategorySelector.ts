import chalk from 'chalk';
import fs from 'fs';
import fileSelector from 'inquirer-file-selector';

export async function CategorySelector(basePath: string) {
    return await fileSelector(
        {
            message: '게시글이 작성될 카테고리를 선택하세요 :',
            basePath,
            type: 'directory',
            loop: true,
            emptyText: '하위 카테고리가 없습니다',
            filter: (file) => {
                if (file.isDirectory()) {
                    const filesInDir = fs.readdirSync(file.path);
                    return filesInDir.includes('_index.md');
                }
                return false;
            },
            theme: {
                style: {
                    active: (text: string) => chalk.yellow(text),
                    currentDir: (text: string) => chalk.yellow(text),
                    directory: (text: string) => chalk.gray(text)
                }
            }
        }
    );
}