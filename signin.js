const usr = require('./conf/user.json');
global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var authenticationData = {
    Username: usr.username,
    Password: usr.password
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

var poolData = {
    UserPoolId: '', // Your user pool id here
    ClientId: '', // Your client id here
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var userData = {
    Username: '',
    Pool: userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        var idToken = result.getIdToken().getJwtToken();
        var refreshToken = result.getRefreshToken().getToken();
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
        //var idToken = result.idToken.jwtToken;
        console.log("User logged in with AccessToken " + accessToken);
        console.log("User logged in with idToken " + idToken);
        console.log("User logged in with refreshToken " + refreshToken);

    },

    onFailure: function (err) {
        console.log(err);
    }
});