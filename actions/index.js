import * as Api from "../utils/api";

import {ADD_DECK, SET_DECKS, ADD_CARD} from "./types";

export const getDecks = () => dispatch => {
    return Api.getDecks().then((decks) => dispatch(setDecks(decks)))
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
