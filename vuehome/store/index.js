export const state =() =>({
    baseUrl:"",
    activeMenu:"/home"
})
export const mutations = {
    setStorePath(state,path) {
        state.activeMenu=path
    }
  }