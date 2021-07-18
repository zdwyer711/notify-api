const Mongo = require('./MongoDriver');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoDriver = new Mongo();

app.use(cors());
app.get('/', function (req, res) {
    res.send('Welcome to Notify Tool API!.\n');
 })

 app.get('/notify/v1/subscription', function (req, res) {

    if(req.query.id === "007" && req.query.subscription){
      //TODO: Update user collection in monogdb and set
      //property of subscribed to false
      mongoDriver._updateSubscriptionStatus(req.query.id);
      res.send('User subscription status set!');

    }
    return getUserList(res);

})


const server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log('Server running at http://127.0.0.1:8080/')
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
