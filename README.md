# Starwars Api

This Starwars Api is a simple node.js application built to fetch, transform and aggregate data from SWAPI api

- Node version: v8.10.0
- Application version: v1.0.0
- Framework Version: Express ^4.16.4

# Architecture

The application is structured in a component base architecture, where each feature is placed in a component folder of its own. The content of the components folder is the different features of the application in this case; movies, characters, comments under each of this feature folder there are controller, route, service.

###### Route:

This recieves requests from the main router which ha come from the client, and then picks the appropriate controller function to process the request.

###### Controller:

Requests from the routes are pushed to the controller, the controller then calls the appropriate functionalities to process the request, which includes calling the service to fetch data from models(database) or external api.

###### Service:

The Service functionality process' request for data, and chooses the appropriate channel to get the data from, be it a database or a an external api.

###### Folder Structure

Some files and folders where ignored on purpose since they had no great consequence on undertanding the application

######

######

```
starwars
│   README.md
│   index.js
|   package.json
│
└───api
│   │
|   └─── tests
│   │
|   └─── v1.0.0
|   |   |
|   |   └───  components
│   │   |   |
|   |   |   └───  characters
|   |   |   |       | characters.controller.js
|   |   |   |       | character.routes.js
│   │   |   |       | character.service.js
|   |   |   └───  comments
│   │   |   |       | comments.controller.js
|   |   |   |       | comments.routes.js
|   |   |   |       | comments.service.js
|   |   |   └───  movies
|   |   |   |       | movies.controller.js
|   |   |   |       | movies.routes.js
|   |   |   |       | movies.service.js
|   |
|   |   route.js
|   |
│
└─── config
|    │   config.json
|
└───  migrations
|   | ...
|
└───  models
|   | comments.js
|   | index.js
|
└───  node_modules
|   |...
|
└───  dist
```

# Install!

```
  - git clone https://github.com/preciousgeorge/starwars
  - cd starwars & yarn
```

## Api Endpoints

There are three main endpoints and they are listed below:

- [Movies] - This fetches the starwars movies
- [Characters] - This fetches the characters for all starwar movies
- [Comments] - This fetches/creates the comments for particular starwar movies.

Ths features above

##### Movies

Movie endpoint returns all movies

| url            | verb | sample request                            |
| -------------- | ---- | ----------------------------------------- |
| api/v1/movies/ | GET  | FULL URL: http\|https://url/api/v1/movies |

##### Characters

Movie endpoint returns all movies

| url                                                           | verb | sample request                                                        |
| ------------------------------------------------------------- | ---- | --------------------------------------------------------------------- |
| characters/                                                   | GET  | FULL URL: http\|https://url/api/v1/characters/                        |
| characters?sortby={gender, height, e.t.c}?orderby=asc or desc | GET  | FULL URL: http\|https://url/api/v1/characters?sortby=height?orderby=1 |
| characters?filterby=gender                                    | GET  | FULL URL: http\|https://url/api/v1/characters?filterby=gender         |

The character endpoint can be fetched with just a slash in front of it, but when sorting or filtering comes to mind, the url must be formatted with query strings to give the desired result.

###### Query Strings and how to use them:

i. sortby: the sortby query string takes a string arguement of either gender, height e.t.c
ii. orderby: the orderby query string must be followed by the string asc or desc (where asc = ascending, desc = descending) and the ordering would only work if the sorbyby query string is used
iii. filterby: the filterby query string must be followed by a string e.g gender, the result returned would be that of containing the filter string.

##### Comments

Movie endpoint returns all movies

| url               | verb | sample request                                                                                                             |
| ----------------- | ---- | -------------------------------------------------------------------------------------------------------------------------- |
| api/v1/comments/  | POST | FULL URL: http\|https://url/api/v1/comments Request Content: {film_id:"1", comment:"Starwars is the best movie franchise"} |
| api/v1/comments/1 | GET  | FULL URL: http\|https://url/api/v1/comments/1                                                                              |

## License

MIT
