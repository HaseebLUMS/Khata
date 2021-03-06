import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements'
import {Avatar, Card, FAB, Title} from 'react-native-paper';
import {get_user,} from './data';
import {groupToShow, setCGM} from "./groupscreensflow";
import AppBar from "./AppBar";
//import {Icon} from "react-native-paper/typings/components/Avatar";

//const groups = [{key: 1, Title: 'Software Engineers', Paragraph: 'Recently eating at KFC!'}, {key: 2, Title: 'Hardware Engineers', Paragraph: 'Recently eating at PDC!'}, {key: 3, Title: 'Electrical Engineers', Paragraph: 'Recently eating at their own home!'}]


export default class GroupCard extends React.Component {

    state = {members: []};

    _fetchUsers = async () => {
        let local_users = [];
        let memIds = groupToShow['members'];
        await Promise.all(memIds.map(async g => local_users.push(await get_user(g))));
        setCGM(local_users);
        this.setState({members: local_users});
    };

    render() {
        this._fetchUsers();
        return (
            <View style={styles.main}>
                <AppBar navigation={this.props.navigation} title={groupToShow['name']}
                        subtitle='Members & Transactions' info='Group Info'/>


                <Card onPress={() => console.log('pressed')} style={styles.cardStyle}>
                    <Card.Content>
                        {
                            this.state.members.map(mem =>
                                <View style={styles.members}>
                                    <Title> {mem['profile']['name']}</Title>
                                    {/*<Text style={styles.name}> {mem['profile']['name']}</Text>*/}
                                </View>
                            )
                        }
                    </Card.Content>
                </Card>

                {/*<Card onPress={() => this.props.navigation.navigate('oldTransactions')} style={[styles.cardStyle, styles.newCard]} >*/}
                {/*    <Card.Content>*/}
                {/*        <View style = {{flexDirection: 'row'}}>*/}
                {/*            <Title> Old Transactions</Title>*/}
                {/*            <Text style={{color: 'white'}}>Hell Hell Hell</Text>*/}
                {/*            <Icon size={40} name="trending-flat" color='#aa2200' style={{position:'absolute', right:0}}/>*/}
                {/*        </View>*/}
                {/*    </Card.Content>*/}
                {/*</Card>*/}

                <FAB
                    style={styles.fab}
                    small
                    icon="add"
                    onPress={() => this.props.navigation.navigate('newTransactions')}
                />

            </View>

        );
    }
}


const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'white',
        borderBottomColor: 'blue',
        //borderBottomWidth: 2,
        marginTop: 3,
        marginLeft: 8,
        marginRight: 8,
    },
    newCard: {
      marginTop: 5,
    },
    name: {
        fontSize: 15,
        marginTop: 6,
        fontWeight: 'bold',
        color: 'black'
    },
    members: {
        borderBottomWidth: 1,
        borderColor: '#d6d7da',
        flexDirection: 'row',

    },
    main: {
        flex: 1,
        backgroundColor: 'antiquewhite',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#aa0022',
    },
});
