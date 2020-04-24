defmodule SimpleMapWeb.Schema.Locations do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: SimpleMap.Repo

  alias SimpleMapWeb.Resolvers

  @desc "One Location"
  object :location do
    field(:id, :id)
    field(:address, :string)
    field(:map_url, :string)
    field(:lat, :string)
    field(:lng, :string)
  end

  object :location_queries do
    @desc "Get a specfic location"
    field :location, :location do
      arg(:address, :string)
      resolve(&Resolvers.MapResolver.get_location_data/3)
    end
  end
end
