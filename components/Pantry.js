import React, { Component } from "react";
import { Image, ScrollView, Text, SafeAreaView, View } from "react-native";
import { connect } from 'react-redux'
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { addChecked } from '../actions/addChecked'
import { removeChecked } from '../actions/removeChecked'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { removePantryIngredient } from '../actions/removePantryIngredient'

export class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: []
    }
  }

  //  let allIngredientNamesChecked = this.props.pantryIngredients.map((i) => `${i.name.split(' ').join('')}Checked`)
  // console.log(allIngredientNamesChecked)

  handleRemove = async (i) => {
    ingredientUserData = { ingredientId: i.id, userId: this.props.currentUser.id }
    // console.log(ingredientUserData)
    await fetch(`http://localhost:3000/pantry_ingredients/${i.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredientUserData)
    })
    this.props.removePantryIngredient(i)
  }

  handleCheck = (name) => {
    if (!(this.props.checkedItems.filter((added) => added === name).length === 0)) {
      this.props.removeChecked(name)
    } else {
      this.props.addChecked(name)
    }
  }

  checkChecked = (name) => {
    if (!(this.props.checkedItems.filter((added) => added === name).length === 0)) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <ScrollView>
        {this.props.pantryIngredients.map((i, index) => {
          let titleCased = i.name.split(' ').map((a) => `${a[0].toUpperCase() + a.slice(1)}`).join(' ')
          return (
            <SwipeRow
              key={index}
              rightOpenValue={-80}
              stopLeftSwipe={1}
            >
              <View>
                <Card containerStyle={{ padding: 0 }}>
                  <Button
                    onPress={() => this.handleRemove(i)}
                    style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                    buttonStyle={{ backgroundColor: 'red', width: 80, height: 83 }}
                    icon={
                      <Icon
                        name='trash'
                        size={35}
                        color='white'
                        type='evilicon'
                      />
                    }
                  />
                </Card>
              </View>
              <View >
                <Card key={index} containerStyle={{ padding: 0 }}>
                  <ListItem
                    roundAvatar
                    title={titleCased}
                    leftAvatar={{ source: { uri: `https://spoonacular.com/cdn/ingredients_100x100/${i.image}` } }}
                    rightAvatar={
                      <>
                        <CheckBox
                          title={null}
                          checked={this.checkChecked(i.name)}
                          onPress={() => this.handleCheck(i.name)}
                        />

                      </>
                    }
                  />
                </Card>
              </View>
            </SwipeRow>
          )
        })
        }
      </ScrollView >
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
    pantryIngredients: state.pantryIngredients,
    checkedItems: state.checkedItems,
  }
}

const mapDispatchToProps = {
  addChecked,
  removeChecked,
  removePantryIngredient
}


export default connect(mapStateToProps, mapDispatchToProps)(Pantry)
