import React, { Component } from "react";
import { Image, FlatList, Text, SafeAreaView, View } from "react-native";
import { connect } from 'react-redux'

export class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: []
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      fetch('http://localhost:3000/pantry_ingredients_filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.currentUser.id)
      })
        .then(resp => resp.json())
        .then(ingredients => {
          this.setState({
            ingredients: ingredients
          })
        })
    }
  }



  render() {
    if (this.state.ingredients === []) {
      return (
        <View>
          <Text>Ingredients: </Text>
        </View>
      )
    } else {
      console.log(this.state.ingredients.length)
      return (
        <SafeAreaView>
          <FlatList
            data={this.state.ingredients}
            renderItem={({ item }) => (<Item name={item.name} />)}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    }
  }
}

const Item = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(Pantry)
