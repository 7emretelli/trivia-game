import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestionData} from '../actions/updateDataAction';
import {ANSWER_INDEX, QUESTION_INDEX, shuffle} from '../util';
import Logo from '../images/logo.png';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selected: 'medium',
      loading: false,
      difficulty: 'medium',
      category: 10,
    };
  }
  start = async () => {
    const URL =
      'https://opentdb.com/api.php?amount=15&category=' +
      this.state.category +
      '&difficulty=' +
      this.state.difficulty;
    console.log(URL);
    const {increasePageNum} = this.props;
    this.setState({
      loading: true,
    });
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

    this.setState({
      loading: false,
    });

    increasePageNum(this.props.pageReducer.pageNum);
  };

  displayModal(show) {
    this.setState({isVisible: show});
  }

  button() {
    const {buttonStyle} = styles;
    if (this.state.loading == true) {
      return (
        <View>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      );
    }
    if (this.state.loading == false) {
      return (
        <View>
          <TouchableOpacity onPress={this.start}>
            <Text style={buttonStyle}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    const {mainContainer} = styles;
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#6BB1F1',
                height: 346,
                width: 370,
              }}>
              <View style={{flex: 0.15, alignItems: 'flex-end'}}>
                <View style={{marginRight: 15, marginTop: 15}}>
                  <TouchableOpacity onPress={() => this.displayModal(false)}>
                    <AntDesign name="close" size={30}></AntDesign>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 0.75,
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.1}}>
                  <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Settings
                  </Text>
                </View>
                <View
                  style={{
                    padding: 16,
                    flex: 0.9,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      Category:{' '}
                      <RNPickerSelect
                        style={{fontSize: 24, fontWeight: 'bold'}}
                        onValueChange={(value) =>
                          this.setState({category: value})
                        }
                        items={[
                          {label: 'General Knowledge', value: 9},
                          {label: 'Entertainment: Books', value: 10},
                          {label: 'Entertainment: Film', value: 11},
                        ]}
                      />
                    </Text>
                    <Text
                      style={{marginTop: 10, fontSize: 24, fontWeight: 'bold'}}>
                      Difficulty: Medium
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.1}}></View>
            </View>
          </View>
        </Modal>
        <View style={mainContainer}>
          <Image
            style={{resizeMode: 'cover', height: 207, width: 189}}
            source={Logo}></Image>
          <View style={{marginTop: 28}}>
            <View style={{alignItems: 'center'}}>
              {this.button()}
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text>by Emre Telli</Text>
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
