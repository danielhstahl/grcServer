## API 

The API facilitates data transfer between client and database, handles authentication, and sessions.  

To install dependencies:

`npm install`

To run tests:
`npm test`

## Session storage

The user logs in using username and password.  On success (see [auth.js](./auth.js)), the server generates a unique session id (see [server.js endpoint login](./server.js)). The session id and the hash of the password is stored server side (see [inRamDb.js](./inRamDb.js)).  The session id is sent back to the client as part of the "user" object (see [server.js endpoint login](./server.js)).  The client then stores the session id and a hash of the password.  When reloading, the client sends the session id back to the server (see [server.js endpoint checkLogin](./server.js)).  The server then sends the client the hashed password associated with the session id.  If the hashed password matches the browser, then the client is logged in.  The server stores the session id and password for 24 hours only (see [inRamDb.js](./inRamDb.js)).  Logging out manually on the client removes all client storage, and the server session id becomes inaccessible and will be cleaned up within 24 hours.