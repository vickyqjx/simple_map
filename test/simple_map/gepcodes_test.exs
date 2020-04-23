defmodule SimpleMap.GeocodesTest do
  use ExUnit.Case
  import SimpleMap.Geocodes

  test "process response body" do
    # set testing data
    url =
      "https://www.openstreetmap.org/?mlat=-37.81717&mlon=144.95327#map=16/-37.81717/144.95327"

    lat = "37° 49' 1.81092'' S"
    lng = "144° 57' 11.78100'' E"

    expected_annotations = %{"OSM" => %{"url" => url}, "DMS" => %{"lat" => lat, "lng" => lng}}
    unexpected_annotations = %{"OSM" => %{}, "DMS" => %{}}

    # Get valid data
    assert %{lat: lat, lng: lng, map_url: url} =
             process_response_body(%{"results" => [%{"annotations" => expected_annotations}]})

    # Get invalid data or no data
    assert process_response_body("") === %{}
    assert process_response_body([]) === %{}
    assert process_response_body(%{}) === %{}
    assert process_response_body(%{"results" => [%{"annotations" => ""}]}) === %{}

    assert process_response_body(%{"results" => [%{"annotations" => unexpected_annotations}]}) ===
             %{}
  end
end
