# aenimatest

Installation

this is a workaround for problem with node_modules folder in docker.
- cd frontend
- npm install
- cd ..

then...
- docker-compose build
- docker-compose up -d
- docker-compose exec products-backend /bin/sh
    - composer install
    - php artisan storage:link
    - php artisan migrate:fresh --seed
    - php artisan config:cache
    - exit
- sudo chmod 777 -R ./backend/storage/
- sudo chmod 777 -R ./backend/bootstrap/cache


Usage

App:
- http://localhost:1000

Backend api:
-http://localhost:3000