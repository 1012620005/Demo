//test
import * as types from './types'

export const increment = ({commit}) => {
    commit(types.increment)
}
export const decrement = ({commit}) => {
    commit(types.decrement)
}