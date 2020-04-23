defmodule SimpleMapWeb.Resolvers.MapResolver do
  alias SimpleMap.Bookmarks
  alias SimpleMap.Geocodes

  def list_locations(_parent, _args, _resolutions) do
    {:ok, Bookmarks.list_locations()}
  end

  def add_location(_parent, args, _resolutions) do
    args
    |> Bookmarks.add_location()
    |> case do
      {:ok, user} ->
        {:ok, user}

      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def get_location(_parent, _args, _resolutions) do
    {:ok, %{}}
  end

  def get_geocode(_parent, args, _resolutions) do
    gepcode = Geocodes.get_geocode(args[:address])
    {:ok, gepcode}
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
