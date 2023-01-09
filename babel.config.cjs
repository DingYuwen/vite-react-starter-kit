/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-09 14:20:04
 * @LastEditTime: 2023-01-09 14:25:51
 * @LastEditors: dingyuwen
 * @Description: 
 */
const plugins = [
  ['@babel/plugin-syntax-dynamic-import'],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-transform-runtime'],
  ['@babel/plugin-transform-modules-commonjs'],
]

module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ]
  ],
  compact: true,
  // 这个不设置的话，webpack 魔法注释会被删除，魔法注释用于分包
  comments: true,
  plugins:
    process.env.NODE_ENV === 'production'
      ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
      : plugins,
}
