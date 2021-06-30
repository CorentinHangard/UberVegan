kubectl scale deploy ms-commands-deployment --replicas=0
kubectl scale deploy ms-deliverys-deployment --replicas=0
kubectl scale deploy ms-irttrackings-deployment --replicas=0
kubectl scale deploy ms-logs-deployment --replicas=0
kubectl scale deploy ms-products-deployment --replicas=0
kubectl scale deploy ms-stats-deployment --replicas=0
kubectl scale deploy ms-users-deployment --replicas=0
kubectl scale deploy gateway-deployment --replicas=0
kubectl scale deploy notification-deployment --replicas=0
kubectl scale deploy mongo-deployment --replicas=0
kubectl scale deploy mssql-deployment --replicas=0

kubectl delete svc ms-commands-service
kubectl delete svc ms-deliverys-service
kubectl delete svc ms-irttrackings-service
kubectl delete svc ms-logs-service
kubectl delete svc ms-products-service
kubectl delete svc ms-stats-service
kubectl delete svc ms-users-service
kubectl delete svc gateway-service
kubectl delete svc notification-service
kubectl delete svc mongo-service
kubectl delete svc mssql-service