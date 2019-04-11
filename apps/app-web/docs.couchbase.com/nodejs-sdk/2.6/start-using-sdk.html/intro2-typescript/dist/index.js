"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const couchbase_1 = __importDefault(require("couchbase"));
const bucketname = "startusingsdk";
const username = "Administrator";
const password = "password";
const cluster = new couchbase_1.default.Cluster("couchbase://localhost/");
cluster.authenticate(username, password);
const bucket = cluster.openBucket(bucketname);
const N1qlQuery = couchbase_1.default.N1qlQuery;
function queryCompleted(err, rows) {
    if (err) {
        console.error(err);
    }
    else {
        console.log("Got rows:", rows);
    }
    // this is last point
    debugger;
}
function bucketCompleted(err, result) {
    console.log("Got result:", result.value);
    const queryWhere = "African Swallows";
    const query = `SELECT * FROM ${bucketname} WHERE "${queryWhere}" in interests LIMIT 1`;
    bucket.query(N1qlQuery.fromString(query), queryCompleted);
}
function upsertCompleted(err, result) {
    bucket.get("user:king_arthur", bucketCompleted);
}
function createPrimaryIndex() {
    bucket.upsert("user:king_arthur", {
        email: "kingarthur@couchbase.com",
        interests: ["Holy Grail", "African Swallows"]
    }, upsertCompleted);
}
function main() {
    bucket.manager().createPrimaryIndex(createPrimaryIndex);
}
main();
//# sourceMappingURL=index.js.map