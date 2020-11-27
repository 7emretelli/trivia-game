import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Main from './src/main';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

export default class App extends Component {


  render() {

    return (
     <Provider store={createStore(reducers)}>
      <View style={{ flex: 1 }}>
          <Main/>
      </View>
      </Provider> 
    )
  }
}

