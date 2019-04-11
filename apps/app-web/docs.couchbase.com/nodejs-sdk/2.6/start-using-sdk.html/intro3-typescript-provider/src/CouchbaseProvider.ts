import couchbase, { Bucket } from "couchbase";
export default class CouchbaseProvider {
  constructor() {}
  public upsert(bucketName: string, key: string, value: any): Promise<any> {
    const bucket: Bucket = this.getBucket(bucketName);
    const promise = new Promise((resolve, reject) => {
      bucket.get("user:king_arthur", (err, result) => {
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
    throw new Error("Method not implemented.");
  }
}
