import React, {Component} from 'react';
import {View} from 'react-native';
import WinPage from '../components/WinPage';

export default class WinScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <WinPage />
        </View>
      </View>
    );
  }
}
