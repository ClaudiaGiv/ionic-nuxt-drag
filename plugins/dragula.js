import Vue from 'vue'

// console.log('VueDragula11', process)
// console.log('VueDragula11', process.server)
// console.log('VueDragula11', process.BROWSER_BUILD)

import { Vue2Dragula } from 'vue2-dragula'

console.log('VueDragula', Vue2Dragula)
Vue.use(Vue2Dragula, {
  logging: {
    // directive: true,
    // plugin: true,
    service: true,
    // dragHandler: true,
    // modelManager: true,
  },
})

// if (process.browser) {
//   const Vue2Dragula = require('vue2-dragula')
//   console.log('VueDragula', Vue2Dragula)
//   Vue.use(Vue2Dragula, {
//     logging: {
//       directive: true,
//       plugin: true,
//       service: true,
//       dragHandler: true,
//       modelManager: true,
//     },
//   })
// }
