const path = require('path');
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
module.exports = {
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'vant',
                    esModule: true,
                    resolveStyle: (name) => `vant/es/${name}/style`,
                },
            ],
        }),
    ],
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
    server: {
        host: '127.0.0.1',
        port: 3002,
        open: true,
        https: false,
        proxy: {

            '/api': 'http://127.0.0.1:9502/'
        }
    },
    base: './', // 生产环境下的公共路径
    outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
};