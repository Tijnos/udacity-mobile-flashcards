import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:Decks';

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, question, answer) {
    return getDecks().then((decks) => {
        decks[title].questions = [
            ...decks[title].questions,
            {
                question,
                answer
            }
        ];

        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    });
}