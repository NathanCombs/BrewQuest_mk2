import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import CityQuestMapper from './questMapper/cityQuestMapper'

// const ip = '192.168.1.63'
// const port = '5000'

export default class ShowQuest extends Component {
    constructor() {
        super();
        // this.state = {
        //     data: [],
        //     stateWide: ''
        // }
    }

    // componentDidMount() {
    //     if (this.props.questLocality.length) {
    //         axios.get(`http://api.brewerydb.com/v2/locations?locality=${this.props.questLocality}&region=${this.props.questRegion}&key=a131f838b45763aaffb478ed486222ba`).then(async (response) => {
    //             try {
    //                 await axios.post(`http://${ip}:${port}/addBrewData`, { data: response.data.data })
    //             } catch (error) {
    //                 alert(error)
    //             }
    //         })
    //     }
    // }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} >
                <CityQuestMapper locality={this.props.questLocality} region={this.props.questRegion} onCheckPress={this.onCheckPress} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 20,
        //flex: 1,
        //justifyContent: 'center',
        // alignSelf: 'stretch',
        // borderWidth: 1,
        // borderColor: 'red'
    }
});
