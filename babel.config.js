module.exports = {
  // presets: [
  //   ['@vue/cli-plugin-babel/preset', {
  //     polyfills: [
  //       'es.promise',
  //       'es.math'
  //     ]
  //   }]
  // ],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
