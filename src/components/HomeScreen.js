import React from 'react';
import AppBar from "./AppBar";
import GroupCard from "./GroupCard";

import {ScrollView, StyleSheet, View,} from 'react-native';
import {CurrentUser} from "./data";
import {db} from "../config";

export default class HomeScreen extends React.Component {



    constructor(props){
        super(props);
        this.state = {
        };

        let id = CurrentUser['profile']['email'].hashCode();
        db.ref('users/'+id+'/groups/').on('value', snapshot => {
            this.forceUpdate();
        })
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.forceUpdate();
            }
        );
    }



    render() {
        return (
            <View style={styles.main}>
                <AppBar navigation={this.props.navigation} title='Home' subtitle='Your Groups'/>
                <ScrollView>
                    <GroupCard navigation={this.props.navigation}/>
                </ScrollView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'antiquewhite',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#aa0022',
    },
});
