import CouchbaseProvider from "./CouchbaseProvider";
const username = "Administrator";
const password = "password";

const connectionString = "couchbase://localhost/";
let couchbaseProvider = new CouchbaseProvider(connectionString, username, password);

async function main() {
  const bucketName = "startusingsdk";
  let key = "user:king_arthur";
  let value = {
    email: "kingarthur@couchbase.com",
    interests: ["Holy Grail", "African Swallows"]
  };
  // upsert
  let upsertResult = await couchbaseProvider.upsert(bucketName, key, value);
  console.log("upsertResult:", JSON.stringify(upsertResult, null, 4));
  // get
  let getResult = await couchbaseProvider.get(bucketName, key);
  console.log("getResult:", JSON.stringify(getResult, null, 4));
  // get indexes
  let indexes = await couchbaseProvider.getIndexes(bucketName);
  console.log("indexes:", JSON.stringify(indexes, null, 4));
  // dropIndex
  let dropIndex = await couchbaseProvider.dropIndex(bucketName, indexes[0].name);
  console.log("dropIndex:", JSON.stringify(dropIndex, null, 4));
  // createPrimaryIndex
  let createPrimaryIndexResult = await couchbaseProvider.createPrimaryIndex(bucketName);
  console.log("createPrimaryIndexResult:", JSON.stringify(createPrimaryIndexResult, null, 4));
  // query
  let query = `SELECT * FROM ${bucketName} WHERE "African Swallows" in interests LIMIT 1`;
  let queryResult = await couchbaseProvider.query(bucketName, query);
  console.log("queryResult:", JSON.stringify(queryResult, null, 4));
}
main();
