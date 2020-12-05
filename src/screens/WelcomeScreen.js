import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
} from 'react-native';
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
    };
  }
  _start = () => {
    const {increasePageNum} = this.props;
    increasePageNum(this.props.Page.pageNum);
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
      ...this.props.QDATA.QUESTIONS.results[this.props.QDATA.questNum]
        .incorrect_answers,
      this.props.QDATA.QUESTIONS.results[this.props.QDATA.questNum]
        .correct_answer,
    ];

    let activeQuestion = [];

    activeQuestion[QUESTION_INDEX] = this.props.QDATA.QUESTIONS.results[
      this.props.QDATA.questNum
    ].question;

    randomizedAnswers = shuffle(answers);
    activeQuestion[ANSWER_INDEX] = randomizedAnswers;

    this.props.updateActiveQuestion(activeQuestion);
  }
  render() {
    const {buttonStyle, mainContainer} = styles;
    return (
      <View style={{flex: 1}}>
        <Modal
          fullScreen={false}
          animationType={'slide'}
          visible={this.state.isVisible}
          onRequestClose={() => this.displayModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#6BB1F1',
                height: 409,
                width: 346,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity onPress={() => this.displayModal(false)}>
                  <AntDesign
                    style={{marginRight: 10, marginTop: 10}}
                    size={30}
                    name="close"></AntDesign>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 30, marginLeft: 20}}>
                <View style={{marginBottom: 30}}>
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                    Difficulty: Easy
                  </Text>
                </View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                  Category: All
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <View style={mainContainer}>
          <Image
            style={{resizeMode: 'cover', height: 207, width: 189}}
            source={Logo}></Image>
          <View style={{marginTop: 28}}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={this._start}>
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

const mapStateToProps = (state) => {
  const {Page, QDATA} = state;
  return {Page, QDATA};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
