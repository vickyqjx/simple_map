defmodule SimpleMap.Geocodes do
  @moduledoc """
  The Geocodes context.
  """

  @api_url "https://api.opencagedata.com/geocode/v1/json"
  @api_key "e51bddfb5edc4057bff720a67e25204f"

  @doc """
  Return the geo info based on the address
  """
  def get_geocode(address) do
    request_url = "#{@api_url}?q=#{String.replace(address, " ", "+")}&key=#{@api_key}"

    case get_api_response(request_url) do
      {:ok, response} -> Map.put(response, :address, address)
      _ -> %{}
    end
  end

  @doc """
  call api: https://opencagedata.com/api, then return the processed response
  ## Example:
      {:ok, %{id: 1, map_url: "https://...", lat: "37° 49' 1.81092'' S", lng: "144° 57' 11.78100'' E"}
  """
  def get_api_response(request_url) do
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

  @doc """
  process response body, return reable data
  ## Example:
      {:ok, %{id: 1, map_url: "https://...", lat: "37° 49' 1.81092'' S", lng: "144° 57' 11.78100'' E"}
  """
  def process_response_body(%{"results" => results}) when results !== [] do
    results
    |> List.first()
    |> IO.inspect()
    |> Map.get("annotations")
    |> format_geocode_info
  end

  def process_response_body(_) do
    %{}
  end

  # format the gepcode info which contains these fields: id, map_url, lat, lng
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
