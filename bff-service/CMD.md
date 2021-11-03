## Commands

```bash
# eb
eb init -r eu-west-1 abulynka-cart-api
eb create --single --cname abulynka-cart-api-test

# remove eb
eb list
eb terminate NAME

# docker
docker build -f ./Dockerfiles/Dockerfile -t cart-api:latest .
```
