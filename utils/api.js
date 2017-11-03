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

export function saveDefaultDecks() {
    const decks = {
        Trivia: {
            title: 'Trivia',
            questions: [
                {
                    question: 'Who wrote the Pledge of Allegiance of the United States?',
                    answer: 'Francis Bellamy'
                },
                {
                    question: 'What is the fastest fish in the Ocean?',
                    answer: 'Sailfish'
                },
                {
                    question: 'Who painted the famous Dutch Golden age painting "The Night Watch"?',
                    answer: 'Rembrandt'
                },
                {
                    question: 'What is the largest ocean on planet Earth?',
                    answer: 'Pacific Ocean'
                },
                {
                    question: 'The oldest parliament in the world belongs to what country?',
                    answer: 'Iceland'
                }
            ]
        }
    };

    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}