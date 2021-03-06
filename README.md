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


Go to your terminal annd run
```
  - git clone https://github.com/preciousgeorge/starwars
  - cd starwars & yarn
  - ./node_modules/.bin/sequelize db:migrate
```

Open projectfolder/config/config.json.ed
Rename the file to config.json

Set the database configurations there to the ones specific for your environment, please enter `null` for value that does not apply to your environment.

Then run the command below in your terminal from the project dirctory

```
  - ./node_modules/.bin/sequelize db:migrate
```

##### Movies

Movie endpoint returns all movies

| url                                                                             | verb | sample request                                                                                                         |
| ------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| api/v1/movies/                                                                  | GET  | FULL URL: http\|https://url/api/v1/movies                                                                              |
| api/v1/movies/:id                                                               | GET  | FULL URL: http\|https://url/api/v1/movies/1                                                                            |
| api/v1/movies/:id/comments                                                      | GET  | FULL URL: http\|https://url/api/v1/movies/1/comments                                                                   |
| api/v1/movies/:id/comments                                                      | POST | FULL URL: http\|https://url/api/v1/movies/1/comments Request Content: {comment:"Starwars is the best movie franchise"} |
| api/v1/movies/:id/characters                                                    | GET  | FULL URL: http\|https://url/api/v1/movies/1/characters                                                                 |
| api/v1/movies/:id/characters?sortby={gender, height, e.t.c}?orderby=asc or desc | GET  | FULL URL: http\|https://url/api/v1/movies/1/characters?sortby=height?orderby=asc                                       |
| api/v1/movies/:id/characters?filterby=gender                                    | GET  | FULL URL: http\|https://url/api/v1/movies/1/characters?filterby=male                                                   |

###### URL path:

- api : is the path to the api part of the application
- v1 : is the version, if a lot of features are to be added that would change the way the present implementation, instead of just changing everything, another version should be created. Versioning is to help prevent issues with clients making requests and expecting a certain result but getting something entirely different, some client applications would not neccessarily change as much as the api they request to.
- :id : this is an integer used to identify a unique data set, e.g movie :id identifies one movie, so anywhere it is required, a single dataset or it's relations is either being fetched, modified or created.

###### Query Strings and how to use them:

- sortby: the sortby query string takes a string arguement of either gender, height e.t.c
- orderby: the orderby query string must be followed by the string asc or desc (where asc = ascending, desc = descending) and the ordering would only work if the sorbyby query string is used
- filterby: the filterby query string must be followed by a string e.g gender, the result returned would be that of containing the filter string.



## License

MIT
