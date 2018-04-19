import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuestMapper from './questMapper/questMapper'

export default class ShowQuest extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <QuestMapper questLocality={this.props.questLocality} questRegion={this.props.questRegion} />
        )
    }
}