import React, { Component } from "react";
import { Image, ScrollView, Text, SafeAreaView, View } from "react-native";
import { connect } from 'react-redux'
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: []
    }
  }

  handleDetails = (i) => {
    console.log(i)
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {this.props.pantryIngredients.map((i, index) => {
            return (
              <Card key={index} containerStyle={{ padding: 0 }}>
                <ListItem
                  roundAvatar
                  title={i.name}
                  leftAvatar={{ source: { uri: `https://spoonacular.com/cdn/ingredients_100x100/${i.image}` } }}
                  rightAvatar={<Button onPress={() => this.handleDetails(i)} title='>' />}
                />
              </Card>)
          })}
        </ScrollView>
      </SafeAreaView>
    );
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
    currentUser: state.currentUser,
    pantryIngredients: state.pantryIngredients
  }
}


export default connect(mapStateToProps)(Pantry)
