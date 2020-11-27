import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class Header extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 90,
            backgroundColor: '#8EDAA3',
            flexDirection: 'row',
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={{marginTop: 45, fontSize: 16, fontWeight: 'bold'}}>
              Question: {this.props.Page.questNum + 1} /{' '}
              {Object.keys(this.props.QDATA.QUESTIONS.results).length}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                marginTop: 45,
                fontSize: 18,
                fontWeight: 'bold',
                right: 0,
              }}>
              200
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {Page, QDATA} = state;
  return {Page, QDATA};
};
export default connect(mapStateToProps)(Header);
