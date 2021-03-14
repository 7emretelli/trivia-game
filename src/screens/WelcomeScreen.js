import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import LottieView from 'lottie-react-native';
import {increasePageNum} from '../actions/pageAction';
import {updateActiveQuestion} from '../actions/updateActiveQuestion';
import {updateQuestionData} from '../actions/updateDataAction';
import flushed from '../lotties/flushed.json';
import silly from '../lotties/silly.json';
import sleeping from '../lotties/sleeping.json';
import shocked from '../lotties/shocked.json';
import vomiting from '../lotties/vomiting.json';
import {
  ANSWER_INDEX,
  modalCategories,
  modalDifficulty,
  QUESTION_INDEX,
  shuffle,
} from '../util';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selected: 'medium',
      loading: false,
      difficulty: 'medium',
      category: 9,
      settingsDisabled: false,
      emojiNum: 0,
    };
  }

  componentDidMount() {
    var number = Math.floor(Math.random() * 5);
    this.setState({
      emojiNum: number,
    });
  }

  renderLottie() {
    if (this.state.emojiNum == 0) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={flushed}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 1) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={shocked}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 2) {
      return (
        <LottieView style={{flex: 1, width: 10}} source={silly} autoPlay loop />
      );
    }
    if (this.state.emojiNum == 3) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={sleeping}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 4) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={vomiting}
          autoPlay
          loop
        />
      );
    }
  }

  start = async () => {
    const {increasePageNum} = this.props;
    this.setState({
      loading: true,
      settingsDisabled: true,
    });

    const URL =
      'https://opentdb.com/api.php?amount=15&encode=url3986&category=' +
      this.state.category +
      '&difficulty=' +
      this.state.difficulty +
      '&type=multiple';

    const questionApiCall = await fetch(URL);

    const data = await questionApiCall.json();
    this.props.updateQuestionData(data);

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
      settingsDisabled: false,
    });

    increasePageNum(this.props.pageReducer.pageNum);
  };

  displayModal(show) {
    this.setState({isVisible: show});
  }

  button() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={this.start}>
            <Text style={styles.buttonStyle}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('Settings Saved');
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
                        disabled={this.state.settingsDisabled}
                        style={{fontSize: 24, fontWeight: 'bold'}}
                        onValueChange={(value) =>
                          this.setState({category: value})
                        }
                        items={modalCategories}
                      />
                    </Text>
                    <Text
                      style={{marginTop: 10, fontSize: 24, fontWeight: 'bold'}}>
                      Difficulty:{' '}
                      <RNPickerSelect
                        disabled={this.state.settingsDisabled}
                        style={{fontSize: 24, fontWeight: 'bold'}}
                        onValueChange={(value) =>
                          this.setState({difficulty: value})
                        }
                        items={modalDifficulty}
                      />
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.1}}></View>
            </View>
          </View>
        </Modal>
        <View style={({flex: 0.9}, styles.mainContainer)}>
          <View style={{flex: 0.4}}>{this.renderLottie()}</View>
          <View style={{flex: 0.1, marginTop: 28}}>
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
          <View
            style={{
              flex: 0.2,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
              My Points:{'\n\n'}
              {this.props.profileReducer.points}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.1,
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

const mapStateToProps = ({pageReducer, questionReducer, profileReducer}) => {
  return {pageReducer, questionReducer, profileReducer};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
