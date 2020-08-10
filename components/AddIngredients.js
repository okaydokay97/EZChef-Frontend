import React, { Component } from "react";
import { Image, FlatList, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import styles from '../styles/styles'
import { Searchbar } from 'react-native-paper'

export default class AddIngredients extends Component {

  constructor() {
    super()
    this.state = {
      searchQuery: '',
      ingredients: []
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


  handleSearch = () => {
    fetch('http://localhost:3000/ingredients_filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.searchQuery)
    })
      .then(resp => resp.json())
      .then(ingredients => {
        console.log(ingredients)
        if (!ingredients[0]) {
          fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=e399eab9a8694529b8ff1e1b1a0bf1ff&query=${this.state.searchQuery}&number=5&metaInformation=true`)
            .then(resp => resp.json())
            .then(data => {
              fetch('http://localhost:3000/ingredients', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
            })
        } else {
          console.log(ingredients)
        }
      })
  }

  handleChangeText = (event) => {
    this.setState({
      searchQuery: event
    })
  }

}