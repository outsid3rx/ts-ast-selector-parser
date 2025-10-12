const { configure, presets } = require('eslint-kit')

module.exports = {
  ...configure({
    root: __dirname,
    extends: '../../.eslintrc.cjs',
    presets: [
      presets.react(),
      presets.typescript({
        tsconfig: './tsconfig.app.json',
      }),
    ],
  }),
}
