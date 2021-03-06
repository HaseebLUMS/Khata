const firebase_conn = require('./firebase_conn');
const transactions = require('./transactions');



async function create_user(info) {
    if (info === undefined)
        return;

    let userProfile = {
        name: info['name'] || "",
        phone: info['phone'] || "",
        email: info['email'] || "",
        password: info['password'] || "",
        picture: "sample.png",
        notification: ["ABC"],
    };

    let userData = {
        "profile": userProfile,
        "groups": [],
        "transaction_history": [],
        "friends_list": [],
        "payables": [],
        "recievables": []
    };

    let unique_id = userProfile['email'].hashCode();

    let snapshot = await  firebase_conn.db.ref('users/'+unique_id).once('value');

    if(snapshot.val() != null) { // User already exists no need to create account
        console.log("User already exists, not making an account");
        return;
    }

    firebase_conn.db.ref('users/' + unique_id).set(userData);
    //firebase_conn.db.ref('users/'+unique_id+'/notification').on('value', snap => {
    //    console.log(`user${unique_id} notifications changed! :${snap.val()}`);
    //});





    firebase_conn.auth.createUserWithEmailAndPassword(userProfile['email'],userProfile['password']);
}

async function update_payables_and_recievables(userID){
    let snapshot = await firebase_conn.db.ref('users/'+userID+'/transaction_history').once('value');
    if(snapshot.val() === null){
        console.log('no transactions for users');
        return;
    }

    let transactionIDs = snapshot.val();

    payables_list = [];
    recievables_list = [];



    for(let i = 0; i < transactionIDs.length; i++){
        let trans = await transactions.fetch_transaction(transactionIDs[i]);

        if(trans != null){
            if(trans['to'] == userID){
                recievables_list.push(trans);
            } else {
                payables_list.push(trans);
            }
        }
    }

    firebase_conn.db.ref('users/'+userID+'/payables/').set(payables_list);
    firebase_conn.db.ref('users/'+userID+ '/recievables/').set(recievables_list);
}

async function get_payables(userID){
    let snapshot = await firebase_conn.db.ref('users/'+userID+'/payables/').once('value');
    if(snapshot.val() != null)
        console.log(snapshot.val());
    return snapshot.val();
}

async function get_recievables(userID){
    let snapshot = await firebase_conn.db.ref('users/'+userID+'/recievables/').once('value');
    if(snapshot.val() != null)
        console.log(snapshot.val());
    return snapshot.val();
}


String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash =  hash % 47055833459; // Convert to 32bit integer
        if(hash < 0){
            hash = hash * -1
        }
    }
    return hash;
};

function add_friend(userID, friendID) {
    return firebase_conn.db.ref(`users/${userID}/friends_list`).once('value').then(snapshot => {
        if (snapshot.val() === null) {
            firebase_conn.db.ref(`users/${userID}/friends_list/`).set([friendID]);
        } else {

            let friendsList = snapshot.val();
            if (friendsList.includes(friendID)) {
                console.log(`${userID} is already friends with ${friendID}`);
                return;
            }
            friendsList.push(friendID);
            firebase_conn.db.ref(`users/${userID}/friends_list/`).set(friendsList);

        }
    })

}


function remove_friend(userID, friendID) {
    return firebase_conn.db.ref(`users/${userID}/friends_list`).once('value').then(snapshot => {
        if (snapshot.val() != null) {
            let friendsList = snapshot.val();
            console.log(friendsList);
            if (friendsList.includes(friendID)) {
                firebase_conn.db.ref(`users/${userID}/friends_list/${friendsList.indexOf(friendID)}`).remove();
                return;
            }
            console.log(`${userID} is not friends with ${friendID}`);
        }
    })

}

function add_transaction(userID, transactionID) {
    return firebase_conn.db.ref(`users/${userID}/transaction_history/`).once('value').then(snapshot => {
        if (snapshot.val() === null) {
            firebase_conn.db.ref(`users/${userID}/transaction_history/`).set([transactionID]);
        } else {
            let transactionList = snapshot.val();

            if (transactionList.includes(transactionID)) {
                console.log(`${transactionID} already exists for user ${userID}`);
                return;
            }

            transactionList.push(transactionID);
            firebase_conn.db.ref(`users/${userID}/transaction_history/`).set(transactionList);
        }
    })
}

async function get_transactions(userID) {
    let snapshot = await firebase_conn.db.ref(`users/${userID}/transaction_history/`).once('value');
    let transactionList = snapshot.val();
    let transactions = [];

    for (let i = 0; i < transactionList.length; i++) {
        let sp = await firebase_conn.db.ref(`transactions/${transactionList[i]}`).once('value');
        transactions.push(sp.val())
    }
    console.log(transactions);
    return transactions;
}

function edit_info(userID, deltas) { // deltas would only contain key/values we want to update, not all fields in profile
    if (deltas === undefined)
        return;
    firebase_conn.db.ref(`users/${userID}/profile/`).once('value').then(snapshot => {
        if (snapshot.val() === null) {
            return;
        } else {
            return firebase_conn.db.ref(`users/${userID}/profile`).update(deltas);
        }
    })
}

async function get_user(userID){
    let snapshot= await firebase_conn.db.ref('users/'+userID).once('value');
    let result = snapshot.val();
    if(result === null) {
        console.log('User Doesnt exist');
        return null;
    } else {
        console.log(`Fetched ${JSON.stringify(result)}`);
        return result;
    }
}


async function is_valid_user(email,password){
    let isValid = true;
    await firebase_conn.auth.signInWithEmailAndPassword(email,password).catch((err) => {
        isValid = false;
    });
    return isValid;
}

async function add_user_to_group(userID,groupID){
    snap = await firebase_conn.db.ref(`users/`+userID+'/groups').once('value');
    if(snap.val()===null){
        firebase_conn.db.ref('users/'+userID+'/groups').set([groupID]);
    } else {
        let groupList = snap.val();
        groupList.push(userID);
        firebase_conn.db.ref('users/'+userID+'/groups').set(groupList);
    }
}

function addString(str){
    firebase_conn.stor.ref().child("images/").putString(str);
}

async function remove_group(userID, groupID){
    let snapshot = await firebase_conn.db.ref('users/'+userID+'/groups').once('value');

    if(snapshot.val() === null)
        return;

    let groupList = snapshot.val();

    let updatedList = groupList.filter(item => {
        return (item != groupID);
    });

    firebase_conn.db.ref('users/'+userID+'/groups').set(updatedList);
}


async function replyNotification(userID, creatorID, response){
    let responseObj = {"userID":userID, "response":response};

    let snapshot = await firebase_conn.db.ref('users/'+creatorID+'/responseList').once('value');

    if(snapshot.val() === null){
        return firebase_conn.db.ref('users/'+creatorID+'/responseList').set([responseObj]);
    } else {
        let responseList = snapshot.val();

        responseList.push(responseObj);

        return firebase_conn.db.ref('users/'+creatorID+'/responseList').set(responseList);
    }
}

module.exports = {
    create_user: create_user,
    add_friend: add_friend,
    remove_friend: remove_friend,
    add_transaction: add_transaction,
    get_transactions: get_transactions,
    edit_info: edit_info,
    get_user: get_user,
    is_valid_user: is_valid_user,
    addString: addString,
    add_user_to_group: add_user_to_group,
    remove_group: remove_group,
    replyNotification: replyNotification,
    update_payables_and_recievables, update_payables_and_recievables,
    get_recievables: get_recievables,
    get_payables: get_payables,
};

