defmodule SimpleMapWeb.Schema.Geocodes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: SimpleMap.Repo

  alias SimpleMapWeb.Resolvers

  @desc "Address Geocode"
  object :geocode do
    field(:id, :id)
    field(:address, :string)
    field(:map_url, :string)
    field(:lat, :string)
    field(:lng, :string)
  end

  object :geocode_queries do
    @desc "Get a specfic geocode"
    field :geocode, :geocode do
      arg(:address, :string)
      resolve(&Resolvers.MapResolver.get_geocode/3)
    end
  end
end
