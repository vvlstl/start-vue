import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'

function expandLessImportsVirtual(): Plugin {
    return {
        name: 'expand-less-imports-virtual',
        enforce: 'pre',
        load(id: string) {
            if (id.endsWith('src/css/styles.less')) {
                const filePath = path.resolve(id)
                let content = fs.readFileSync(filePath, 'utf8')

                const pattern = /@import\s+"([^"]*\*\*[^"]*)";/g
                let match: RegExpExecArray | null
                while ((match = pattern.exec(content)) !== null) {
                    const globPattern = path.resolve(path.dirname(filePath), match[1])
                    const files = glob.sync(globPattern.replace(/\\/g, '/'))

                    const imports = files
                        .map((f: string) => `@import "${path.relative(path.dirname(filePath), f).replace(/\\/g, '/')}";`)
                        .join('\n')

                    content = content.replace(match[0], imports)
                }

                return content
            }
        }
    }
}

export default defineConfig({
    plugins: [
        vue(),
        expandLessImportsVirtual()
    ],
    build: {
        outDir: 'build'
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
})
