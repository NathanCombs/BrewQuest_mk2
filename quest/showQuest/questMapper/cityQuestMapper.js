import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ViewPagerAndroid, AsyncStorage } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import axios from 'axios';

const ip = '192.168.1.245'
const port = '5000'

export default class CityQuestMapper extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            breweriesVisited: []
        }
    }

    async componentDidMount() {
        try {
            if (this.props.locality.length) {
                let APIdata = await axios.get(`http://api.brewerydb.com/v2/locations?locality=${this.props.locality}&region=${this.props.region}&key=a131f838b45763aaffb478ed486222ba`)
                await axios.post(`http://${ip}:${port}/addBrewData`, { data: APIdata.data.data })
                let DBdata = await axios.post(`http://${ip}:${port}/fetchBrewData`, { locality: this.props.locality, region: this.props.region })
                let token = await AsyncStorage.getItem('token');
                let userData = await axios.post(`http://${ip}:${port}/fetchUserData`, {token: token})
                await this.setState({ 
                    data: DBdata.data,
                    breweriesVisited: userData.data[0].breweries_visited 
                })
            }
        } catch (error) {
            alert(error)
        } 
    }

    async onButtonPress(index) {
        try {
            let token = await AsyncStorage.getItem('token');
            let updatedBV = await axios.post(`http://${ip}:${port}/updateUserData`, { token: token, id: `${index}` })
            await this.setState({
                breweriesVisited: updatedBV.data[0].breweries_visited
            })
        } catch (error) {
            alert(error)
        }
    }
    
    render() {
        return (
            this.state.data.map((value, index) => {
                let cardStyles;
                let button;
                if (this.state.breweriesVisited.indexOf(this.state.data[index].id) < 0) {
                    cardStyles = styles.card
                    button = <View style={styles.button}><Button
                        onPress={this.onButtonPress.bind(this, this.state.data[index].id)}
                        title="Conquer"
                        color="#841584"
                        /></View>
                } else {
                    cardStyles = stylesClear.card
                }
                return (
                    <View key={index} style={cardStyles}>
                        <View style={styles.icon}>
                            <Image style={{ width: 75, height: 75 }} source={{ uri: this.state.data[index].icon }} />
                        </View>
                        <View style={styles.textField}>
                            <Text style={styles.text}>{this.state.data[index].name}</Text>
                            <Text style={styles.text}>{this.state.data[index].streetaddress}</Text>
                        </View>
                        { button }
                    </View>
                )
            })
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        // borderWidth: 1,
        // borderColor: 'purple',

    },
    textField: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'orange',
    },
    text: {
        textAlign: 'center',
        flex: 1,
        //flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    icon: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'yellow'
    },
    button: {
        flex: 1,
    }
});

const stylesClear = StyleSheet.create({
    card: {
        flex: 1,
        // flexDirection: 'row',
        width: 400,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        opacity: 0.5,
        // borderWidth: 1,
        // borderColor: 'purple',
    }
});
