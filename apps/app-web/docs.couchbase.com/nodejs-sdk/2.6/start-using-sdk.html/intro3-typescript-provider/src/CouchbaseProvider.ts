import couchbase, { Bucket, N1qlStringQuery } from "couchbase";
const N1qlQuery = couchbase.N1qlQuery;
export default class CouchbaseProvider {
  getIndexes(bucketName: string): Promise<any> {
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      bucket.manager().getIndexes((err, indexes) => {
        if (err) {
          reject(err);
        } else {
          resolve(indexes);
        }
      });
    });
    return promise;
  }
  dropIndex(bucketName: string, indexName: string) {
    // https://docs.couchbase.com/server/6.0/n1ql/n1ql-language-reference/dropprimaryindex.html
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      bucket.manager().dropIndex(indexName, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
    return promise;
  }
  createPrimaryIndex(bucketName: string) {
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      bucket.manager().createPrimaryIndex((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
    return promise;
  }

  cluster: couchbase.Cluster;
  constructor(connectionString: string, username: string, password: string) {
    this.cluster = new couchbase.Cluster(connectionString);
    this.cluster.authenticate(username, password);
  }
  public upsert(bucketName: string, key: string, value: any): Promise<any> {
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      bucket.upsert(key, value, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return promise;
  }
  public get(bucketName: string, key: string): Promise<any> {
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      bucket.get(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return promise;
  }
  query(bucketName: string, query: string): Promise<any> {
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      let n1qlStringQuery: N1qlStringQuery = N1qlQuery.fromString(query);
      bucket.query(n1qlStringQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return promise;
  }
  private getBucket(bucketName: string): couchbase.Bucket {
    const bucket = this.cluster.openBucket(bucketName);
    return bucket;
  }
}
