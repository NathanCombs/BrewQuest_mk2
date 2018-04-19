import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';

//{this.props.questLocality}, {this.props.questRegion}

export default class QuestMapper extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get(`http://api.brewerydb.com/v2/locations?locality=${this.props.questLocality}&region=${this.props.questRegion}&key=a131f838b45763aaffb478ed486222ba`).then((response) => {
            this.setState({data: response.data.data})    
        })
    }

    render() {
        return (
            this.state.data.map((value, index) => {            
                if (this.state.data[index].openToPublic === "Y" && this.state.data[index].isClosed === "N") {
                    return (
                        <Text key={index}>
                            {this.state.data[index].brewery.name}
                        </Text>
                    )
                }
            })
        )
    }
}