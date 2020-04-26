# Elixir + Phoenix

FROM elixir:1.10.2

# Create app directory and copy the Elixir project into it
RUN mkdir /app
COPY . /app
WORKDIR /app

# Install Phoenix packages
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get --force
