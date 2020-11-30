import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestNum} from '../actions/updateQuestNum';
import {updateQuestionData} from '../actions/updateDataAction';
import {bindActionCreators} from 'redux';

class WinPage extends Component {
  _tryAgain() {
    activeQuestion = '';
    questionNumber = -1;
    pageNumber = -1;
    this.props.updateActiveQuestion(activeQuestion);
    this.props.updateQuestNum(questionNumber);
    this.props.increasePageNum(pageNumber);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <Text
          style={{
            color: '#3AA953',
            fontSize: 36,
            fontWeight: 'bold',
            marginTop: 85,
          }}>
          Congratulations!
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 36,
            fontWeight: 'bold',
          }}>
          You won the game
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 32,
          }}>
          With: {'\n'} <Text>200 Points</Text>
        </Text>
        <TouchableOpacity
          onPress={() => this._tryAgain()}
          style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateActiveQuestion,
      updateQuestNum,
      updateQuestionData,
      increasePageNum,
    },
    dispatch,
  );

const mapStateToProps = (state) => {
  const {Page, QDATA} = state;
  return {
    Page,
    QDATA,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinPage);
