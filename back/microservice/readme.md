# README

Back-end / micro-services du projet logiciel du groupe 3

Contient les différents micro-services liés aux différents utilisateurs

# Lancer un micro service

## Local

Dans le dossier du micro service :

```
npm run start
```

## Kubernetes

```
docker build -t ms_NAME_image .\back\microservice\NAME\
kubectl apply -f .\back\microservice\NAME\deployment.yaml
```

# Stoper un micro service

## Local

Dans la console du serveur lancé :

```
Ctrl + C
```

## Kubernetes

```
kubectl scale deploy ms-NAME-deployment --replicas=0
kubectl delete svc ms-NAME-service
```


## RoleID
1 Utilisateur final
2 Livreur
3 Restaurateur
4 Developpeur tier
5 Commercial
6 Technique