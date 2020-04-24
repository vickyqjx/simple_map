defmodule SimpleMap.BookmarksTest do
  use ExUnit.Case
  import SimpleMap.Bookmarks

  test "list, add, find and remove function" do
    # Empty list by default
    assert list_all() == []

    # Add some data
    item_1 = %{name: "Location 1", address: "15 Bourke St, Melbourne VIC 3000"}
    _add_first_item = add(item_1)

    item_2 = %{name: "Location 2", address: "20 Bourke St, Melbourne VIC 3000"}
    _add_second_item = add(item_2)

    # This one should not be added
    assert add(%{name: ""}) == {:error, "Name or address value is missing"}

    # Get all the items
    assert list_all() |> Enum.count() == 2

    assert list_all() |> Enum.map(fn item -> Map.delete(item, :id) end) == [item_2, item_1]
  end
end
