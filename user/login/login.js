import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

const ip = '192.168.1.245'
const port = '5000'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            passsword: '',
            //change paramaters in signin method to make functional
        }
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
    }

    signup() {
        axios.post(`http://${ip}:${port}/signup`, { username: this.state.username, password: this.state.password }).then(async (result) => {
            alert(result.data.message)
            if (result.data.token) {
                try {
                    await AsyncStorage.setItem('token', result.data.token);
                    this.props.login();
                } catch (error) {
                    alert(error)
                }
            }
        })
    }

    async signin() {
        try {
            let result = await axios.post(`http://${ip}:${port}/signin`, { username: 'Reg', password: '123' })
            await alert(result.data.message)
            if (result.data.token) {
                await AsyncStorage.setItem('token', result.data.token);
                await this.props.login();
            }
        } catch (error) {
            alert(error)
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.text}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextInput
                    style={styles.text}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <View style={styles.buttons}>
                    <Button
                        onPress={this.signin}
                        title="Login"
                        color="#841584"
                    />
                </View>
                <View style={styles.buttons}>
                    <Button
                        onPress={this.signup}
                        title="Create Account"
                        color="#841584"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    text: {
        width: 200,
        padding: 10,
        // borderColor: 'red',
        // borderWidth: 1,
    },
    buttons: {
        padding: 10,
        // borderColor: 'red',
        // borderWidth: 1,
    }
});