import React, {Component} from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import WinPage from '../components/WinPage';

export default class WinScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 0.1}}>
          <Header />
        </View>
        <View style={{flex: 0.9}}>
          <WinPage />
        </View>
      </View>
    );
  }
}
