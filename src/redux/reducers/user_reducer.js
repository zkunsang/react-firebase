import {
    SET_USER
} from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
}

export default function reducer(state = initialUserState, action) {
    switch (action.type) {
        case SET_USER:
            console.log("SET_USER");
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}