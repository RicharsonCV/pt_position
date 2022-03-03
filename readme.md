Requerimientos
====================

- composer

- yarn

- docker

Cliente
====================

`cd client` 

`yarn`

ir a `http://localhost:3000/`

Backend (PHP 8.0)
====================

`cd api`

`composer update`

`cp .env.example .env`

`./vendor/bin/sail up -d`

`./vendor/bin/sail artisan migrate`

`./vendor/bin/sail artisan db:seed --class=UserSeeder`



Test User

u: test@mail.com

p: password