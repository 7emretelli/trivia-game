import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

class Header extends Component {
  renderPoints() {
    const {profileReducer} = this.props;
    if (profileReducer.earnedPerQuiz > 0) {
      return (
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <SafeAreaView>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                right: 0,
              }}>
              + {profileReducer.earnedPerQuiz} | {profileReducer.points} Points
            </Text>
          </SafeAreaView>
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
          <SafeAreaView>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                right: 0,
              }}>
              {profileReducer.points} Points
            </Text>
          </SafeAreaView>
        </View>
      );
    }
  }

  render() {
    const {questionReducer} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#6BB1F1',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <SafeAreaView>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Question: {questionReducer.questNum + 1} /{' '}
              {Object.keys(questionReducer.QUESTIONS.results).length}
            </Text>
          </SafeAreaView>
        </View>

        {this.renderPoints()}
      </View>
    );
  }
}

const mapStateToProps = ({pageReducer, questionReducer, profileReducer}) => {
  return {pageReducer, questionReducer, profileReducer};
};
export default connect(mapStateToProps)(Header);
