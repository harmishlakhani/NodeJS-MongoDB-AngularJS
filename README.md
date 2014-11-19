NodeJS-MongoDB-AngularJS
========================

This repo contains basics of how to use Node.js, MongoDB and AngularJS for web development.

Installation ::

1. NodeJS : 
  Just go to http://nodejs.org/ and click on Install. It will automatically install node.js on your system.

2. MongoDB :
  a. Go to https://www.mongodb.org/downloads and download .zip file according to your system.(I am using Windows 7 - 64 bit :P).
  b. Extract the .zip file in to your desired location(Mine is C:\dev\MongoDB)
  c. Add "C:\dev\MongoDB\bin" to PATH environment variable so that you can access mongoDB commands from CMD.
  d. Create "data" folder inside your installation directory(Ex : C:\dev\MongoDB\data)
  e. Create "db" folder inside your data directory(Ex : C:\dev\MongoDB\data\db)
  f. Execute following command as a Admin to start MongoDB Server.
        mongod --dbpath C:\dev\MongoDB\data\db (Use double quote if your path contains space like "C:\dev\Mongo DB\data\db" )
  g. Execute following command as a Admin to start client. 
        mongo
  
  That's it for MongoDB.
