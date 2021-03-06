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
import {ANSWER_INDEX, QUESTION_INDEX, shuffle} from '../util';

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
    var number = Math.floor(Math.random() * 4);
    this.setState({
      emojiNum: number,
    });
  }

  renderLottie() {
    if (this.state.emojiNum == 0) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={require('../lotties/flushed.json')}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 1) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={require('../lotties/shocked.json')}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 2) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={require('../lotties/silly.json')}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 3) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={require('../lotties/sleeping.json')}
          autoPlay
          loop
        />
      );
    }
    if (this.state.emojiNum == 4) {
      return (
        <LottieView
          style={{flex: 1, width: 10}}
          source={require('../lotties/vomiting.json')}
          autoPlay
          loop
        />
      );
    }
  }

  start = async () => {
    const {
      increasePageNum,
      updateQuestionData,
      questionReducer,
      pageReducer,
      updateActiveQuestion,
    } = this.props;
    const {category, difficulty} = this.state;
    this.setState({
      loading: true,
      settingsDisabled: true,
    });

    const URL =
      'https://opentdb.com/api.php?amount=15&encode=url3986&category=' +
      category +
      '&difficulty=' +
      difficulty +
      '&type=multiple';

    const questionApiCall = await fetch(URL);

    const data = await questionApiCall.json();
    updateQuestionData(data);

    console.log(
      this.props.questionReducer.QUESTIONS.results[
        this.props.questionReducer.questNum
      ].correct_answer,
    );

    const answers = [
      ...this.props.questionReducer.QUESTIONS.results[questionReducer.questNum]
        .incorrect_answers,
      this.props.questionReducer.QUESTIONS.results[questionReducer.questNum]
        .correct_answer,
    ];

    let activeQuestion = [];

    activeQuestion[QUESTION_INDEX] =
      questionReducer.QUESTIONS.results[questionReducer.questNum].question;

    randomizedAnswers = shuffle(answers);
    activeQuestion[ANSWER_INDEX] = randomizedAnswers;

    updateActiveQuestion(activeQuestion);

    this.setState({
      loading: false,
      settingsDisabled: false,
    });

    increasePageNum(pageReducer.pageNum);
  };

  displayModal(show) {
    this.setState({isVisible: show});
  }

  button() {
    const {buttonStyle} = styles;
    const {loading} = this.state;
    if (loading == true) {
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
                        items={[
                          {label: 'Entertainment: General Knowledge', value: 9},
                          {label: 'Entertainment: Books', value: 10},
                          {label: 'Entertainment: Film', value: 11},
                          {label: 'Entertainment: Music', value: 12},
                          {
                            label: 'Entertainment: Musicals & Theatres',
                            value: 13,
                          },
                          {label: 'Entertainment: Television', value: 14},
                          {label: 'Entertainment: Video Games', value: 15},
                          {label: 'Entertainment: Board Games', value: 16},
                          {label: 'Science & Nature', value: 17},
                          {label: 'Science: Computers', value: 18},
                          {label: 'Science: Mathematics', value: 19},
                          {label: 'Mythology', value: 20},
                          {label: 'Sports', value: 21},
                          {label: 'Geography', value: 22},
                          {label: 'History', value: 23},
                          {label: 'Politics', value: 24},
                          {label: 'Art', value: 25},
                          {label: 'Celebrities', value: 26},
                          {label: 'Animals', value: 27},
                          {label: 'Vehicles', value: 28},
                          {label: 'Entertainment: Comics', value: 29},
                          {label: 'Science: Gadgets', value: 30},
                          {
                            label: 'Entertainment: Japanese Anime & Manga',
                            value: 31,
                          },
                          {
                            label: 'Entertainment: Cartoon & Animations',
                            value: 32,
                          },
                        ]}
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
                        items={[
                          {label: 'Easy', value: 'easy'},
                          {label: 'Medium', value: 'medium'},
                          {label: 'Hard', value: 'hard'},
                        ]}
                      />
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.1}}></View>
            </View>
          </View>
        </Modal>
        <View style={({flex: 0.9}, mainContainer)}>
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
              My Points:{'\n'}
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
