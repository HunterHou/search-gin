import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';

Vue.use(Element, { locale })
Vue.use(ElementTiptapPlugin, {
    locale
  });
