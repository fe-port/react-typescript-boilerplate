import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export type Langs = 'zh-CN' | 'en-US'

const resources = {
  'zh-CN': {
    translation: require('./zh-CN.json')
  },
  'en-US': {
    translation: require('./en-US.json')
  }
}

export default i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-CN',
  interpolation: {
    escapeValue: false
  }
})
