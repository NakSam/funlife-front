const LOGIN = 'userdata/LOGIN';
const INSERT = 'userdata/INSERT';
const REMOVE = 'userdata/REMOVE';
const MESSAGE = 'userdata/MESSAGE';
const SETUSERID = 'userdata/SETUSERID';
const SETUSEREMAIL = 'userdata/SETUSEREMAIL';
const SETLIST = 'userdata/SETLIST';
const COUNT = 'userdata/COUNT';
const RESET = 'userdata/RESET';

export const login = () => ({type: LOGIN, payload:true});
export const insert = (input) => ({type:INSERT, payload:input});
export const remove = (partner) => ({type:REMOVE, payload:partner});
export const message = (msg) => ({type:MESSAGE, payload:msg});
export const userid = (id) => ({type:SETUSERID, payload:id});
export const email = (email) => ({type:SETUSEREMAIL, payload:email});
export const setlist = (conversation) => ({type:SETLIST, payload:conversation});
export const countMessage = (count) => ({type:COUNT, payload:count});
export const countReset = (reset) => ({type:RESET, payload:reset});

const initialState = {isLogin:false, userId:"", email:"", conversation:[], count:0};

const UserData = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, isLogin:action.payload};
        case SETUSERID:
            return {...state, userId:action.payload};
        case SETUSEREMAIL:
            return {...state, email:action.payload};
        case INSERT:
            let temp = {};
            temp[action.paylod.partner] = {photo:action.payload.photo,list:[]}
            return {...state, conversation:{...state.conversation, temp}}; 
        case REMOVE:  
            return {...state, conversation:{...state.conversation.filter(user=> user !== action.payload)}}; 
        case MESSAGE:
            // let target = {};
            for (const key in state.conversation) {
                if (state.conversation[key].partner===action.payload.partner) {
                    state.conversation[key].list.push(action.payload);
                    return {...state, conversation:{...state.conversation}};                    
                }
            }
            return;            
        case SETLIST:            
            state.conversation.push(action.payload);
            return {...state, conversation:[...state.conversation]};
        case COUNT:
            let num = state.count + 1;
            return {...state, count:num};
        case RESET:
            let zero = 0;
            return {...state, count:zero};
        default:
            return state;
    }
}

export default UserData;