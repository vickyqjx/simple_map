defmodule SimpleMapWeb.Resolvers.MapResolver do
  alias SimpleMap.Bookmarks
  alias SimpleMap.Locations

  def list_bookmarks(_parent, _args, _resolutions) do
    {:ok, Bookmarks.list_all()}
  end

  def get_bookmark(_parent, args, _resolutions) do
    case Bookmarks.find_one(args[:id]) do
      nil -> {:error, "Not found"}
      bookmark -> {:ok, bookmark}
    end
  end

  def add_bookmark(_parent, args, _resolutions) do
    case Bookmarks.add(args) do
      {:ok, bookmark} ->
        {:ok, bookmark}

      {:error, message} ->
        {:error, message}
    end
  end

  def remove_bookmark(_parent, args, _resolutions) do
    bookmark = Bookmarks.remove(args[:id])
    {:ok, bookmark}
  end

  def get_location_data(_parent, args, _resolutions) do
    case Locations.find_one(args[:address]) do
      {:error, error_msg} -> {:error, error_msg}
      nil -> {:error, "Not found"}
      location_data -> {:ok, location_data}
    end
  end
end
