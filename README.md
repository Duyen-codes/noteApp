
# Notes application 

- View Demo: [https://quiet-snowflake-7629.fly.dev/](https://quiet-snowflake-7629.fly.dev/)
- NB: Added 8.8.8.8 in the public DNS in my system under the Ethernet -IP V4 to get be able to connect to MongoDB atlas using mongoose.js

## Features
- add note
- search

## Libraries

- [express-async-errors](https://github.com/davidbanham/express-async-errors)

## Project structure

![structure](directory-structure.png)


### Errors I have come across during the project 
```browser
Proxy error: Could not proxy request /api/notes from localhost:3000 to http://localhost:3001 (ECONNREFUSED).
```
This happens when I forgot to start backend dev server with `npm run dev` before I run `npm start` from react frontend
