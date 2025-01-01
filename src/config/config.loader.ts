import path from 'path';
import fs from 'fs';
import defaultBlogConfig from './default.blog.config';
import { InvaildConfigError } from './error';

const CONFIG_FILE = 'blog.config.ts';

function validateBlogConfig(blogconfig: Partial<BlogConfig>): blogconfig is Partial<BlogConfig> {
    if (blogconfig.postDir == undefined) throw new InvaildConfigError('postdir');
    if (blogconfig.title == undefined) throw new InvaildConfigError('title');
    if (blogconfig.url == undefined) throw new InvaildConfigError('url');

    return true;
}

async function loadConfig(): Promise<BlogConfig> {
    const configPath = path.resolve(process.cwd(), CONFIG_FILE);

    if (fs.existsSync(configPath)) {
        try {
            const { default: userConfig } = await import(configPath);

            if (!validateBlogConfig(userConfig))
                throw new InvaildConfigError('required field');

            const filteredConfig = Object.fromEntries(
                Object.entries(userConfig).filter(([, value]) => value !== undefined)
            );

            const blogConfig: BlogConfig = {
                ...defaultBlogConfig,
                ...filteredConfig
            };

            return blogConfig;
        } catch (err) {
            if (err instanceof InvaildConfigError) {
                console.error(`"${CONFIG_FILE}"의 형식이 잘못되었습니다. 올바른 옵션을 사용하세요.`);
            }
            else if (err instanceof Error) {
                console.error(`"${CONFIG_FILE}"이 존재하지 않습니다.:`, err);
            }
            process.exit(1);
        }
    }
    return defaultBlogConfig;
}

const BlogConfig = await loadConfig();

export default BlogConfig;
