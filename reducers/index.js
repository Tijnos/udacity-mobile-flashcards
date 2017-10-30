import {
    SET_DECKS,
    ADD_DECK,
    ADD_CARD
} from "../actions/index";

function decks(state = {}, action) {
    switch(action.type) {
        case SET_DECKS:
            return action.decks;
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            };
        case ADD_CARD:
            return {
                ...state,
                [action.deckTitle]: {
                    ...state[action.deckTitle],
                    questions: [
                        ...state[action.deckTitle].questions,
                        {
                            question: action.question,
                            answer: action.answer
                        }
                    ]
                }
            };
        default:
            return state;
    }
}

export default decks;
