import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {expandLessImportsVirtual} from "./src/plugins/expandLessImportsVirtual.ts";

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
    },
    server: {
        port: 3000
    },
})
