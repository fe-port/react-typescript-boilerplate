import path from 'path'
import fs from 'fs-extra'
import { ENTRY_PATH } from '../../config/constants'

export const srcAlias = fs
  .readdirSync(ENTRY_PATH)
  .filter(i => !/\.[a-z]+$/.test(i))
  .reduce(
    (obj, dir) => {
      // @ts-ignore
      obj[`@/${dir}`] = path.resolve(ENTRY_PATH, `./${dir}`)
      return obj
    },
    {
      '@ant-design/icons/lib/dist$': path.resolve(
        ENTRY_PATH,
        './utils/antd-icons'
      )
    }
  )
