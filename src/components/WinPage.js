import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestNum} from '../actions/updateQuestNum';
import {updateQuestionData} from '../actions/updateDataAction';
import {bindActionCreators} from 'redux';
import Cup from '../images/cup.jpg';

class WinPage extends Component {
  tryAgain() {
    const {updateActiveQuestion, updateQuestNum, increasePageNum} = this.props;
    activeQuestion = '';
    questionNumber = -1;
    pageNumber = -1;
    updateActiveQuestion(activeQuestion);
    updateQuestNum(questionNumber);
    increasePageNum(pageNumber);
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
        <Image
          style={{resizeMode: 'cover', width: 164, height: 220}}
          source={Cup}
        />
        <Text style={{fontSize: 36, fontWeight: 'bold'}}>
          Wanna Play Again?
        </Text>
        <TouchableOpacity
          onPress={() => this.tryAgain()}
          style={{alignItems: 'center', marginTop: 64}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Try Again</Text>
          <AntDesign
            style={{marginTop: 19}}
            size={30}
            name="reload1"></AntDesign>
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

const mapStateToProps = ({pageReducer, questionReducer}) => {
  return {
    pageReducer,
    questionReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinPage);
