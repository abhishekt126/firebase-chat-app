const iState = {
    msgList: []
}

const firstReducer = (state=iState, action)=>{
    if(action.type === 'UPDATE'){
        return ({
            ...state,
            msgList: action.payload
        })
    }
    return state;
}

export default firstReducer;