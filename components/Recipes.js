import React, { Component } from "react";
import { Image, FlatList, Text, SafeAreaView, View } from "react-native";
import { connect } from 'react-redux'
import { Searchbar, Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { ListItem, Icon, Button } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import { addFavoritedRecipe } from '../actions/addFavoritedRecipe'
import { removeFavoritedRecipe } from '../actions/removeFavoritedRecipe'
import { favoriteFilter } from '../actions/favoriteFilter'
import { randomFilter } from '../actions/randomFilter'
import { checkedFilter } from '../actions/checkedFilter'



export class Recipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: false,
      random: false,
      checked: false,
      searchQuery: '',
      recipes: []
    }
  }


  getCheckedRecipes = () => {
    let checkedString = this.props.checkedItems.map((item) => item.split(' ').join('+')).join(',')
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e399eab9a8694529b8ff1e1b1a0bf1ff&includeIngredients=${checkedString}&number=10`)
      .then(resp => resp.json())
      .then(data => this.setState({ recipes: data.results }))
  }


  getRandomRecipes = () => {
    fetch('https://api.spoonacular.com/recipes/random?apiKey=e399eab9a8694529b8ff1e1b1a0bf1ff&number=20')
      .then(resp => resp.json())
      .then(data => this.setState({ recipes: data.recipes }))
  }

  getFavoriteRecipes = () => {
    fetch('http://localhost:3000/favorite_recipes_login_filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'userId': this.props.currentUser.id })
    })
      .then(resp => resp.json())
      .then(foundRecipes => this.setState({ recipes: foundRecipes.map((recipe) => recipe.content) }))
  }

  showIcon = (name, recipe) => {
    if (this.props.favoritedRecipes.filter((added) => added === name).length === 0) {
      return (
        <Icon
          name='hearto'
          type='antdesign'
          size={40}
          onPress={() => this.clickHeart(name, recipe)}
        />
      )
    } else {
      return (
        <Icon
          name='heart'
          type='antdesign'
          color={'red'}
          size={40}
          onPress={() => this.clickHeart(name, recipe)}
        />
      )
    }
  }

  componentDidMount() {
    if (this.props.favoritedRecipes.length === 0) {
      this.getRandomRecipes()
      this.setState({ random: true })
    } else {
      this.getFavoriteRecipes()
      this.setState({ favorites: true })
    }
  }

  filterRecipes = (filter) => {
    switch (filter) {
      case 'favorite':
        return this.getFavoriteRecipes()
      case 'random':
        return this.getRandomRecipes()
      case 'checked':
        return this.getCheckedRecipes()

    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
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
                <View key={index}>
                  <Card key={index} onPress={this.clickRecipes} style={{ padding: 0, margin: 10 }}>
                    <Card.Content>
                      <Title style={{ paddingBottom: 15 }}>{recipe.title}</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: recipe.image }} />
                    <Text></Text>
                    <Card.Actions style={{ justifyContent: 'flex-end' }}>
                      {this.showIcon(recipe.title, recipe)}
                    </Card.Actions>
                  </Card>
                  <Text></Text>

                </View>
              )
            })}

          </SafeAreaView>
        </ScrollView >
        <View style={{
          backgroundColor: 'white',
          flex: .12,
          borderTopColor: '#147efb',
          borderTopWidth: 1.25,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch'
        }}>
          <Button
            type='outline'
            onPress={() => this.filterRecipes('favorite')}
            style={{ flexGrow: 2 }}
            buttonStyle={{
              flexGrow: 2, width: 135, borderRightWidth: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: ''
            }}
            icon={{
              name: 'heart',
              type: 'antdesign',
              size: 40,
              color: '#147efb'
            }}
          ></Button>
          <Button
            type='outline'
            onPress={() => this.filterRecipes('random')}
            buttonStyle={{ flexGrow: 2, width: 146, borderRightWidth: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderLeftWidth: 1 }}
            style={{ flexGrow: 2 }}
            icon={{
              name: 'random',
              type: 'font-awesome',
              size: 40,
              color: '#147efb'
            }}
          ></Button>
          <Button
            type='outline'
            onPress={() => this.filterRecipes('checked')}
            buttonStyle={{ flexGrow: 2, width: 138, borderLeftWidth: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            style={{ flexGrow: 2 }}
            icon={{
              name: 'checkbox',
              type: 'foundation',
              size: 40,
              color: '#147efb'
            }}
          ></Button>
        </View>
      </View >
    );
  }

  clickRecipes = () => {
    console.log('recipe')
  }

  clickHeart = async (name, recipe) => {
    if (this.props.favoritedRecipes.filter((added) => added === name).length === 0) {
      await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'content': recipe })
      })
        .then(resp => resp.json())
        .then(async data => {
          await fetch('http://localhost:3000/favorite_recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'userId': this.props.currentUser.id, 'recipeId': data.id })
          })
        })
        .then(this.props.addFavoritedRecipe(name))
    } else {
      fetch('http://localhost:3000/favorite_recipes_filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'userId': this.props.currentUser.id, 'recipeName': name })
      })
        .then(resp => resp.json())
        .then(data => {
          fetch(`http://localhost:3000/favorite_recipes/${data.id}`, {
            method: 'DELETE'
          })
        })
      this.props.removeFavoritedRecipe(name)
    }
  }

  handleChangeText = (event) => {
    this.setState({
      searchQuery: event
    })
  }

}

const mapDispatchToProps = {
  addFavoritedRecipe,
  removeFavoritedRecipe,
  favoriteFilter,
  randomFilter,
  checkedFilter
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    pantryIngredients: state.pantryIngredients,
    checkedItems: state.checkedItems,
    favoritedRecipes: state.favoritedRecipes,
    filterRecipes: state.filterRecipes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)