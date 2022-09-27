# Amaury Simondet - Vanilla MERN Authentication App

## Welcome! 👋

I have made what we call a MERN app for MongoDB Express React and Node ! 

This is a "vanilla" project (no design) but all the hard stuff has been made:
- Back end : 
  - Connection to a Mongo database and schemas
  - Creation of an API to send and receive from React to Node
 
- API :
  - Signup, Login, Logout functions using passport
  - Signup / Login with facebook and google using passport
  - Tokens management  

- Front end:
  - Basic Login and Signup React components with forms using bootstrap
  - Only authenticated accessible page with a Logout button
  - Routing and private routing

## Make it work for you
- Download zip, extract anywhere then cd in it
- Create a .env file and put your mongoURL, hashing secret, id and secret of facebook and google apps in it like this:

`
secret=Example
mongoURL=mongodb+srv://exampleuser:examplepassword@cluster0.naapg7h.mongodb.net/exampleDB
FACEBOOK_CLIENT_ID=somenumbersandstuff
FACEBOOK_CLIENT_SECRET=somenumbersandstuff
GOOGLE_CLIENT_ID=somenumbersandstuff
GOOGLE_CLIENT_SECRET=somenumbersandstuff
`
- Back in cmd: `npm config set legacy-peer-deps true`
- `npm install`
- cd in client
- `npm install` too

You are all set now:
- `npm start` in the root directory (to run the server, API and mongo connection)
- `npm start` in the client directory (for the front end)

## Credits
Amaury Simondet - 2022

## Got feedback for me?

I love receiving feedback ! I'm always looking to improve my projects. So if you have anything you'd like to mention, please [email me](mailto:amaury.simondet@hotmail.com "email") .

This project is my property only and you can't share it for commercial purpose. However, you can share it with anyone who will find it useful for practice or as my portfolio.

### Thank you! 🚀
