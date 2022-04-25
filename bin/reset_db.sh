#!/usr/bin/env bash

docker-compose exec db bash -c "
echo 'dropping database'
dropdb --if-exists -U \$DB_USERNAME \$DB_NAME
dropdb --if-exists -U \$DB_USERNAME test_\$DB_NAME
echo \$DB_PASSWORD
echo 'drop successful'
echo 'creating db'
createdb -U \$DB_USERNAME \$DB_NAME
echo 'create successful'
"

docker-compose exec django bash -c "
python manage.py migrate && python manage.py generate_data && python manage.py populate_org_categories
"

docker-compose exec django bash -c "
echo 'rebuilding search index'
./manage.py search_index --rebuild -f
"

docker-compose exec django ./manage.py set_default_site --name=localhost --domain=localhost:8000
