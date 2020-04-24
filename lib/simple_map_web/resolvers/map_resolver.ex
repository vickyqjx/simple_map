defmodule SimpleMapWeb.Resolvers.MapResolver do
  alias SimpleMap.Bookmarks
  alias SimpleMap.Locations

  def list_bookmarks(_parent, _args, _resolutions) do
    {:ok, Bookmarks.list_bookmarks()}
  end

  def add_bookmark(_parent, args, _resolutions) do
    args
    |> Bookmarks.add_bookmark()
    |> case do
      {:ok, bookmark} ->
        {:ok, bookmark}

      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def get_bookmark(_parent, _args, _resolutions) do
    {:ok, %{}}
  end

  def get_location_data(_parent, args, _resolutions) do
    location_data = Locations.get_location(args[:address])
    {:ok, location_data}
  end

  defp extract_error_msg(changeset) do
    changeset.errors
    |> Enum.map(fn {field, {error, _details}} ->
      [
        field: field,
        message: String.capitalize(error)
      ]
    end)
  end
end
