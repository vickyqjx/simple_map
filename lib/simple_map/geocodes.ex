defmodule SimpleMap.Geocodes do
  @moduledoc """
  The News context.
  """

  @api_url "https://api.opencagedata.com/geocode/v1/json"
  @api_key "e51bddfb5edc4057bff720a67e25204f"

  @doc """
  Returns the list of links.

  ## Examples

      iex> list_links()
      [%Link{}, ...]

  """
  def get_geocode(address) do
    request_url = "#{@api_url}?q=#{String.replace(address, " ", "+")}&key=#{@api_key}"

    case get_api_response(request_url) |> IO.inspect() do
      {:ok, response} -> Map.put(response, :address, address)
      _ -> %{}
    end
  end

  # call api: https://opencagedata.com/api
  defp get_api_response(request_url) do
    case HTTPoison.get(request_url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok,
         body
         |> Poison.decode!()
         |> process_response_body}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        IO.puts("Not found :(")

      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.inspect(reason)

      _ ->
        IO.inspect("Api Error")
    end
  end

  defp process_response_body(%{"results" => results}) do
    results
    |> List.first()
    |> Map.get("annotations")
    |> format_geocode_info
  end

  defp process_response_body(_) do
    %{}
  end

  defp format_geocode_info(%{"OSM" => %{"url" => url}, "DMS" => %{"lat" => lat, "lng" => lng}}) do
    %{
      id: :rand.uniform(1_000_000),
      map_url: url,
      lat: lat,
      lng: lng
    }
  end

  defp format_geocode_info(_) do
    %{}
  end
end
