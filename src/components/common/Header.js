import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class Header extends Component {
<<<<<<< Updated upstream
  renderPoints() {
    if (this.props.profileReducer.earnedPerQuiz > 0) {
      return (
=======
  render() {
    const {questionReducer} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#8EDAA3',
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 24,
          paddingBottom: 10,
        }}>
>>>>>>> Stashed changes
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
<<<<<<< Updated upstream
=======
            alignItems: 'flex-start',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Question: {questionReducer.questNum + 1} /{' '}
            {Object.keys(questionReducer.QUESTIONS.results).length}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
>>>>>>> Stashed changes
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              right: 0,
            }}>
<<<<<<< Updated upstream
            + {this.props.profileReducer.earnedPerQuiz} |{' '}
            {this.props.profileReducer.points} Points
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              right: 0,
            }}>
            {this.props.profileReducer.points} Points
          </Text>
        </View>
      );
    }
  }

  render() {
    const {questionReducer, profileReducer} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#8EDAA3',
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 24,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Question: {questionReducer.questNum + 1} /{' '}
            {Object.keys(questionReducer.QUESTIONS.results).length}
          </Text>
        </View>
        {this.renderPoints()}
=======
            200
          </Text>
        </View>
>>>>>>> Stashed changes
      </View>
    );
  }
}

const mapStateToProps = ({pageReducer, questionReducer, profileReducer}) => {
  return {pageReducer, questionReducer, profileReducer};
};
export default connect(mapStateToProps)(Header);
