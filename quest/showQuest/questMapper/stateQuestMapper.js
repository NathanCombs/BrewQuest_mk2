import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ViewPagerAndroid } from 'react-native';
import axios from 'axios';

//Next step: implement this functionality to allow user to omit city for search

export default class StateQuestMapper extends Component {
    render() {
        return (
            <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
                {this.state.data.map((value, index) => {
                    if (this.state.data[index].openToPublic === "Y" && this.state.data[index].isClosed === "N") {
                        return (
                            <View>
                                <Text>
                                    {this.state.data[index].brewery.name}
                                    {this.state.data[index].streetAddress}, {this.state.data[index].locality}
                                </Text>
                            </View>
                        )
                    }
                })}
            </ViewPagerAndroid>
        )
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1
    }
});

