import React, { Component } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Button, ThemeProvider } from 'react-native-elements'
import { connect } from 'react-redux'
import { addCurrentUser } from '../actions/addCurrentUser'
import { addPantryIngredients } from '../actions/addPantryIngredients'
import styles from '../styles/styles'
import t from "tcomb-form-native";

let logo = { uri: "https://cdn.pixabay.com/photo/2020/07/16/19/11/chef-5412009_960_720.png" };

export class Login extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {
      signupPressed: false,
    };
  }

  handleOnPress = () => {
    this.setState({ signupPressed: !this.state.signupPressed });
  };

  handleLogin = async () => {
    let value = this.refs.login.getValue();
    if (!value) {
      return (
        alert("All Fields Must be filled")
      )
    } else {
      await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
        .then(resp => resp.json())
        .then(async data => {
          if (data.error) {
            alert(data.error)
          } else {
            await this.props.addCurrentUser(data)
          }
        })
    }
    fetch('http://localhost:3000/pantry_ingredients_filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.currentUser.id)
    })
      .then(resp => resp.json())
      .then(async ingredients => {
        await this.props.addPantryIngredients(ingredients)
        this.props.navigation.replace("Pantry")
      })
  };



  handleSignup = () => {
    let value = this.refs.signup.getValue();
    if (!value) {
      alert("All Fields Must be filled")
    } else if (value.password !== value.confirmPassword) {
      alert('Passwords Did Not Match')
    } else {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
        .then(resp => resp.json())
        .then(async newUser => {
          await this.props.addCurrentUser({
            id: newUser.id,
            username: newUser.username
          })
          this.props.navigation.navigate("Pantry")
        })
    }

  };

  renderLogin = () => {
    return (
      <SafeAreaView>
        <Text style={styles.title}>EZChef</Text>
        <Image source={logo} style={styles.img} />
        <View />
        <View style={{ margin: 15 }}>
          <Form
            ref="login"
            type={User}
            options={options}
          />
        </View>
        <Button
          buttonStyle={{ width: 125, alignSelf: 'center' }}
          onPress={this.handleLogin}
          title="Login"
          style={styles.button}
        />
        <Text></Text>
        <Button
          buttonStyle={{ width: 125, alignSelf: 'center' }}
          onPress={this.handleOnPress}
          title="Sign up"
          style={styles.button}
        />
      </SafeAreaView>
    );
  };


  renderSignup = () => {
    return (
      <SafeAreaView>
        <Text style={styles.title}>EZChef</Text>
        <Image source={logo} style={styles.img} />
        <View style={{ margin: 15 }}>
          <Form
            ref="signup"
            type={Signup}
            options={options}
          />
        </View>
        <ThemeProvider>
          <Button
            buttonStyle={{ width: 125, alignSelf: 'center' }}
            onPress={this.handleSignup}
            title="Create Account"
            style={styles.button}
          />
          <Text></Text>
          <Button
            buttonStyle={{ width: 125, alignSelf: 'center' }}
            onPress={this.handleOnPress}
            title="Back to login"
            style={styles.button}
          />
        </ThemeProvider>
      </SafeAreaView>
    );
  };

  render() {
    if (!this.state.signupPressed) {
      return this.renderLogin();
    } else {
      return this.renderSignup();
    }
  }
}

const Form = t.form.Form;

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
    },
    username: {
      margin: '4px',
      autoCapitalize: 'none'
    },
    password: {
      secureTextEntry: true,
      autoCapitalize: 'none'
    },
    confirmPassword: {
      secureTextEntry: true,
      autoCapitalize: 'none'
    }
  }
}

const User = t.struct({
  username: t.String,
  password: t.String,
});

const Signup = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  confirmPassword: t.String,
});

const mapDispatchToProps = {
  addCurrentUser,
  addPantryIngredients
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    pantryIngredients: state.pantryIngredients
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)