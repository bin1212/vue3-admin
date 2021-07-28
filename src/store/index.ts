import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import app, { IAppState } from './modules/app'
import createPersistedState from 'vuex-persistedstate'

export interface IRootState {
  app: IAppState
}

export const key: InjectionKey<Store<IRootState>> = Symbol()

const persistedstate = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app',
  paths:['app.sidebar.opened','app.size']
})

export default createStore<IRootState>({
  plugins: [
    persistedstate
  ],
  getters,
  modules: {
    app
  }
})
 export function useStore () {
   return baseUseStore(key)
 }