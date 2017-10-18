import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import {orange} from "./utils/colors";

export default class App extends React.Component {
  render() {
    return (
        <Provider store={createStore(reducer)}>
            <View style={{flex:1}}>
                <View style={{ backgroundColor: orange, height: Constants.statusBarHeight }}>
                    <StatusBar translucent backgroundColor={orange} barStyle="light-content" />
                </View>
                <View style={styles.container}>
                    <Text>App</Text>
                </View>
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
