import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestionData} from '../actions/updateDataAction';

class Welcome extends Component {
  _start() {
    this.props.increasePageNum(this.props.Page.pageNum);
  }

  async componentDidMount() {
    try {
      const questionApiCall = await fetch(
        'https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple',
      );
      const data = await questionApiCall.json();
      this.props.updateQuestionData(data);
    } catch (err) {
      console.log('Error to fetch data:', err);
    }

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    var answers = [];
    answers.push(
      this.props.QDATA.QUESTIONS.results[this.props.Page.questNum]
        .incorrect_answers[0],
      this.props.QDATA.QUESTIONS.results[this.props.Page.questNum]
        .incorrect_answers[1],
      this.props.QDATA.QUESTIONS.results[this.props.Page.questNum]
        .incorrect_answers[2],
    );
    answers.push(
      this.props.QDATA.QUESTIONS.results[this.props.Page.questNum]
        .correct_answer,
    );

    var activeQuestion = [];

    activeQuestion[0] = this.props.QDATA.QUESTIONS.results[
      this.props.Page.questNum
    ].question;

    randomizedAnswers = shuffle(answers);
    activeQuestion[1] = randomizedAnswers;
    console.log(activeQuestion[1]);

    this.props.updateActiveQuestion(activeQuestion);
  }
  render() {
    const {buttonStyle, mainContainer} = styles;
    return (
      <View style={{flex: 1}}>
        <View style={mainContainer}>
          <Image
            style={{resizeMode: 'cover', height: 207, width: 189}}
            source={require('../images/logo.png')}></Image>
          <TouchableOpacity style={{marginTop: 28}}>
            <View>
              <TouchableOpacity onPress={() => this._start()}>
                <Text style={buttonStyle}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateQuestionData,
      increasePageNum,
      updateActiveQuestion,
    },
    dispatch,
  );
const mapStateToProps = (state) => {
  const {Page, QDATA} = state;
  return {Page, QDATA};
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
