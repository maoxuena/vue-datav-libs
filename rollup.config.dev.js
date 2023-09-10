const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')

const inputPath = path.resolve(__dirname, './src/index.js')
const outputUmdPath = path.resolve(__dirname, './dist/snow.datav.js')
const outputEsPath = path.resolve(__dirname, './dist/snow.datav.es.js')

module.exports = {
  input: inputPath,
  output: [
    {
      file: outputUmdPath,
      format: 'umd', // 输出的模块协议
      name: 'snowDataV', // 模块名称
      globals: {
        vue: 'vue',
        crypto: 'crypto'
      }
    }, {
      file: outputEsPath,
      format: 'es', // 输出的模块协议
      name: 'snowDataV', // 模块名称
      globals: {
        vue: 'vue',
        crypto: 'crypto'
      }
    }
  ],
  plugins: [
    vue(), // 打包.vue文件中的<template>
    resolve({
      preferBuiltins: true
    }), // 解决第三方依赖打包问题
    commonjs(), // commonjs语法模块
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        ['@babel/transform-runtime', {
          regenerator: true
        }]
      ]
    }),// 将es6最新语法转换为原始js
    json(), // 正确实现json文件打包
    postcss({
      plugins: []
    }) // 打包.vue文件中的<style>
  ],
  external: ['vue', 'echarts']
}