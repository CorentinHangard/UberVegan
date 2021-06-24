# README

Back-end / micro-services du projet logiciel du groupe 3

Contient les différents micro-services liés aux différents utilisateurs

# Lancer un micro service

```
docker build -t ms_NAME_image .\back\microservice\NAME\
kubectl apply -f .\back\microservice\NAME\deployment.yaml
```

# Stoper un micro service

```
kubectl scale deploy ms-NAME-deployment --replicas=0
kubectl delete svc ms-NAME-service
```
