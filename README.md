# Statstify
Spotify Statistics and Playlist Creator.

## Purpose: 
To find out more about your listening habits, such as the mood of your songs, your current top artists
and songs. Also, find out your throwback songs that you might remember!

Added Feature!! (09-23) 
Share your top 5 songs or top 5 throwbacks on Instagram!

Previously known as Lullaby, on heroku as lullaby-spotify.herokuapp.com

## To launch locally

In the project directory, you can run in terminal:

 `npm start`

Make sure to change in LoginPage.js the redirectUri to be: 

` redirectUri = "http://localhost:3000/" `

and in package.json "start" to be: 

` "start": "react-scripts start" `

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Technologies/Libraries used: 
* [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment that executes JavaScript code outside a web browser.
* [jQuery Ajax](https://api.jquery.com/category/ajax/) - used to create asynchronous web applications on the client side.
* [Grommet V2](https://v2.grommet.io/) - React-based UI framework that provides accessibility,      modularity, responsiveness, and theming in a tidy package
* [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - return JSON metadata about music artists, albums, and tracks, directly from the Spotify Data Catalogue.
* [html2canvas](https://https://html2canvas.hertzen.com/) - screenshots with JavaScript
