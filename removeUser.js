const usr = require('./conf/user.json');
global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var jwt = require('jsonwebtoken');

const idtoken = jwt.decode(usr.idtoken, { complete: true });
const accesstoken = jwt.decode(usr.accesstoken, { complete: true });

const AccessToken = new AmazonCognitoIdentity.CognitoAccessToken({ AccessToken: usr.accesstoken });
const IdToken = new AmazonCognitoIdentity.CognitoIdToken({ IdToken: usr.idtoken });
const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: usr.refreshtoken });

const sessionData = {
    IdToken: IdToken,
    AccessToken: AccessToken,
    RefreshToken: RefreshToken
};

const userSession = new AmazonCognitoIdentity.CognitoUserSession(sessionData);

var poolData = {
    UserPoolId: '', // Your user pool id here
    ClientId: '', // Your client id here
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const userData = {
    Username: idtoken.payload.email,
    Pool: userPool
};

const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.setSignInUserSession(userSession);

cognitoUser.getSession(function (err, session) { // You must run this to verify that session (internally)
    if (session.isValid()) {
      console.log('Valid');
      cognitoUser.deleteUser((err, msg)=>{
          if(err){
              console.log(err);
              return;
          }
          console.log("User removed");
      })
    } else {
      // TODO: What to do if session is invalid?
    }
  });
