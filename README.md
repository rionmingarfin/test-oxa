
<h1 align="center">ExpressJS - System badge and level</h1>

<p align="center">
  <a href="https://nodejs.org/">
    <img alt="restfulapi" title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>
<br>
<br>

## GETTING STARTED
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v.4.17.1-grey.svg?style=rounded-square)](https://expressjs.com/)
[![JsonWebToken.js](https://img.shields.io/badge/JsonWebToken.js-v.8.5.1-orange.svg?style=rounded-square)](https://www.npmjs.com/package/jsonwebtoken)
<br>
<br>
is another application made by express.js,
badge levels and application systems can only be checked once a day, 
if the check-in meets the requirements then the level will go up and if the level meets the badge requirements will go up
or checkin users must first log in otherwise they will not be able to

## software preparation needed
* postman
* web server (xampp)
* text editor (visual studio code) 
* crome

## add .env file
add the .env file to your project then copy the code below

``` 
NODE_ENV=development

 HOST_DB='localhost'
 USER_DB='root'
 PASSWORD_DB=''
 DATABASE_DB='game'

 ALGORTIHM = 'aes-256-ctr'
 PASSWORD_ALGORITHM = 'd6F3Efeq'
 ```

## how to run this application

 1. git clone https://github.com/rionmingarfin/test-oxa.git
 2. open text editor
 3. run the web server and mysql application,example `xampp`
 4. import db game in phpmyadmin
 5. open terminal in CMD or terminal text editor(visual studio code)
 6. type `npm install`
 7. tambahkan [.env](https://github.com/rionmingarfin/test-oxa.git)
 8. type npm start
 9. open postman and run it with port `4000` 

###### note

note before adding the env first

## endPoint LIST

###### 1.badge
- `get('/')`
- `post('/api/v1')`
- `get('/api/v1')`
- `patch('/api/v1/:id')`
- `delete('/api/v1/:id')`

###### 2.level
- `post('/api/v2')
- `get('/api/v2')
- `patch('/api/v2/:id')
- `delete('/api/v2/:id')

###### 3.user
- `post('/api/v3')
- `post('/api/v3/login')
- `delete('/api/v3/:id')


###### 4.level user/check_in
- `get('/api/v4',)
- `get('/api/v4/:id')
- `patch('/api/v4')

## Screenshot from the app
<p align='center'>
  <span>
  <img src='https://user-images.githubusercontent.com/43402837/62673415-966f8700-b9c8-11e9-915e-c9d92050807f.png' width=200 />
  <img src='https://user-images.githubusercontent.com/43402837/62673420-9c656800-b9c8-11e9-9dca-291d5384fd8e.png' width=200 />
  <img src='https://user-images.githubusercontent.com/43402837/62673428-a38c7600-b9c8-11e9-8bab-82179853938f.png' width=200 />
  <img src='https://user-images.githubusercontent.com/43402837/62673443-a8e9c080-b9c8-11e9-8aef-2899db92ed77.png' width=200 />
  <img src='https://user-images.githubusercontent.com/43402837/62673449-aedfa180-b9c8-11e9-9f4c-c607254d7734.png' width=200 />
  </span>
</p>
