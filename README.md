# Allsum page

https://allsum.herokuapp.com

## header
link to homepage on the left
sign in button turns into a dropdown menu with links to songs, mysongs, and sign out

## pages 
3 big pages

### mainpage
link to songs, about

### songs
shows list of cards, width varies when clicking it.
when clicking a card, corresponding youtube video will show up 
closing the video by clicking x button will return to originial state
when logged in as admin, edit, delete, and create button will show up

### about
first link opens a new tab/window to the wiki
second playbutton redirects to songs page
Clicking Additional detail of each item will open a new tab/window to a corresponding album page at vibe.music.com

## code features
introducing features implemented to this app

## backend
Node.js
### Express server
- https auto redirection
- gzip compression
- protection with helmet 
- give least previleges to user
- post, patch, delete requests require login
- commented out HTTP/2 because it is not supported on heroku
### Mongo and Redis
- user model that contains googleId, name and array of favorited songs' ids
- song model 
- get request to /songs is cached to redis, cache is cleared automatically when calling post/put/delete requests
### concurrently
- run express server and create-react-app server at the same time

## frontend
React (create-react-app)
### progressive web app
- passes all progressive webapp section in lighthouse report
### Deferred css loading
- loads remainder of the css file after document is loaded, 14% faster paint time
### Code splitting (lazy loading)
- use React.lazy to less important pages (about, edit, new)
### Client-side Google OAuth flow
- gives better user experience by not reloading(refreshing) the page after sign in / sign out phase
### Redux
### React-router
### sw-precache
- opt out caching .html file from service worker. 
- this fixed app not updating (service worker waiting) when newer version was deployed
### http-proxy-middleware
- redirect /api routes to backend(:5000) in dev mode
### Code reuse
- use same SongList Component to all songs page (/songs) and saved songs page
### inline-css (javascript css)
- better performance optimization by not creating unnecessary css files
### simple ui, responsive design

## others
### testing
- use jest and puppeteer for headless testing
### travis ci/cd
- automatic deployment to heroku when passing tests
