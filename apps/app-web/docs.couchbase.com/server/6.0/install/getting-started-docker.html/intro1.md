```
$ docker run -d --name db -p 8091-8096:8091-8096 -p 11210-11211:11210-11211 couchbase
```

You can check the Docker logs to verify that the container has started:

### Logs

```
$ docker logs db
```

### Setup

http://0.0.0.0:8091/ui/index.html
Cluster Name: cb-localhost
Username: Administrator
Password: password
