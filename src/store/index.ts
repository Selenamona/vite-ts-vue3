/**
 * 参考：https://next.vuex.vuejs.org/zh/guide/typescript-support.html
 */

import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export enum DeviceType {
  Mobile,
  Desktop,
}

// 为 store state 声明类型
export interface State {
  device: DeviceType,
  count: number,
  name: string,
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}
export const state: State = {
  device: DeviceType.Desktop,
  count: 0,
  name: "2",
  sidebar: {
    opened: false,
    withoutAnimation: true
  }
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: state,
  mutations: {
    increment(state: State) {
      state.count++;
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
