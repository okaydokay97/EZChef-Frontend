import React, { Component } from "react";
import { Image, FlatList, Text, SafeAreaView } from "react-native";
import { connect } from 'react-redux'

export class Pantry extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView>
        <Text>{}</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Pantry)
