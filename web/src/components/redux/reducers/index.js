import { combineReducers } from 'redux';
import {
  OPEN_MENU, CLOSE_MENU, SET_TITLE
} from '../actions';


function menu(state = {
     openMenu: false
}, action) {
    switch (action.type) {
        case OPEN_MENU :
            return {
                ...state,
                openMenu: true,
            };

        case CLOSE_MENU :
            return {
                ...state,
                openMenu: false,
            };

        default :
            return state;
    }
}

function slide(state = {
    title: undefined
}, action) {
    switch (action.type) {
        case SET_TITLE :
            return {
                ...state,
                title: action.title,
            };
        
        default :
            return state;
    }
}

const rootReducer = combineReducers({
  menu,
  slide
});

export default rootReducer;