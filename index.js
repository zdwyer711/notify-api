const Mongo = require('./MongoDriver');
const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');
const fs = require('fs');
const mongoDriver = new Mongo();

app.use(cors());
app.get('/', function (req, res) {
    res.send('Welcome to Notify Tool API!.\n');
 })

 app.get('/notify/v1/subscription', function (req, res) {
    return getUserList(res);
})

app.post('/notify/v1/subscription', function (req, res) {
   if(req.query.id === "007"){
     return updateUserSubscriptionStatus(req, res);
   }
   const noUpdate = {
     "success": "false",
     "messsage": "No user updated"
   }
   res.send(noUpdate);
})


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(8080, function () {

   // var host = server.address().address
   // var port = server.address().port

   console.log('Service is running on port 8080!/')
})


async function getUserList(res){
  let userList = [];
  var users = await mongoDriver._getUsers();
  users.forEach(function(user, index, users){
      let userObj = {
        "id": user.id,
        "subscribed": user.subscribed,
        "role": user.role
      }
      userList.push(userObj);
    });
    res.send(userList);
}

async function updateUserSubscriptionStatus(req, res){
  console.log('Update subscription Hit!');
  await mongoDriver._updateSubscriptionStatus(req.query.id, req.query.subscription);
  res.send('User subscription status set!');
}
