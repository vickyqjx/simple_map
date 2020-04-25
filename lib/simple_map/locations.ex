defmodule SimpleMap.Locations do
  @moduledoc """
  The Locations context.
  """

  @api_url "https://api.opencagedata.com/geocode/v1/json"
  @api_key "e51bddfb5edc4057bff720a67e25204f"
  @max_random_number 1_000_000

  @doc """
  Return the location info based on the address
  ## Example:
      Expected ouputs:
      %{id: 1, map_url: "https://...", lat: "37° 49' 1.81092'' S", lng: "144° 57' 11.78100'' E"}
      nil
  """
  def find_one(address) do
    encode_address = URI.encode(address)
    request_url = "#{@api_url}?q=#{encode_address}&key=#{@api_key}"

    url = "https://maps.google.com/maps?q=#{encode_address}&t=&z=13&ie=UTF8&iwloc=&output=embed"

    case get_api_response(request_url) do
      {:ok, response} when response !== %{} ->
        response |> Map.put(:address, address) |> Map.put(:map_url, url)

      _ ->
        nil
    end
  end

  @doc """
  call api: https://opencagedata.com/api, then return the processed response
  ## Example:
      {:ok, %{id: 1, map_url: "https://...", lat: "37° 49' 1.81092'' S", lng: "144° 57' 11.78100'' E"}}
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
    |> Map.get("annotations")
    |> format_location_info
  end

  def process_response_body(_) do
    %{}
  end

  # format the gepcode info which contains these fields: id, lat, lng
  defp format_location_info(%{"DMS" => %{"lat" => lat, "lng" => lng}}) do
    %{
      id: :rand.uniform(@max_random_number),
      lat: lat,
      lng: lng
    }
  end

  defp format_location_info(_) do
    %{}
  end
end
