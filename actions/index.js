import * as Api from "../utils/api";

export const SET_DECKS = 'SET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export const getDecks = () => dispatch => {
    Api.getDecks().then((decks) => dispatch(setDecks(decks)))
};

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    };
}

export function setDecks(decks) {
    return {
        type: SET_DECKS,
        decks
    };
}

export function addCard(deckTitle, question, answer) {
    return {
        type: ADD_CARD,
        deckTitle,
        question,
        answer
    };
}
