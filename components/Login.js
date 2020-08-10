import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  TextInput
} from "react-native";
import { connect } from 'react-redux'
import { addCurrentUser } from '../actions/addCurrentUser'
import styles from '../styles/styles'
import t from "tcomb-form-native";

let logo = {
  uri:
    "https://cdn.pixabay.com/photo/2020/07/16/19/11/chef-5412009_960_720.png",
};

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
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.props.addCurrentUser(data)
          }
        })

      // console.log(this.props.currentUser)
      this.props.navigation.navigate("Pantry")
    }
  };



  handleSignup = () => {
    let value = this.refs.signup.getValue();
  };

  renderLogin = () => {
    return (
      <SafeAreaView>
        <Text style={styles.title}>EZChef</Text>
        <Image source={logo} style={styles.img} />
        <View />
        <Form ref="login" type={User} options={options} />
        <Button
          onPress={this.handleLogin}
          title="Login"
          style={styles.button}
        />
        <Button
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
        <Form ref="signup" type={Signup} />
        <Button
          onPress={this.handleSignup}
          title="Create account"
          style={styles.button}
        />
        <Button
          onPress={this.handleOnPress}
          title="Back to login"
          style={styles.button}
        />
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
    username: {
      autoCapitalize: 'none'
    },
    password: {
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
  addCurrentUser
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)