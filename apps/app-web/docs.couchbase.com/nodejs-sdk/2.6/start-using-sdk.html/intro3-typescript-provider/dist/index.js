"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CouchbaseProvider_1 = __importDefault(require("./CouchbaseProvider"));
const username = "Administrator";
const password = "password";
const connectionString = "couchbase://localhost/";
let couchbaseProvider = new CouchbaseProvider_1.default(connectionString, username, password);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const bucketName = "startusingsdk";
        let key = "user:king_arthur";
        let value = {
            email: "kingarthur@couchbase.com",
            interests: ["Holy Grail", "African Swallows"]
        };
        // upsert
        let upsertResult = yield couchbaseProvider.upsert(bucketName, key, value);
        console.log("upsertResult:", JSON.stringify(upsertResult, null, 4));
        // get
        let getResult = yield couchbaseProvider.get(bucketName, key);
        console.log("getResult:", JSON.stringify(getResult, null, 4));
        // get indexes
        let indexes = yield couchbaseProvider.getIndexes(bucketName);
        console.log("indexes:", JSON.stringify(indexes, null, 4));
        // dropIndex
        let dropIndex = yield couchbaseProvider.dropIndex(bucketName, indexes[0].name);
        console.log("dropIndex:", JSON.stringify(dropIndex, null, 4));
        // createPrimaryIndex
        let createPrimaryIndexResult = yield couchbaseProvider.createPrimaryIndex(bucketName);
        console.log("createPrimaryIndexResult:", JSON.stringify(createPrimaryIndexResult, null, 4));
        // query
        let query = `SELECT * FROM ${bucketName} WHERE "African Swallows" in interests LIMIT 1`;
        let queryResult = yield couchbaseProvider.query(bucketName, query);
        console.log("queryResult:", JSON.stringify(queryResult, null, 4));
    });
}
main();
//# sourceMappingURL=index.js.map