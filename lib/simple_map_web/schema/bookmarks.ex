defmodule SimpleMapWeb.Schema.Bookmarks do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: SimpleMap.Repo

  alias SimpleMapWeb.Resolvers

  @desc "One bookmark"
  object :bookmark do
    field(:id, :id)
    field(:name, :string)
    field(:address, :string)
  end

  object :bookmark_queries do
    @desc "Get all bookmarks"
    field :all_bookmarks, list_of(:bookmark) do
      resolve(&Resolvers.MapResolver.list_bookmarks/3)
    end

    @desc "Get a specfic bookmark"
    field :bookmark, :bookmark do
      arg(:id, non_null(:id))
      resolve(&Resolvers.MapResolver.get_bookmark/3)
    end
  end
end
