"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const couchbase_1 = __importDefault(require("couchbase"));
const N1qlQuery = couchbase_1.default.N1qlQuery;
class CouchbaseProvider {
    getIndexes(bucketName) {
        const bucket = this.getBucket(bucketName);
        const promise = new Promise((resolve, reject) => {
            bucket.manager().getIndexes((err, indexes) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(indexes);
                }
            });
        });
        return promise;
    }
    dropIndex(bucketName, indexName) {
        // https://docs.couchbase.com/server/6.0/n1ql/n1ql-language-reference/dropprimaryindex.html
        const bucket = this.getBucket(bucketName);
        const promise = new Promise((resolve, reject) => {
            bucket.manager().dropIndex(indexName, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
        return promise;
    }
    createPrimaryIndex(bucketName) {
        const bucket = this.getBucket(bucketName);
        const promise = new Promise((resolve, reject) => {
            bucket.manager().createPrimaryIndex((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
        return promise;
    }
    constructor(connectionString, username, password) {
        this.cluster = new couchbase_1.default.Cluster(connectionString);
        this.cluster.authenticate(username, password);
    }
    upsert(bucketName, key, value) {
        const bucket = this.getBucket(bucketName);
        const promise = new Promise((resolve, reject) => {
            bucket.upsert(key, value, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        return promise;
    }
    get(bucketName, key) {
        const bucket = this.getBucket(bucketName);
        const promise = new Promise((resolve, reject) => {
            bucket.get(key, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        return promise;
    }
    query(bucketName, query) {
        const bucket = this.getBucket(bucketName);
        const promise = new Promise((resolve, reject) => {
            let n1qlStringQuery = N1qlQuery.fromString(query);
            bucket.query(n1qlStringQuery, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        return promise;
    }
    getBucket(bucketName) {
        const bucket = this.cluster.openBucket(bucketName);
        return bucket;
    }
}
exports.default = CouchbaseProvider;
//# sourceMappingURL=CouchbaseProvider.js.map