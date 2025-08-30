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
            // Обрабатываем только .less файлы (без node_modules)
            if (!id.endsWith('.less') || id.includes('node_modules')) {
                return
            }

            const filePath = path.resolve(id)
            let content = fs.readFileSync(filePath, 'utf8')

            // Находим все импорты с glob-паттернами (* или **)
            const pattern = /@import\s+"([^"]*\*[^"]*)";/g
            let match: RegExpExecArray | null

            while ((match = pattern.exec(content)) !== null) {
                const globPattern = path.resolve(path.dirname(filePath), match[1])

                // Находим подходящие файлы
                const files = glob.sync(globPattern.replace(/\\/g, '/'))

                if (!files.length) {
                    continue // нет совпадений — пропускаем
                }

                // Генерируем обычные импорты
                const imports = files
                    .map((f: string) => `@import "${path.relative(path.dirname(filePath), f).replace(/\\/g, '/')}";`)
                    .join('\n')

                // Подменяем в тексте
                content = content.replace(match[0], imports)
            }

            return content
        }
    }
}

export default defineConfig({
    plugins: [
        vue(),
        expandLessImportsVirtual()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
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
