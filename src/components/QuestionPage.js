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
    this.state = {
      correctAnswer: this.props.QDATA.QUESTIONS.results[
        this.props.QDATA.questNum
      ].correct_answer,
      answer: 0,
      win: 0,
    };
  }
  componentDidMount() {
    console.log('doğru cevap: ', this.state.correctAnswer);
  }
  _question() {
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
          {this.props.QDATA.activeQuestion[QUESTION_INDEX]}
        </Text>
      </View>
    );
  }
  _isClicked(item) {
    this.setState({
      answer: item,
    });
    if (item == this.state.correctAnswer) {
      if (this.props.QDATA.questNum < 14) {
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
  _answerStyle(item) {
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
  _disable() {
    var True = True;
    if (this.state.answer !== 0) {
      return {
        True,
      };
    }
  }
  _nextPage() {
    this.props.updateQuestNum(this.props.QDATA.questNum);
    this.setState({
      win: 0,
      answer: 0,
    });
    qNum = this.props.QDATA.questNum + 1;
    this.setState({
      correctAnswer: this.props.QDATA.QUESTIONS.results[qNum].correct_answer,
    });
    console.log(this.props.QDATA.QUESTIONS.results[qNum].correct_answer);
  }
  _tryAgain() {
    activeQuestion = '';
    questionNumber = -1;
    pageNumber = -1;
    this.props.updateActiveQuestion(activeQuestion);
    this.props.updateQuestNum(questionNumber);
    this.props.increasePageNum(pageNumber);
    this.setState({
      correctAnswer: null,
      answer: 0,
      win: 0,
    });
  }
  _WON() {
    this.setState({
      win: 0,
    });
    this.props.increasePageNum('1');
  }
  _texts() {
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
              onPress={() => this._nextPage()}
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
              onPress={() => this._tryAgain()}
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
        this._WON();
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

  _gameOver() {
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
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        disabled={this._disable()}
        onPress={() => this._isClicked(item)}>
        <View style={this._answerStyle(item)}>
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
  render() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          disabled={this._disable()}
          onPress={() => this._isClicked(item)}>
          <View style={this._answerStyle(item)}>
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
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        {this._gameOver()}
        <View style={{marginTop: 135, zIndex: 1, marginBottom: 29}}>
          {this._question()}
        </View>
        <View style={{height: 192}}>
          <FlatList
            data={this.props.QDATA.activeQuestion[ANSWER_INDEX]}
            renderItem={renderItem}
            keyExtractor={(item) => item.question}
            scrollEnabled={false}
          />
        </View>
        <View style={{marginTop: 39}}>{this._texts()}</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
