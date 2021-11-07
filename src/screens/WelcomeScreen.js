import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import LottieView from 'lottie-react-native';
import {MMKV} from 'react-native-mmkv';
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
        <LottieView style={{width: '70%'}} source={flushed} autoPlay loop />
      );
    }
    if (this.state.emojiNum == 1) {
      return (
        <LottieView style={{width: '70%'}} source={shocked} autoPlay loop />
      );
    }
    if (this.state.emojiNum == 2) {
      return <LottieView style={{width: '70%'}} source={silly} autoPlay loop />;
    }
    if (this.state.emojiNum == 3) {
      return (
        <LottieView style={{width: '70%'}} source={sleeping} autoPlay loop />
      );
    }
    if (this.state.emojiNum == 4) {
      return (
        <LottieView style={{width: '70%'}} source={vomiting} autoPlay loop />
      );
    }
  }

  CheckConnectivity = () => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        Alert.alert('You are not connected to the internet');
      }
    });
  };

  start = async () => {
    const {increasePageNum} = this.props;
    this.CheckConnectivity();
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

    var questionApiCall;
    try {
      questionApiCall = await fetch(URL);
    } catch (error) {
      return Alert.alert('You are not connected to the internet');
    }

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
          <ActivityIndicator size="large" color="black"></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(285, 183, 26, 1)',
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
            onPress={this.start}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.buttonStyle}>
                GET STARTED <AntDesign name="right" size={20} />
              </Text>
            </View>
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
                    <View style={{width: '100%', flexDirection: 'column'}}>
                      <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                        Category:{' '}
                      </Text>
                      <RNPickerSelect
                        disabled={this.state.settingsDisabled}
                        placeholder={{
                          label: 'Select a category...',
                          value: null,
                          color: '#9EA0A4',
                        }}
                        style={{
                          ...pickerSelectStyles,
                          placeholder: {
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 'bold',
                          },
                        }}
                        onValueChange={(value) =>
                          this.setState({category: value})
                        }
                        items={modalCategories}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 24,
                          fontWeight: 'bold',
                        }}>
                        Difficulty:{' '}
                      </Text>
                      <RNPickerSelect
                        disabled={this.state.settingsDisabled}
                        placeholder={{
                          label: 'Select a difficulty...',
                          value: null,
                          color: '#9EA0A4',
                        }}
                        style={{
                          ...pickerSelectStyles,
                          placeholder: {
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 'bold',
                          },
                        }}
                        onValueChange={(value) =>
                          this.setState({difficulty: value})
                        }
                        items={modalDifficulty}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.1}}></View>
            </View>
          </View>
        </Modal>
        <View style={({flex: 1}, styles.mainContainer)}>
          <View>{this.renderLottie()}</View>
          <View style={{marginTop: 28}}>
            <View style={{alignItems: 'center'}}>
              {this.button()}
              <View>
                <TouchableOpacity onPress={() => this.displayModal(true)}>
                  <AntDesign style={{marginTop: 20}} size={30} name="setting" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
              My Points:{'\n'}
              {this.props.profileReducer.points}
            </Text>
            <Text style={{textAlign: 'center'}}>
              Points are calculated for only games that played today
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
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
