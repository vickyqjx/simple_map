defmodule SimpleMapWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(SimpleMapWeb.Schema.Geocodes)
  import_types(SimpleMapWeb.Schema.Bookmarks)

  query do
    import_fields(:location_queries)
    import_fields(:geocode_queries)
  end
end
