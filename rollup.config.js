
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {eslint} from 'rollup-plugin-eslint'
import {uglify} from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
// 配置服务
// import liveServer from 'rollup-plugin-live-server'
// import serve from 'rollup-plugin-serve'
// import livereload from 'rollup-plugin-livereload'
const mode = process.env.NODE_ENV
// const isWatch = process.env.ROLLUP_WATCH
// const isProd = mode === 'production'
export default {
  input: 'index.js',  // 入口文件
  output: {
    file: 'dist/soImgPreload.js',
    format: 'umd',
    name: 'soImgPreload',
    globals: {},
    sourcemap: true
  },
  plugins: [ // 增加 plugins
    resolve(),
    commonjs(),
    eslint(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(mode)
    }),
    babel({
      exclude: 'node_modules/**' // 不对node_modules进行编译
    }),
    // !isProd && serve({
    //   open: true,
    //   contentBase: './sandbox',
    //   historyApiFallback: true,
    //   host: 'localhost',
    //   port: 10001,
    // }),
    // !isProd && livereload(),
    uglify({
      // comments: "all",
      output: {
        // 最紧凑的输出
        // beautify: false,
        // 删除所有的注释
        // comments: ['all'],
      },
      warnings: false,
      compress: {
        // comments: ['all'],
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      }
    })
  ]
}
