
# Simple Map
![](https://github.com/vickyqjx/simple_map/workflows/Elixir_Test/badge.svg)

## Overall
* Root directory contains the code for API App
* `client` directory contains the code for Frontend App

## Backend API Server
### Option 1 : To start API server via Docker:
Run command in the project root directory `docker-compose up --build -d`

### Option 2 :  To start API server manually :
  * Install `Elixir ~> V1.8`  is you do not have it installed  before ([https://elixir-lang.org/install.html](https://elixir-lang.org/install.html))
  * Make sure you are in the project root directory
  * Install dependencies with `mix deps.get`
  * Start Phoenix endpoint with `mix phx.server`

Now you can test your GraphQL API via ([http://localhost:4000/graphiql](http://localhost:4000/graphiql))
![API Example](https://github.com/vickyqjx/simple_map/blob/master/docs/GraphQL_example.png)
Query Examples:
``` js
{
  location (address: "255 Bourke St, Melbourne VIC 3000") {
    map_url
    lat
    lng
  }
}
```

``` js
mutation Add($name: String!, $address: String!) {
  addBookmark(name: $name, address: $address) {
    name
    address
  }
}

//GRAPHQL VARIABLES
{
  "name": "Some Building",
  "address": "115 Bourke St, Melbourne VIC 3000"
}
```

``` js
mutation remove_bookmark {
  remove_bookmark(
    id: 180144
  ) {
    id
  }
}
```
## Front-end App
### Steps to run:
 * Install `yarn` if you do not have it installed before ([https://classic.yarnpkg.com/en/docs/install/#mac-stable](https://classic.yarnpkg.com/en/docs/install/#mac-stable))
 * Go to the this `/client/` directory first
 * Install dependencies with `yarn install`
 * Start React App with `yarn start`

 Runs the app in the development mode.<br />
 Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

 ![enter image description here](https://github.com/vickyqjx/simple_map/blob/master/docs/Demo_example.png)
