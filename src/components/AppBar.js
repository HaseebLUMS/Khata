import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';


export default class AppBar extends React.Component {

    render() {
        return (
            <Appbar.Header style={styles.bar}>
                <Appbar.Action icon="menu" onPress={() => this.props.navigation.navigate('hbMenu')}/>
                <Appbar.Content
                    title="Home"
                    subtitle="Your Groups"
                />
                <Appbar.Action icon="add" onPress={() => this.props.navigation.navigate('AddGroup')}/>
            </Appbar.Header>
        );
    }
}


const styles = StyleSheet.create({
    bar: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: -10,
        backgroundColor: '#aa2200',
        //alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: "bold",
    },
});
