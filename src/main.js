import React, {Component} from 'react';
import {View} from 'react-native';
import Welcome from './components/welcome';
import Header from './components/common/header';
import QuestionPage from './components/QuestionPage';
import WinPage from './components/WinPage';
import {connect} from 'react-redux';

class Main extends Component {
  Page() {
    if (this.props.Page.pageNum == '0') {
      return <Welcome></Welcome>;
    }
    if (this.props.Page.pageNum == '1') {
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 0.1}}>
            <Header></Header>
          </View>
          <View style={{flex: 0.9}}>
            <QuestionPage></QuestionPage>
          </View>
        </View>
      );
    }
    if (this.props.Page.pageNum == '2') {
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 0.1}}>
            <Header></Header>
          </View>
          <View style={{flex: 0.9}}>
            <WinPage></WinPage>
          </View>
        </View>
      );
    }
  }
  render() {
    return <View style={{flex: 1}}>{this.Page()}</View>;
  }
}

const mapStateToProps = (state) => {
  const {Page} = state;
  return {Page};
};

export default connect(mapStateToProps)(Main);
