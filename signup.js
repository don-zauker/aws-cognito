global.fetch = require('node-fetch');
let conf = require('./conf/config.json');

let AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

let poolData = {
    UserPoolId: conf.pool.UserPoolId, // Your user pool id here
    ClientId: conf.pool.ClientId // Your client id here
};
let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

let signup = (username, password) => {
    return new Promise((resolve, reject) => {
        var attributeList = [];

        /*var dataEmail = {
            Name: 'email',
            Value: 'testo@test.com',
        };*/

        /* var dataPhoneNumber = {
           Name: 'phone_number',
           Value: '+15555555555',
         };*/
        //var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        /*var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
          dataPhoneNumber
        );*/

        //attributeList.push(attributeEmail);
        //attributeList.push(attributePhoneNumber);

        userPool.signUp(username, password, null, null, (err, data) => {
            let result = '';
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('Creted user successfully ' + data.user.getUsername());
                result = {
                    message: 'User ' + data.user.getUsername() + 'created successfully',
                };
                resolve(result);
            }
        });
    });
}