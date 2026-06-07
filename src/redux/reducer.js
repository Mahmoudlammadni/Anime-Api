const initialstate={
    mylist:[],plus_info:[]
}
const reduu =(state=initialstate,action)=>{
    switch (action.type) {
        case 'add':
            if (!state.mylist.includes(action.payload)) {
                 return {...state,mylist:[...state.mylist,action.payload]}
            }
            break;
        case 'add2':
               return {...state,plus_info:[action.payload]}

            case 'remove':
               return {...state,mylist:state.mylist.filter((item)=>item.mal_id!==action.payload.mal_id)}
               
        default:
            return state
    }
}
export default reduu
