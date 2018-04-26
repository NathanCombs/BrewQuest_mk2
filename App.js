import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Quest from './quest/quest';
import Login from './user/login/login';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      icon: true,
      isLoggedIn: false
    }
    this.toggleIcon = this.toggleIcon.bind(this);
    this.login = this.login.bind(this);
  }

  toggleIcon() {
    this.setState({ icon: !this.state.icon })
  }

  login() {
    this.setState({ isLoggedIn: true })
  }

  render() {
    var iconDisplay;
    if (this.state.icon) {
      iconDisplay = (
        <View style={styles.imageContainer}>
          <Image source={require('./images/beer.png')} />
        </View>
      )
    } else {
      iconDisplay = null;
    }

    var content;
    if (!this.state.isLoggedIn) {
      content = <Login login={this.login}/>
    } else { 
      content = <Quest toggleIcon={this.toggleIcon}/>
    }

    return (
      <View style={styles.container}>
        { iconDisplay }
        { content }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderColor: 'blue',
    // borderWidth: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  }
})
