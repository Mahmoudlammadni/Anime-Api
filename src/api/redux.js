const initialstate={
    mylist:[],plus_info:[]
}
const reduu =(state=initialstate,action)=>{
    switch (action.type) {
        case 'add':
            if (!state.mylist.includes(action.payload)) {
                 return {...state,mylist:[...state.mylist,action.payload]}
            }
            case 'add2':
               return {...state,plus_info:[action.payload]}

            
            
        default:
            return state
    }
}
export default reduu