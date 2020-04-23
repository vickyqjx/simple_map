defmodule SimpleMapWeb.Schema.Bookmarks do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: SimpleMap.Repo

  alias SimpleMapWeb.Resolvers

  @desc "One location"
  object :location do
    field(:id, :id)
    field(:name, :string)
    field(:address, :string)
  end

  object :location_queries do
    @desc "Get all locations"
    field :all_locations, list_of(:location) do
      resolve(&Resolvers.MapResolver.list_locations/3)
    end

    @desc "Get a specfic location"
    field :location, :location do
      arg(:id, non_null(:id))
      resolve(&Resolvers.MapResolver.get_location/3)
    end
  end
end
