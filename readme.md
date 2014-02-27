# Chat.

A simple chat application.

## How to use

Make sure you have node.js installed on your computer. 
If you don't have node.js, point your browser to http://nodejs.org/download/ and download
and install the latest version of node.js.

** You might have to restart your computer after you install node.js **

Double click Setup to install the application. The application will start automatically
after the setup process has finished.

## Development

All development should take place in /app

To start grunt run:
```
$ grunt serve
```

To start chatserver, navigate to /chatserver and run:
```
$ node chatserver.js
```
The chatserver is listening on port 8080

To get the project ready for distribution (minification etc.) run:
```
$ grunt
```

To check if code rules are being followed, you can run jshint by running the command:
```
$ grunt jshint
```
## Features

- Log in with a nick name.
- Join a chat room.
- Create a new chatroom with a custom name and topic.
- Send private messages to other users.
- As a creator of a room, you can kick or ban other user from you chat room.