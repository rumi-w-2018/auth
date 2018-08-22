import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import { firebaseConfig } from './config/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    // Auth state changed (If user is signed in or out).
    firebase.auth().onAuthStateChanged(user => {
      // if user exists
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  handleSignOut = () => {
    console.log('signing out');
    firebase.auth().signOut();
  };

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.viewStyle}>
            <Button onPress={() => this.handleSignOut()}>Log Out</Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  };

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
const styles = {
  viewStyle: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 5
  }
};
export default App;
