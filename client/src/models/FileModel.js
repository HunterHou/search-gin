export default {
    namespace:"files",
    state:[],
    reducers:{
        'delete'(state, { payload: id }){
            return state.filter(item=>item.id !== id)
        },
    }
}