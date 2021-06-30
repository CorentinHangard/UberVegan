docker build -t ms_commands_image .\back\microservice\Commands\
docker build -t ms_deliverys_image .\back\microservice\Deliverys\
docker build -t ms_irttrackings_image .\back\microservice\IRTTrackings\
docker build -t ms_logs_image .\back\microservice\Logs\
docker build -t ms_products_image .\back\microservice\Products\
docker build -t ms_stats_image .\back\microservice\Stats\
docker build -t ms_users_image .\back\microservice\Users\
docker build -t gateway_image .\back\gateway\
docker build -t notification_image .\back\notifications\

kubectl apply -f .\back\database\MongoDB\deployment.yaml
kubectl apply -f .\back\database\MSSQL\deployment.yaml
kubectl apply -f .\back\gateway\deployment.yaml
kubectl apply -f .\back\notifications\deployment.yaml
kubectl apply -f .\back\microservice\Commands\deployment.yaml
kubectl apply -f .\back\microservice\Deliverys\deployment.yaml
kubectl apply -f .\back\microservice\IRTTrackings\deployment.yaml
kubectl apply -f .\back\microservice\Logs\deployment.yaml
kubectl apply -f .\back\microservice\Products\deployment.yaml
kubectl apply -f .\back\microservice\Stats\deployment.yaml
kubectl apply -f .\back\microservice\Users\deployment.yaml