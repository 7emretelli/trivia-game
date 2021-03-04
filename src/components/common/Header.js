import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class Header extends Component {
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
            paddingBottom: 10
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
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                right: 0,
              }}>
              200
            </Text>
          </View>
        </View>

    );
  }
}

const mapStateToProps = ({pageReducer, questionReducer}) => {
  return {pageReducer, questionReducer};
};
export default connect(mapStateToProps)(Header);
