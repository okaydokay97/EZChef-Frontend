import React, { Component } from "react";
import { Image, FlatList, Text, SafeAreaView, View } from "react-native";
import { connect } from 'react-redux'
import { Searchbar, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import { ListItem, Icon } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";


export class Recipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      recipes: []
    }
  }


  getRandomRecipes = () => {
    fetch('https://api.spoonacular.com/recipes/random?apiKey=e399eab9a8694529b8ff1e1b1a0bf1ff&number=10')
      .then(resp => resp.json())
      .then(data => this.setState({ recipes: data.recipes }))
  }


  componentDidMount() {
    this.getRandomRecipes()
  }

  render() {
    if (this.props.checkedItems.length === 0) {
      return (
        <ScrollView>
          <SafeAreaView>
            <Searchbar
              placeholder='Search recipes'
              onChangeText={this.handleChangeText}
              value={this.state.searchQuery}
              onIconPress={this.handleSearch}
              onBlur={this.handleSearch}
            />
            {this.state.recipes.map((recipe, index) => {
              return (
                <View>
                  <Card onPress={this.clickRecipes} style={{ padding: 0, margin: 10 }}>
                    <Card.Content>
                      <Title style={{ paddingBottom: 15 }}>{recipe.title}</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: recipe.image }} />
                    <Text></Text>
                    <Card.Actions style={{ justifyContent: 'flex-end' }}>
                      <Icon
                        name='heart'
                        type='evilicon'
                        size={40}
                        onPress={this.clickHeart}
                      />
                    </Card.Actions>
                  </Card>
                  <Text></Text>
                </View>
              )
            })}

          </SafeAreaView>
        </ScrollView >
      );
    } else {
      return (<View></View>)
    }
  }

  clickRecipes = () => {
    console.log('recipe')
  }

  clickHeart = () => {
    console.log('heart')
  }

  handleChangeText = (event) => {
    this.setState({
      searchQuery: event
    })
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    pantryIngredients: state.pantryIngredients,
    checkedItems: state.checkedItems
  }
}

export default connect(mapStateToProps)(Recipes)