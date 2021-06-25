# Lancer les BDD

## MSSQL

### Local

```
docker pull mcr.microsoft.com/mssql/server:2019-latest
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=123456Example' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

### Kubernetes

```
kubectl apply -f .\back\database\NAME\deployment.yaml
```

## MongoDB

### Local

```
docker pull mongo:latest
docker run -e 'MONGO_INITDB_ROOT_USERNAME=root' -e 'MONGO_INITDB_ROOT_PASSWORD=example' -e 'MONGO_INITDB_DATABASE=UberVegan' -p 27017:27017 -d mongo:latest
```

### Kubernetes

```
kubectl apply -f .\back\database\NAME\deployment.yaml
```
