import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  handleChangeEmail = inEmail => {
    this.setState({
      email: inEmail
    });
  };

  handleChangePass = inPassword => {
    // console.log('pas', inPassword);
    this.setState({
      password: inPassword
    });
  };

  handleBtnPress = () => {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(error => {
        console.log(error);
        // Fail -> Try to create a new account
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => this.onLoginSuccess())
          .catch(error2 => {
            console.log(error2);
            // Fail -> Show error
            this.onLoginFail();
          });
      });
  };

  onLoginSuccess = () => {
    console.log('success');
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  };

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  };

  render() {
    const { errorTextStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Input
            secureTextEntry={false}
            text={this.state.email}
            placeholder="user@gmail.com"
            label="Email"
            onChangeText={email => this.handleChangeEmail(email)}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            text={this.state.password}
            placeholder="password"
            label="Password"
            onChangeText={password => this.handleChangePass(password)}
          />
        </CardSection>

        {this.state.error ? <Text style={errorTextStyle}>{this.state.error}</Text> : null}

        <CardSection>
          {this.state.loading ? <Spinner size="small" /> : <Button onPress={this.handleBtnPress}>Log in</Button>}
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

export default LoginForm;
