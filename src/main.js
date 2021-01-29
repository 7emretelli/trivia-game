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
    if (this.props.pageReducer.pageNum == 0) {
      return <WelcomeScreen />;
    }
    if (this.props.pageReducer.pageNum == 1) {
      return <QuestionScreen />;
    }
    if (this.props.pageReducer.pageNum == 2) {
      return <WinScreen />;
    }
  }
}

const mapStateToProps = ({pageReducer}) => {
  return {pageReducer};
};

export default connect(mapStateToProps)(Main);
