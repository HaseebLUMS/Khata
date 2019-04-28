import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Card, Paragraph, Title} from 'react-native-paper';
import {fetch_notification, CurrentUser,} from './data';
import {updateNTS} from './notificationsscreenflow'
//import {Icon} from "react-native-paper/typings/components/Avatar";

//const groups = [{key: 1, Title: 'Software Engineers', Paragraph: 'Recently eating at KFC!'}, {key: 2, Title: 'Hardware Engineers', Paragraph: 'Recently eating at PDC!'}, {key: 3, Title: 'Electrical Engineers', Paragraph: 'Recently eating at their own home!'}]


export default class NotificationCard extends React.Component {

    state = {notifications: []};

    caller = (g) => {
        updateNTS(g);
        this.props.navigation.navigate('Approval')
    };


    getNotifications = async() => {
      let nots = await fetch_notification(CurrentUser['profile']['email'].hashCode());
      console.log(nots);
      if(nots){
          this.setState({notifications: nots})
      }

    };

    render() {
        this.getNotifications();
        if(this.state.notifications.length > 0){
            return this.state.notifications.map(g =>
                <Card onPress={() => this.caller(g)} style={styles.cardStyle}>
                    <Card.Content>
                        <Title style={{fontSize: 16}}> {g.creator + " created a transaction with you"}</Title>
                        <View style={{flexDirection: 'row'}}>
                            {<Text style={{color: 'white'}}>Hell</Text>}
                            <Title style={{fontSize: 14}}>{g.title}</Title>
                            {<Text style={{color: 'white'}}>Hell</Text>}
                            <Text style={{fontSize: 20}}>{g.time}</Text>
                        </View>
                    </Card.Content>
                </Card>
            );
        }
        else{
            return(
                <View></View>
            );
        }

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
});
