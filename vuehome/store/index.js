export const state =() =>({
    baseUrl:"",
    activePage:"/home"
})
export const mutations = {
    setStorePath(state,path) {
        // console.log("store",path)
        state.activePage=path
    }
  }