import CouchbaseProvider from "./CouchbaseProvider";

let couchbaseProvider = new CouchbaseProvider();
let key = "user:king_arthur";
let value = {
  email: "kingarthur@couchbase.com",
  interests: ["Holy Grail", "African Swallows"]
};
async function main() {
  let result = await couchbaseProvider.upsert("", key, value);
  console.log(result);
}
main();
