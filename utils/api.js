import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:Decks';

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
}

export function getDeck(id) {
    return getDecks().then((decks) => {
        return (id in decks) ? decks[id] : null;
    })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            questions: [
                card
            ]
        }
    }))
}