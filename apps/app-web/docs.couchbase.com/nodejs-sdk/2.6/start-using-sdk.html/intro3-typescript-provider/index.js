var couchbase = require("couchbase");
let bucketname = "startusingsdk";
let username = "Administrator";
let password = "password";
var cluster = new couchbase.Cluster("couchbase://localhost/");
cluster.authenticate(username, password);
var bucket = cluster.openBucket(bucketname);
var N1qlQuery = couchbase.N1qlQuery;
function queryCompleted(err, rows) {
  if (err) {
    console.error(err);
  } else {
    console.log("Got rows: %j", rows);
  }
}
function bucketCompleted(err, result) {
  console.log("Got result: %j", result.value);
  let queryWhere = "African Swallows";
  let query = `SELECT * FROM ${bucketname} WHERE "${queryWhere}" in interests LIMIT 1`;
  bucket.query(N1qlQuery.fromString(query), queryCompleted);
}

function upsertCompleted(err, result) {
  bucket.get("user:king_arthur", bucketCompleted);
}
function createPrimaryIndex() {
  bucket.upsert(
    "user:king_arthur",
    {
      email: "kingarthur@couchbase.com",
      interests: ["Holy Grail", "African Swallows"]
    },
    upsertCompleted
  );
}

bucket.manager().createPrimaryIndex(createPrimaryIndex);
