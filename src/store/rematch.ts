import {
  init,
  RematchDispatch,
  RematchRootState,
  Models,
  ModelEffects,
  ModelConfig
} from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import { createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { models } from '../models/rematch'

export type ExtractRematchLoadingFromEffectObject<
  effects extends ModelEffects<unknown>
> = { [effectKey in keyof effects]: boolean }

export type ExtractRematchLoadingFromEffects<
  effects extends ModelConfig['effects']
> = effects extends (...args: unknown[]) => infer R
  ? R extends ModelEffects<unknown>
    ? ExtractRematchLoadingFromEffectObject<R>
    : { [key: string]: unknown }
  : effects extends ModelEffects<unknown>
  ? ExtractRematchLoadingFromEffectObject<effects>
  : { [key: string]: unknown }

interface LoadingState<M extends Models> {
  loading: {
    global: boolean
    models: { [k in keyof M]: boolean }
    effects: {
      [k in keyof M]: ExtractRematchLoadingFromEffects<M[k]['effects']>
    }
  }
}

export const history = createBrowserHistory()
const reducers = { router: connectRouter(history) }

const loadingPlugin = createLoadingPlugin({ asNumber: true })

const plugins = [loadingPlugin]

// if (typeof process.env.rematch === 'object' && process.env.rematch.persist) {
//   const createPersistPlugin = require('@rematch/persist')
//   const persistPlugin = createPersistPlugin({
//     // whitelist: [],
//     throttle: 5000,
//     version: 1
//   })
//   plugins.push(persistPlugin)
// }

// @ts-ignore
// if (typeof process.env.rematch === 'object' && process.env.rematch.select) {
//   const createSelectPlugin = require('@rematch/select')
//   const selectPlugin = createSelectPlugin()
//   plugins.push(selectPlugin)
// }

const enhancers = []

// if (process.env.Reactotron) {
//   // const Reactotron = require('ReactotronConfig')
//   // enhancers.push(Reactotron.createEnhancer())
// }

export const store = init({
  redux: {
    reducers,
    middlewares: [routerMiddleware(history)],
    createStore,
    enhancers
  },
  models,
  plugins
})

export const { dispatch } = store

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type iRootState = RematchRootState<typeof models> &
  LoadingState<typeof models>
// RematchDispatch<RootModel>
// export type RootState = RematchRootState<RootModel> & LoadingState<RootModel>
