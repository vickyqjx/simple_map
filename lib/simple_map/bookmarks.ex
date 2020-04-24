defmodule SimpleMap.Bookmarks do
  @moduledoc """
  The News context.
  """

  # alias SimpleMap.News.Link

  @doc """
  Returns the list of links.

  ## Examples

      iex> list_links()
      [%Link{}, ...]

  """
  def list_bookmarks do
    %{id: 1, name: "address name", address: "jee street,vic"}
  end
end
