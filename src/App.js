import React from 'react';
import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation';
import HomeScreen from "./components/HomeScreen";
import AddGroupScreen from "./components/AddGroupScreen";
import HbMenu from "./components/hbMenu";
import QRScreen from "./components/QRScreen";
import {Dimensions} from 'react-native';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import GroupName from './components/GroupName'
import newTransactionScreen from './components/newTransacrionScreen'
import AddTransactionsScreen from './components/AddTransactionsScreen'
import GroupInfoScreen from './components/GroupInfoScreen'
import ProfileScreen from './components/ProfileScreen'
import Approval from './components/Approval'
import DebitCreditScreen from './components/DebitCreditScreen'
import DebitScreen from './components/DebitScreen'
import CreditScreen from './components/CreditScreen'
import SplashScreen from './components/SplashScreen'
import QRScannerScreen from './components/QRScannerScreen'
import oldTransactionsScreen from './components/oldTransactionsScreen'

const WIDTH = Dimensions.get('window').width;


import Notification from './components/Notification'
import transactionStatus from "./components/transactionStatus";
import EmailConfirmationScreen from "./components/EmailConfirmationScreen";
import friendListScreen from "./components/friendListScreen";

const DrawerConfig = {
    initialRouteName: 'MainStack',
    headerMode: 'screen',
    drawerWidth: WIDTH * 0.75,
    contentComponent: ({navigation}) => {
        return (<HbMenu navigation={navigation}/>)
    }
};

export const MainStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },

    AddGroup: {
        screen: AddGroupScreen,
        navigationOptions: {
            header: null,
        }
    },

    QR: {
        screen: QRScreen,
        navigationOptions: {
            header: null,
        }
    },

    FriendsList: {
        screen: friendListScreen,
        navigationOptions: {
            header: null,
        }
    },

    ScanQR: {
        screen: QRScannerScreen,
        navigationOptions: {
            header: null,
        }
    },

    GroupName: {
        screen: GroupName,
        navigationOptions: {
            header: null,
        }
    },

    Notification: {
        screen: Notification,
        navigationOptions: {
            header: null,
        }
    },

    newTransactions: {
        screen: newTransactionScreen,

        navigationOptions: {
            header: null,
        }
    },


    oldTransactions: {
      screen: oldTransactionsScreen,
      navigationOptions: {
          header: null,
      }
    },


    AddTransaction: {
        screen: AddTransactionsScreen,
        navigationOptions: {
            header: null,
        }
    },
    GroupInfo: {
        screen: GroupInfoScreen,
        navigationOptions: {
            header: null,
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
        }
    },
    Approval: {
        screen: Approval,
        navigationOptions: {
            header: null,
        }
    },
    TransactionStatus: {
        screen:transactionStatus,
        navigationOptions:{
            header:null,
        }
    },
    DebitCreditScreen: {
        screen:DebitCreditScreen,
        navigationOptions: {
            header: null,
        }
    },
    DebitScreen:{
        screen:DebitScreen,
        navigationOptions : {
            header: null,
        },
    },
    CreditScreen:{
        screen:CreditScreen,
        navigationOptions : {
            header: null,
        },
    },


},{headerMode: 'screen'});


export const Drawer = createDrawerNavigator({
    MainStack: {
        screen: MainStack
    }
}, DrawerConfig);


export const MainNavigator = createStackNavigator({
    SplashScreen:{
      screen:SplashScreen,
      navigationOptions:{
          header: null,
      },
    },
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null,
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null,
        }
    },
    EmailConfirmationScreen: {
        screen:EmailConfirmationScreen,
        navigationOptions:{
            header:null,
        }
    },
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
}, {headerMode: 'none'});


const App = createAppContainer(MainNavigator);

export default App;
