import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'

export function expandLessImportsVirtual(): Plugin {
    return {
        name: 'expand-less-imports-virtual',
        enforce: 'pre',

        load(id: string) {
            // только .less, игнорим node_modules
            if (!id.endsWith('.less') || id.includes('node_modules')) {
                return
            }

            const filePath = path.resolve(id)
            let content = fs.readFileSync(filePath, 'utf8')

            // ищем импорты с glob-паттернами
            const pattern = /@import\s+"([^"]*\*[^"]*)";/g
            let match: RegExpExecArray | null

            while ((match = pattern.exec(content)) !== null) {
                const globPattern = path.resolve(path.dirname(filePath), match[1])

                const files = glob.sync(globPattern.replace(/\\/g, '/'))
                if (!files.length) continue

                const imports = files
                    .map(f =>
                        `@import "${path
                            .relative(path.dirname(filePath), f)
                            .replace(/\\/g, '/')}";`
                    )
                    .join('\n')

                content = content.replace(match[0], imports)
            }

            return content
        }
    }
}
