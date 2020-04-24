defmodule SimpleMap.Bookmarks do
  @moduledoc """
  The Bookmarks context.
  """

  @max_random_number 1_000_000

  @doc """
  Returns the list of bookmarks.
  ## Example:
      Expected ouputs:
      [%{},...]
  """
  def list_all do
    Agent.get(:bookmarks, & &1)
  end

  @doc """
  Returns bookmark item by id
  ## Example:
      Expected ouputs:
      %{}
  """
  def find_one(id) do
    list_all() |> Enum.find(fn item -> Integer.to_string(item[:id]) === id end)
  end

  @doc """
  Adds a new bookmark to the favorite list
  """
  def add(%{name: name, address: address} = attrs)
      when name != nil and address !== nil and name != "" and address !== "" do
    id = :rand.uniform(@max_random_number)
    new_bookmark = Map.put(attrs, :id, id)

    Agent.update(:bookmarks, fn bookmarks ->
      [new_bookmark | bookmarks]
    end)

    {:ok, new_bookmark}
  end

  def add(attrs) do
    {:error, "Name or address value is missing"}
  end

  @doc """
  Removes a bookmark from the favorite list by id
  """
  def remove(id) do
    Agent.update(:bookmarks, fn bookmarks ->
      Enum.filter(bookmarks, fn item -> Integer.to_string(item[:id]) !== id end)
    end)

    %{id: id}
  end
end
