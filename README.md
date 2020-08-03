# Falcon

This project designed to manipulate remote windows services in an easy and graphic why. 

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br/>
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
(both electron and react dev server)

### To build
* use `yarn portable` - to make a compiled version inside dist folder
* use `yarn msi` - to create installable msi for windows

## Config
There is a default config for to test the app but it will be useless in most of the cases. <br/>
I added an override configuration at the path `D:/falcon/config.json`. the configuration should look like this: <br/>
```json
{
  "timeToWaitBetweenStopAndStart": 5000,
  "serversWatcherInterval": 50000,
  "logFile":"D:\\romachLog\\falcon\\falcon-%DATE%.log",
  "versions": [
    {
      "versionName": "2018.4",
      "serviceName": "AppReadiness",
      "servers": [
        {
          "location": "home",
          "ip": "127.0.0.1"
        },
        {
          "location": "home",
          "ip": "127.0.0.2"
        },
        {
          "location": "office",
          "ip": "185.175.32.249"
        }
        ...
      ]
    }
   ....
  ]
}
``` 
Also you can change configuration location in the file `/src/app.js` 
