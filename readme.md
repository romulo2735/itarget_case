# Itarget Case

Clone o projeto: ``git clone git@github.com:romulo2735/itarget_case.git``

## Backend 

#### Deploy 

````shell
cd backend

docker-compose up -d

cp .env.example .env

docker-compose exec app composer install

docker-compose exec app php artisan key:generate
````

URL: ````http://127.0.0.1:8989````

Credenciais do MYSQL:
````
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=db_itarget
DB_USERNAME=itarget
DB_PASSWORD=itarget
````

````
  GET|HEAD        / ......................................................................................................................... generated::WYq8GN6QAKBVL1oe
  GET|HEAD        api/events ....................................................................................................... events.index › EventController@index
  POST            api/events ....................................................................................................... events.store › EventController@store
  GET|HEAD        api/events/create .............................................................................................. events.create › EventController@create
  GET|HEAD        api/events/{event} ................................................................................................. events.show › EventController@show
  PUT|PATCH       api/events/{event} ............................................................................................. events.update › EventController@update
  DELETE          api/events/{event} ........................................................................................... events.destroy › EventController@destroy
  GET|HEAD        api/events/{event}/edit ............................................................................................ events.edit › EventController@edit
  GET|HEAD        api/events/{event}/registrations ........................................ generated::KdnhwkJOhAetr0Dw › RegistrationController@getRegistrationsForEvent
  POST            api/login .......................................................................................... generated::i7ByCTutNBGH3jbI › UserController@login
  POST            api/register .................................................................................... generated::VUCoBqzGIfjwzDW2 › UserController@register
  GET|HEAD        aápi/registrations .................................................................................. registrations.index › RegistrationController@index
  POST            api/registrations .................................................................................. registrations.store › RegistrationController@store
  GET|HEAD        api/registrations/create ......................................................................... registrations.create › RegistrationController@create
  GET|HEAD        api/registrations/{registration} ..................................................................... registrations.show › RegistrationController@show
  PUT|PATCH       api/registrations/{registration} ................................................................. registrations.update › RegistrationController@update
  DELETE          api/registrations/{registration} ............................................................... registrations.destroy › RegistrationController@destroy
  GET|HEAD        api/registrations/{registration}/edit ................................................................ registrations.edit › RegistrationController@edit
  PUT             api/user/update ................................................................................... generated::2aVjLT4SUXlxS1wj › UserController@update
````


# Frontend

#### Deploy
````shell

cd frontend

docker-compose up -d --build

docker run -d -p 3000:3000 frontend
````

URL: ````http://127.0.0.1:3000````


`register`
![alt text](screenshot/register.png))

`login`
![alt text](screenshot/login.png))

`events`
![alt text](screenshot/events.png))
![alt text](screenshot/events-register.png))
![alt text](screenshot/events-registrations.png))
