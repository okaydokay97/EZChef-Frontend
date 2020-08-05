import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import t from "tcomb-form-native";

let logo = {
  uri:
    "https://cdn.pixabay.com/photo/2020/07/16/19/11/chef-5412009_960_720.png",
};

export default class Login extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {
      signupPressed: false,
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  }

  handleOnPress = () => {
    this.setState({ signupPressed: !this.state.signupPressed });
  };

  handleLogin = () => {
    let value = this.refs.login.getValue();
    this.setState({
      username: value.username,
      password: value.password,
    });
  };

  handleSignup = () => {
    let value = this.refs.signup.getValue();
    console.log(value);
    this.setState({
      email: value.email,
      username: value.username,
      password: value.password,
      confirmPassword: value.confirmPassword,
    });
  };

  renderLogin = () => {
    return (
      <View>
        <Text style={styles.title}>EZChef</Text>
        <Image source={logo} style={styles.img} />
        <Form ref="login" type={User} />
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
      </View>
    );
  };

  renderSignup = () => {
    return (
      <View>
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
      </View>
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

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
  },
  title: {
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: "bold",
    margin: "auto",
    textAlign: "center",
  },
  img: {
    width: 163,
    height: 200,
    resizeMode: "stretch",
    margin: 5,
  },
});
