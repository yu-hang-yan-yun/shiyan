
import ACE from '../views/Formcomponents/myEditor.vue'
export default {
  install: function (Vue, options) {
    // 引号中的字符串就是之后的组件标签名，即 <ace></ace>
    Vue.component('ace', ACE)
  }
}
