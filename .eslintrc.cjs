const { configure, presets } = require('eslint-kit')

module.exports = configure({
  presets: [
    presets.node(),
    presets.typescript(),
    presets.imports({
      sort: {
        newline: true,
      },
    }),
    presets.prettier(),
  ],
})
