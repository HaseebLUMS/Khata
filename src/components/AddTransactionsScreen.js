import React from 'react';
import AppBar from "./AppBar";
import {StyleSheet, TouchableOpacity, View,ScrollView} from 'react-native';
import {Card, FAB, TextInput, Title} from 'react-native-paper';
import TransactionCard from "./TransactionCard";
import {groupToShow} from "./groupscreensflow";
import {data, gist} from './transactionscreenflow';
import {send_notifications} from './data'

export default class newTransacrionScreen extends React.Component {

    state = {numOfCards:1};
    transactionData = {};

    _handle_press = () => {
        // this.transactionData[groupToShow['name']] = data;
        this.transactionData['name'] = groupToShow['name'];
        this.transactionData['transaction_info'] = data;
        this.transactionData['title'] = gist;
        /*
        * {
        *   group_name: name
        *   transaction_info: {
        *       0: {to: '', from: '', amount: '', toEm: '', fromEm: ''}
        *   }
        * }
        *
        * */

        send_notifications(this.transactionData);
        this.props.navigation.navigate('Home')
    };


    createTransaction = () => {

        let table =[];
        for(let i =0; i< this.state.numOfCards; i++){
            table.push(<TransactionCard id={i} group={groupToShow}/>)
        }
        return table;
    };

    render() {
        return (
            <View style={styles.main}>
                <AppBar
                    navigation={this.props.navigation}
                    title='Create new transaction'
                    subtitle='Enter transaction details'/>
                <ScrollView>
                    {this.createTransaction()}
                    <FAB
                        style={styles.add}
                        small={true}
                        icon="add"
                        color="white"
                        onPress={() => {this.setState({numOfCards:this.state.numOfCards+1})}}
                    />
                    <TouchableOpacity onPress={() => this._handle_press()}>
                        <Card style={styles.confirmButton}>
                            <Card.Content>
                                <Title style={{textAlign: 'center', color: 'white',}}> Confirm </Title>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
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
    name: {
        fontSize: 15,
        marginTop: 6,
        fontWeight: 'bold',
        color: 'black'
    },
    confirmButton: {
        bottom: 0,
        backgroundColor: '#aa2200',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 20,
        height: 45,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardStyle: {
        backgroundColor: 'white',
        borderBottomColor: 'blue',
        marginTop: 15,
        marginLeft: 8,
        marginRight: 8,
    },
    textBox:{
        marginLeft: 8,
        marginRight: 8,
        marginTop: 40,
    },
    add: {
        marginTop: 16,
        right: 0,
        marginLeft:'85%',
        backgroundColor:'#aa0022',
        width:'12%',
    },

});
