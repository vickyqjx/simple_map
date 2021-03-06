defmodule SimpleMapWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(SimpleMapWeb.Schema.Locations)
  import_types(SimpleMapWeb.Schema.Bookmarks)

  query do
    import_fields(:bookmark_queries)
    import_fields(:location_queries)
  end

  mutation do
    import_fields(:bookmarks_mutations)
  end

  subscription do
    import_fields(:bookmarks_subscriptions)
  end
end
