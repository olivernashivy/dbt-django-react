# dbt-django-react

## installation

```bash
$ make

# (or make init)
```

## development
to create a super user in docker run
 docker-compose exec django python ./manage.py createsuperuser


For local development (hot reloading, etc.):
http://localhost:3000

To get to the django admin:
http://localhost:8000/admin

### reset local database

```bash
$ make reset
```