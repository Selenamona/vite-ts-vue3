/**
 * 参考：https://next.vuex.vuejs.org/zh/guide/typescript-support.html
 */

import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'


// 为 store state 声明类型
export interface State {
  count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 443
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
