# EXPRESS SCAFFOLD GENERATOR

This repository is made in javascript to help boost and save development time for express apps.
It generates some prebuilt templates of views and routes.

## Getting Started

The usage of this library is super easy. Follow the Installation instructions and you are good to go!

### Prerequisites

You should have node js and express framework on your system preinstalled.

Make an express app. Like-

In terminal
```
$ express -e myApp
```

Change Directory to myApp
```
$ cd myApp
```

### Installing

Clone this repository to the folder where you are building your express app.
Meaning suppose you have a express app named "myWebsite", then just clone this repository within the "myWebsite" folder

## Deployment

Go to the *express-scaffold-generator* folder - change directory

```
$ cd express-scaffold-generator
```

In the terminal type

```
$ node scaffold.js
```

Done, you are good to go!
Just add the routes to your app.js file to use the routes!!

For adding the index.js route to your app.js file(or server.js file)

Open app.js file and add the following lines: 
```
var login = require('./routes/login');
app.use('/login', login);
```

app variable being the server variable which is running the app and all routes

## Authors

* **Nirabhra Tapaswi** - *made this repository*