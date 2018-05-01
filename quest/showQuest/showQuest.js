import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CityQuestMapper from './questMapper/cityQuestMapper'

export default class ShowQuest extends Component {
    constructor() {
        super();
    }

    //Functionality will be added here to conditionally render a search for either a city or entire state

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
        paddingTop: 20
    }
});
