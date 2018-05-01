import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StartQuest from './startQuest/startQuest';
import ShowQuest from './showQuest/showQuest';

export default class Quest extends Component {
    constructor() {
        super();
        this.state = {
            isQuestActive: false,
            questLocality: '',
            questRegion: ''
        }
        this.renderQuest = this.renderQuest.bind(this);
    }

    renderQuest(city, state) {
        this.setState({
            isQuestActive: true,
            questLocality: city,
            questRegion: state
        });
        this.props.toggleIcon();
    }

    render() {
        var questDisplay;
        if (!this.state.isQuestActive) {
            questDisplay = <StartQuest renderQuest={this.renderQuest} />
        } else {
            questDisplay = <ShowQuest
                questLocality={this.state.questLocality}
                questRegion={this.state.questRegion}
            />
        }

        return (
            <View style={styles.container}>
                {questDisplay}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});