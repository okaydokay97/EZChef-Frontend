import React, { Component } from "react";
import { Image, FlatList, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import styles from '../styles/styles'
import { Searchbar } from 'react-native-paper'

export default class AddIngredients extends Component {

  constructor() {
    super()
    this.state = {
      searchQuery: ''
    }
  }
  render() {
    return (
      <SafeAreaView>
        <Searchbar
          placeholder='Search ingredients'
          onChangeText={this.handleChangeText}
          value={this.state.searchQuery}
          onIconPress={this.handleSearch}
          onBlur={this.handleSearch}
        />
      </SafeAreaView>
    );
  }

  handleSubmit = () => {
    console.log('hello')
  }

  handleSearch = () => {
    console.log('hello')
  }

  handleChangeText = (event) => {
    console.log(event)
    this.setState({
      searchQuery: event
    })
  }

}