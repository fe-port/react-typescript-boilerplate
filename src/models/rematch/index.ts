import { Models } from '@rematch/core'
import global from './global'

export interface RootModel extends Models {
  global: typeof global
}

export const models: RootModel = { global }
