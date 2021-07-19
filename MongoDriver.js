const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
//const url = "mongodb://localhost:27017/Pnyx";
const url = "mongodb://52.170.188.135:27017/Pnyx"
const client = new MongoClient(url);

class mongoDriver {

    async _getUsers() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Notify");
                dbo.collection("Users").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  resolve(result);
                  db.close();
                });
              });
        });
    }

    async _updateSubscriptionStatus(userId, subscriptionStatus){

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Notify");
        var newvalues = { $set: { subscribed:  subscriptionStatus } };
        dbo.collection("Users").updateOne({ id: userId }, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }
}

module.exports = mongoDriver;
