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
    }

    render() {
        var questDisplay;
        if (this.state.isQuestActive == false) {
            questDisplay = <StartQuest renderQuest={this.renderQuest}/>
        } else {
            questDisplay = <ShowQuest 
                questLocality={this.state.questLocality} 
                questRegion={this.state.questRegion}
            />
        }

        return(
            <View>
                { questDisplay }
            </View>
        )
    }
}