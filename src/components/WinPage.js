import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestNum} from '../actions/updateQuestNum';
import {updateQuestionData} from '../actions/updateDataAction';
import {increasePointsAction} from '../actions/increasePointsAction';
import trophy from '../lotties/trophy.json';
import {bindActionCreators} from 'redux';
import LottieView from 'lottie-react-native';
import {clearEarnedPointsAction} from '../actions/clearEarnedPointsAction';

class WinPage extends Component {
  tryAgain() {
    const {
      increasePointsAction,
      profileReducer,
      updateActiveQuestion,
      updateQuestNum,
      increasePageNum,
    } = this.props;

    increasePointsAction(profileReducer.earnedPerQuiz);
    activeQuestion = '';
    questionNumber = -1;
    pageNumber = -1;
    updateActiveQuestion(activeQuestion);
    updateQuestNum(questionNumber);
    increasePageNum(pageNumber);
    this.props.clearEarnedPointsAction();
  }

  componentDidMount() {
    this.animation.play(0, 60);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <Text
          style={{
            color: '#3AA953',
            fontSize: 36,
            fontWeight: 'bold',
            marginTop: 50,
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
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 32,
          }}>
          With: <Text>+{this.props.profileReducer.earnedPerQuiz} Points</Text>
        </Text>
        <View style={{height: 300}}>
          <LottieView
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{flex: 1, width: 1}}
            source={trophy}
            loop={false}
            autoPlay
          />
        </View>
        <Text style={{fontSize: 36, fontWeight: 'bold'}}>
          Wanna Play Again?
        </Text>
        <TouchableOpacity
          onPress={() => this.tryAgain()}
          style={{alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontSize: 24,
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: 'rgba(285, 183, 26, 1)',
              fontWeight: 'bold',
            }}>
            Play Again
          </Text>
          <AntDesign
            style={{marginTop: 19}}
            size={30}
            color={'rgba(285, 183, 26, 1)'}
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
      increasePointsAction,
      clearEarnedPointsAction,
    },
    dispatch,
  );

const mapStateToProps = ({pageReducer, questionReducer, profileReducer}) => {
  return {
    pageReducer,
    questionReducer,
    profileReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinPage);
