let conf = require('./conf/config.json');

global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

let poolData = {
    UserPoolId: conf.pool.UserPoolId, // Your user pool id here
    ClientId: conf.pool.ClientId // Your client id here
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

let confirmRegistration = (username, registrationCode) => {
    var userData = {
        Username: username,
        Pool: userPool
    };

    return new Promise((resolve, reject) => {

        try {
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            if (cognitoUser != null) {
                cognitoUser.confirmRegistration(registrationCode, true, function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve({
                        message: result
                    });
                });
            } else {
                console.log("User not found");
                reject({
                    message: "User not found"
                });
            }
        } catch (err) {
            console.log(err);
            reject({
                message: "Getting CognitoUser instance Failed"
            });
        }
    });
}