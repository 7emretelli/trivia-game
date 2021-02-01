import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestNum} from '../actions/updateQuestNum';
import {updateQuestionData} from '../actions/updateDataAction';
import {bindActionCreators} from 'redux';
import {ANSWER_INDEX, QUESTION_INDEX} from '../util';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    const {questionReducer} = this.props;
    this.state = {
      correctAnswer:
        questionReducer.QUESTIONS.results[questionReducer.questNum]
          .correct_answer,
      answer: 0,
      win: 0,
      isJoker: 0,
      disableAnswer1: null,
      disableAnswer2: null,
    };
  }
  question() {
    const {questionReducer} = this.props;
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
          {questionReducer.activeQuestion[QUESTION_INDEX]}
        </Text>
      </View>
    );
  }
  isClicked(item) {
    const {questionReducer} = this.props;
    this.setState({
      answer: item,
    });
    if (item == this.state.correctAnswer) {
      if (questionReducer.questNum < 14) {
        this.setState({
          win: 1,
        });
      } else {
        this.setState({
          win: 3,
        });
      }
    }
    if (item !== this.state.correctAnswer) {
      this.setState({
        win: 2,
      });
    }
  }
  answerStyle(item) {
    if (this.state.answer == item) {
      if (this.state.answer == this.state.correctAnswer) {
        return {
          backgroundColor: '#58E778',
          height: 32,
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 21,
          flexDirection: 'row',
        };
      } else {
        return {
          backgroundColor: '#F16B8B',
          height: 32,
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 21,
          flexDirection: 'row',
        };
      }
    } else {
      if (
        item == this.state.disableAnswer1 ||
        item == this.state.disableAnswer2
      ) {
        return {
          backgroundColor: '#F16B8B',
          height: 32,
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 21,
          flexDirection: 'row',
        };
      } else {
        return {
          backgroundColor: '#6BB1F1',
          height: 32,
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 21,
          flexDirection: 'row',
        };
      }
    }
  }
  disable(item) {
    var True = True;
    if (this.state.answer !== 0) {
      return {
        True,
      };
    }
    if (
      item == this.state.disableAnswer1 ||
      item == this.state.disableAnswer2
    ) {
      return {
        True,
      };
    }
  }
  nextPage() {
    const {updateQuestNum, questionReducer} = this.props;
    updateQuestNum(questionReducer.questNum);
    this.setState({
      win: 0,
      answer: 0,
      isJoker: false,
    });
    qNum = questionReducer.questNum + 1;
    this.setState({
      correctAnswer: questionReducer.QUESTIONS.results[qNum].correct_answer,
    });
  }
  tryAgain() {
    const {updateActiveQuestion, updateQuestNum, increasePageNum} = this.props;
    activeQuestion = '';
    questionNumber = -1;
    pageNumber = -1;
    updateActiveQuestion(activeQuestion);
    updateQuestNum(questionNumber);
    increasePageNum(pageNumber);
    this.setState({
      correctAnswer: null,
      answer: 0,
      win: 0,
      isJoker: null,
    });
  }
  won() {
    const {increasePageNum} = this.props;
    this.setState({
      win: 0,
    });
    increasePageNum(1);
  }
  texts() {
    if (this.state.win == 1) {
      return (
        <View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Excellent, keep going!
            </Text>
          </View>
          <View style={{marginTop: 61}}>
            <TouchableOpacity
              onPress={() => this.nextPage()}
              style={{alignItems: 'center'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                Next Question
              </Text>
              <AntDesign
                style={{marginTop: 19}}
                size={30}
                name="arrowright"></AntDesign>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (this.state.win == 2) {
      return (
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Wrong answer :(
          </Text>
          <View style={{marginTop: 61}}>
            <TouchableOpacity
              onPress={() => this.tryAgain()}
              style={{alignItems: 'center'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Try Again</Text>
              <AntDesign
                style={{marginTop: 19}}
                size={30}
                name="reload1"></AntDesign>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (this.state.win == '3') {
      setTimeout(() => {
        this.won();
      }, 1000);
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>WOW!!!</Text>
          <View style={{marginTop: 61}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>AMAZING!!!</Text>
          </View>
        </View>
      );
    }
  }

  gameOver() {
    if (this.state.win == '2') {
      return (
        <View style={{marginTop: 35, zIndex: -1}}>
          <Text
            style={{
              fontSize: 48,

              color: '#FA194F',
              fontWeight: 'bold',
            }}>
            Game Over
          </Text>
        </View>
      );
    }
  }

  useJoker() {
    const {questionReducer} = this.props;
    this.setState({
      isJoker: true,
    });

    var answerslist = questionReducer.activeQuestion[ANSWER_INDEX];
    var i;
    var newanswerslist = [];

    for (i = 0; i < answerslist.length; i++) {
      if (answerslist[i] != this.state.correctAnswer) {
        newanswerslist.push(answerslist[i]);
      }
    }

    let disable1 =
      newanswerslist[Math.floor(Math.random() * newanswerslist.length)];

    let disable2 =
      newanswerslist[Math.floor(Math.random() * newanswerslist.length)];

    console.log(disable1, disable2);
    while (disable1 == disable2) {
      let disable2 =
        newanswerslist[Math.floor(Math.random() * newanswerslist.length)];
    }
    console.log(disable1, disable2);
    this.setState({
      disableAnswer1: disable1,
      disableAnswer2: disable2,
    });
  }

  render() {
    const {questionReducer} = this.props;
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          disabled={this.disable(item)}
          onPress={() => this.isClicked(item)}>
          <View style={this.answerStyle(item)}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginHorizontal: 10,
                  flexShrink: 1,
                }}>
                {item}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {this.gameOver()}

        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 105,
            zIndex: 1,
            marginBottom: 29,
          }}>
          <View
            style={{
              marginBottom: 10,
              height: 30,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F16B8B',
              borderRadius: 5,
            }}>
            <TouchableOpacity
              disabled={this.state.isJoker}
              onPress={() => this.useJoker()}>
              <Text style={{color: 'white', fontSize: 20}}>Use Joker</Text>
            </TouchableOpacity>
          </View>
          {this.question()}
        </View>
        <View style={{height: 192}}>
          <FlatList
            data={questionReducer.activeQuestion[ANSWER_INDEX]}
            renderItem={renderItem}
            keyExtractor={(item) => item.question}
            scrollEnabled={false}
          />
        </View>
        <View style={{marginTop: 39}}>{this.texts()}</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
