# Simple Map
![](https://github.com/vickyqjx/simple_map/workflows/Elixir_Test/badge.svg)


## Backend API Server
### To start API server via Docker:
Run command in the project root directory `docker-compose up -build -d`

### To start API server manually :
  * Install Elixir ~> V1.8 ([https://elixir-lang.org/install.html](https://elixir-lang.org/install.html))
  * Make sure you are in the project root directory
  * Install dependencies with `mix deps.get`
  * Start Phoenix endpoint with `mix phx.server`

Now you can test your GraphQL API via ([http://localhost:4000/graphiql](http://localhost:4000/graphiql))
![API Example](https://github.com/vickyqjx/simple_map/blob/master/docs/GraphQL_example.png)

## Front-end App
### Steps to run
 * Install `yarn` if you do not have this installed on you OS ([https://classic.yarnpkg.com/en/docs/install/#mac-stable](https://classic.yarnpkg.com/en/docs/install/#mac-stable))
 * Go to the this `/client/` directory first
 * Install dependencies with `yarn install`
 * Start React App with `yarn start`

 Runs the app in the development mode.<br />
 Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

 ![enter image description here](https://github.com/vickyqjx/simple_map/blob/master/docs/Demo_example.png)
