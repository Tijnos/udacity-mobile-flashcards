import {
    SET_DECKS
} from "../actions/index";

function decks(state = {}, action) {
    switch(action.type) {
        case SET_DECKS:
            return action.decks;
        default:
            return state;
    }
}

export default decks;