import React from 'react';
import {Text, View, StatusBar, Platform} from 'react-native';
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {Constants, Pl} from 'expo'
import {TabNavigator, StackNavigator} from 'react-navigation';
import DeckList from './components/DeckList';
import {white, orange} from "./utils/colors";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import Deck from "./components/Deck";
import {purple} from "./utils/colors";
import CreateDeck from "./components/CreateDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {setLocalNotification} from "./utils/helpers";

const Tabs = new TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Deck list',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
        }
    },
}, {

    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? orange : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : orange,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

const defaultNavigationOptions = {
    headerTintColor: white,
    headerStyle: {
        backgroundColor: purple,
    }
};

const MainNavigator = new StackNavigator({
    DeckList: {
        screen: Tabs
    },
    Deck: {
        screen: Deck,
        defaultNavigationOptions
    },
    CreateDeck: {
        screen: CreateDeck,
        defaultNavigationOptions
    },
    AddCard: {
        screen: AddCard,
        defaultNavigationOptions
    },
    Quiz: {
        screen: Quiz,
        defaultNavigationOptions
    }
});

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        const logger = createLogger({});
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const store = createStore(reducer,
            composeEnhancers(
                applyMiddleware(thunk, logger)
            )
        );

        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <View style={{backgroundColor: orange, height: Constants.statusBarHeight}}>
                        <StatusBar translucent backgroundColor={orange} barStyle="light-content"/>
                    </View>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}