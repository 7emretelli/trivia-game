import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestionData} from '../actions/updateDataAction';
import {ANSWER_INDEX, QUESTION_INDEX, shuffle} from '../util';
import Logo from '../images/logo.png';

const URL =
  'https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selected: 'medium',
    };
  }
  start = () => {
    const {increasePageNum} = this.props;
    increasePageNum(this.props.pageReducer.pageNum);
  };

  displayModal(show) {
    this.setState({isVisible: show});
  }

  async componentDidMount() {
    try {
      const questionApiCall = await fetch(URL);
      const data = await questionApiCall.json();
      this.props.updateQuestionData(data);
    } catch (err) {
      console.log('Error to fetch data:', err);
    }

    const answers = [
      ...this.props.questionReducer.QUESTIONS.results[
        this.props.questionReducer.questNum
      ].incorrect_answers,
      this.props.questionReducer.QUESTIONS.results[
        this.props.questionReducer.questNum
      ].correct_answer,
    ];

    let activeQuestion = [];

    activeQuestion[
      QUESTION_INDEX
    ] = this.props.questionReducer.QUESTIONS.results[
      this.props.questionReducer.questNum
    ].question;

    randomizedAnswers = shuffle(answers);
    activeQuestion[ANSWER_INDEX] = randomizedAnswers;

    this.props.updateActiveQuestion(activeQuestion);
  }
  render() {
    const {buttonStyle, mainContainer} = styles;
    return (
      <View style={{flex: 1}}>
        <View style={mainContainer}>
          <Image
            style={{resizeMode: 'cover', height: 207, width: 189}}
            source={Logo}></Image>
          <View style={{marginTop: 28}}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={this.start}>
                <Text style={buttonStyle}>GET STARTED</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity onPress={() => this.displayModal(true)}>
                  <AntDesign
                    style={{marginTop: 20}}
                    size={30}
                    name="setting"></AntDesign>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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

const mapStateToProps = ({pageReducer, questionReducer}) => {
  return {pageReducer, questionReducer};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
