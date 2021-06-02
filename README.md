# aenimatest

## Requeriments
- Nodejs (just for a workaround, sorry)
- Docker Compose
## Installation

this is a workaround for problem with node_modules folder in docker. You need have installed nodejs.
```bash
cd frontend
npm install
cd ..
```


then...
```bash
docker-compose build
docker-compose up -d
docker-compose exec products-backend /bin/sh
    composer install
    cp .env.example .env
    php artisan storage:link
    php artisan config:cache
    php artisan migrate:fresh --seed
    exit
sudo chmod 777 -R ./backend/storage/
sudo chmod 777 -R ./backend/bootstrap/cache
```


## Usage

App:
- http://localhost:1000

Backend api:
- http://localhost:3000

Enjoy de App!

## Dev
Santiago Aguilar ( https://www.linkedin.com/in/santiago-aguilar-6001115b/ )