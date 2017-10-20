import * as Api from "../utils/api";

export const SET_DECKS = 'SET_DECKS';

export const getDecks = () => dispatch => {
    return Api.getDecks().then((decks) => dispatch(setDecks(decks)))
}

export function setDecks(decks) {
    return {
        type: SET_DECKS,
        decks
    };
}
