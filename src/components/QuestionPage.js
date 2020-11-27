import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: this.props.QDATA.QUESTIONS.results[
        this.props.Page.questNum
      ].correct_answer,
      Answ: 0,
    };
  }
  componentDidMount() {
    this.setState({
      correctAnswer: this.props.QDATA.QUESTIONS.results[
        this.props.Page.questNum
      ].correct_answer,
    });
    console.log('doğru cevap: ', this.state.correctAnswer);
  }
  _question() {
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
          {
            this.props.QDATA.QUESTIONS.results[this.props.Page.questNum]
              .question
          }
        </Text>
      </View>
    );
  }
  _isClicked(item) {
    this.setState({
      Answ: item,
    });
  }
  _answerStyle(item) {
    if (this.state.Answ == item) {
      if (this.state.Answ == this.state.correctAnswer) {
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
    if (this.state.Answ !== 0) {
      return {
        True,
      };
    }
  }
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
        <View style={{marginTop: 135, marginBottom: 29}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
            {this._question()}
          </Text>
        </View>
        <FlatList
          data={this.props.QDATA.activeQuestion[1]}
          renderItem={renderItem}
          keyExtractor={(item) => item.question}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {Page, QDATA} = state;
  return {Page, QDATA};
};

export default connect(mapStateToProps)(QuestionPage);
