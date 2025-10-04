import type {Plugin} from 'vite';
import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';

export function expandLessImportsVirtual(): Plugin {
  return {
    name: 'expand-less-imports-virtual',
    enforce: 'pre',

    load(id: string) {
      if (!id.endsWith('.less') || id.includes('node_modules')) {
        return
      }

      const filePath = path.resolve(id);
      let content = fs.readFileSync(filePath, 'utf8');

      const pattern = /@import\s+"([^"]*\*[^"]*)";/g
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(content)) !== null) {
        const globPattern = path.resolve(path.dirname(filePath), match[1]);

        const files = glob.sync(globPattern.replace(/\\/g, '/'))
        if (!files.length) continue;

        const imports = files
          .map(file =>
            `@import "${path
              .relative(path.dirname(filePath), file)
              .replace(/\\/g, '/')}";`
          ).join('\n');

        content = content.replace(match[0], imports);
      }

      return content;
    }
  }
}
