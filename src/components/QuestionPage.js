import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestNum} from '../actions/updateQuestNum';
import {updateQuestionData} from '../actions/updateDataAction';
import {earnedPointsAction} from '../actions/earnedPointsAction';
import {clearEarnedPointsAction} from '../actions/clearEarnedPointsAction';
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
      isJoker: false,
      disableAnswer1: null,
      disableAnswer2: null,
      time: 15,
    };
  }

  componentDidMount() {
    this.countDownTimer();
  }

  countDownTimer(clear) {
    if (clear == 'clear') {
      clearInterval(this.myInterval);
    } else {
      this.myInterval = setInterval(() => {
        const {time, answer} = this.state;

        if (time > 0) {
          if (answer == 0) {
            this.setState(({time}) => ({
              time: time - 1,
            }));
          } else {
            clearInterval(this.myInterval);
          }
        }
        if (time === 0) {
          this.setState({
            win: 2,
            answer: 1,
          });
          clearInterval(this.myInterval);
        }
      }, 1000);
    }
  }

  question() {
    const {questionReducer} = this.props;
    return (
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginHorizontal: 10,
            textAlign: 'center',
          }}>
          {decodeURIComponent(questionReducer.activeQuestion[QUESTION_INDEX])}
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
        this.props.earnedPointsAction(this.state.time * 3);
      } else {
        this.setState({
          win: 3,
        });
        this.props.earnedPointsAction(this.state.time * 3);
      }
    }
    if (item !== this.state.correctAnswer) {
      this.setState({
        win: 2,
      });
      this.props.clearEarnedPointsAction();
    }
  }

  answerStyle(item) {
    if (this.state.answer == item) {
      if (this.state.answer == this.state.correctAnswer) {
        return {
          backgroundColor: '#58E778',
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
          flexDirection: 'row',
        };
      } else {
        return {
          backgroundColor: '#ec4646',
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
          flexDirection: 'row',
        };
      }
    } else {
      if (
        item == this.state.disableAnswer1 ||
        item == this.state.disableAnswer2
      ) {
        return {
          backgroundColor: '#a6a9b6',
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
          flexDirection: 'row',
        };
      } else {
        return {
          backgroundColor: '#6BB1F1',
          width: 294,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
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
    this.countDownTimer('clear');
    this.countDownTimer();

    this.setState({
      win: 0,
      answer: 0,
      time: 15,
    });
    qNum = questionReducer.questNum + 1;
    this.setState({
      correctAnswer: questionReducer.QUESTIONS.results[qNum].correct_answer,
    });
    console.log(questionReducer.QUESTIONS.results[qNum].correct_answer);
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
      isJoker: false,
      time: 15,
    });
  }
  won() {
    const {increasePageNum} = this.props;

    this.setState({
      win: 0,
    });
    this.setState({
      isJoker: false,
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
          <View>
            <TouchableOpacity
              onPress={() => this.nextPage()}
              style={{alignItems: 'center'}}>
              <Text style={{marginTop: 30, fontSize: 24, fontWeight: 'bold'}}>
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
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Not this time...
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => this.tryAgain()}
              style={{alignItems: 'center'}}>
              <Text style={{marginTop: 30, fontSize: 24, fontWeight: 'bold'}}>
                Try Again
              </Text>
              <AntDesign
                style={{marginTop: 10}}
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
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>AMAZING!!!</Text>
          </View>
        </View>
      );
    }
  }

  gameOver() {
    if (this.state.win == '2') {
      return (
        <View style={{flex: 1}}>
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

    var disable1 =
      newanswerslist[Math.floor(Math.random() * newanswerslist.length)];
    var disable2 =
      newanswerslist[Math.floor(Math.random() * newanswerslist.length)];

    while (disable1 == disable2) {
      var disable2 =
        newanswerslist[Math.floor(Math.random() * newanswerslist.length)];
    }
    this.setState({
      disableAnswer1: disable1,
    });
    setTimeout(() => {
      this.setState({
        disableAnswer2: disable2,
      });
    }, 300);
  }

  buttonJoker() {
    if (this.state.answer == 0) {
      if (this.state.isJoker == true) {
        return {
          height: 30,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#a6a9b6',
          borderRadius: 5,
        };
      } else {
        return {
          height: 30,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ec4646',
          borderRadius: 5,
        };
      }
    } else {
      return {
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a6a9b6',
        borderRadius: 5,
      };
    }
  }

  jokerDisable() {
    if (this.state.win == 1 || this.state.win == 2) {
      return true;
    } else {
      if (this.state.isJoker == false) {
        return false;
      } else {
        return true;
      }
    }
  }

  render() {
    const {questionReducer} = this.props;
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          disabled={this.disable(item)}
          onPress={() => this.isClicked(item)}>
          <View style={this.answerStyle(item)}>
            <Text
              style={{
                marginVertical: 5,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                marginHorizontal: 10,
                flexShrink: 1,
              }}>
              {decodeURIComponent(item)}
            </Text>
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
        <View style={{flex: 0.1}}>{this.gameOver()}</View>

        <View style={{flex: 0.5, alignItems: 'center'}}>
          <View
            style={{
              flex: 0.1,
              width: 300,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {this.state.time}{' '}
              </Text>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Seconds {'\n'} Left
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <View style={this.buttonJoker()}>
                <TouchableOpacity
                  disabled={this.jokerDisable()}
                  onPress={() => {
                    this.useJoker();
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
                    Use Joker
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, flex: 0.9, alignItems: 'center'}}>
            <View
              style={{
                marginBottom: 29,
              }}>
              {this.question()}
            </View>
            <View>
              <FlatList
                data={questionReducer.activeQuestion[ANSWER_INDEX]}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>

        <View style={{flex: 0.4}}>{this.texts()}</View>
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
      clearEarnedPointsAction,
      earnedPointsAction,
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
