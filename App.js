import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants, Pl } from 'expo'
import {TabNavigator} from 'react-navigation';
import DeckList from './components/DeckList';
import {white, orange} from "./utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tabs = new TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: 'Deck list',
          tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        }
    },
}, {
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
}});

export default class App extends React.Component {
  render() {
    return (
        <Provider store={createStore(reducer)}>
            <View style={{flex:1}}>
                <View style={{ backgroundColor: orange, height: Constants.statusBarHeight }}>
                    <StatusBar translucent backgroundColor={orange} barStyle="light-content" />
                </View>
                <Tabs/>
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
