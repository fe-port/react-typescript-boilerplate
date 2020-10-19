import { createModel } from '@rematch/core'
import { push } from 'connected-react-router'

export interface GlobalState {
  global: { [key: string]: unknown } | null
}

const INITIAL_STATE: GlobalState = {
  global: null
}

export default createModel({
  state: INITIAL_STATE,
  reducers: {
    updateState: (state: GlobalState, payload: GlobalState) => ({
      ...state,
      ...payload
    })
  },
  effects: dispatch => ({
    async asyncRequest() {
      dispatch(push('/about'))
    }
  })
})
