import couchbase from "couchbase";
const bucketname = "startusingsdk";
const username = "Administrator";
const password = "password";
const cluster = new couchbase.Cluster("couchbase://localhost/");
cluster.authenticate(username, password);
const bucket = cluster.openBucket(bucketname);
const N1qlQuery = couchbase.N1qlQuery;
function queryCompleted(err: any, rows: any) {
  if (err) {
    console.error(err);
  } else {
    console.log("Got rows:", rows);
  }
  // this is last point
  debugger;
}
function bucketCompleted(err: any, result: { value: any }) {
  console.log("Got result:", result.value);
  const queryWhere = "African Swallows";
  const query = `SELECT * FROM ${bucketname} WHERE "${queryWhere}" in interests LIMIT 1`;
  bucket.query(N1qlQuery.fromString(query), queryCompleted);
}

function upsertCompleted(err: any, result: any) {
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

function main() {
  bucket.manager().createPrimaryIndex(createPrimaryIndex);
}

main();
