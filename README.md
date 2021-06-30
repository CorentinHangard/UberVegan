# UberVegan

# Table d'adressage

Front -> `8080`

Gateway -> `3000`

Notification -> `3005`

Microservices :

- Commands -> `3001`
- Deliveries -> `3002`
- Logs -> `3004`
- Products -> `3006`
- Stats -> `3007`
- Users -> `3008`

# Dashboard

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
kubectl apply -f ./user-dashboard.yaml
```

Recupéré le token avec la commande suivante :

```
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```

Lancer le proxy :

```
kubectl proxy
```

Se rendre sur (avec le token):

http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
