import React, {Component} from 'react';
import {View, Text} from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import QuestionScreen from './screens/QuestionScreen.js';
import WinScreen from './screens/WinScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

AntDesign.loadFont();

class Main extends Component {
  render() {
    if (this.props.Page.pageNum == 0) {
      return <WelcomeScreen />;
    }
    if (this.props.Page.pageNum == 1) {
      return <QuestionScreen />;
    }
    if (this.props.Page.pageNum == 2) {
      return <WinScreen />;
    }
  }
}

const mapStateToProps = ({Page}) => {
  return {Page};
};

export default connect(mapStateToProps)(Main);
