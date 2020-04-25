defmodule SimpleMap.LocationsTest do
  use ExUnit.Case
  import SimpleMap.Locations

  test "process response body" do
    # set testing data
    lat = "37° 49' 1.81092'' S"
    lng = "144° 57' 11.78100'' E"

    expected_annotations = %{"DMS" => %{"lat" => lat, "lng" => lng}}
    unexpected_annotations = %{"DMS" => %{}}

    # Get valid data
    assert %{lat: lat, lng: lng} =
             process_response_body(%{"results" => [%{"annotations" => expected_annotations}]})

    # Get invalid data or no data
    assert process_response_body("") === %{}
    assert process_response_body([]) === %{}
    assert process_response_body(%{}) === %{}
    assert process_response_body(%{"results" => []}) === %{}
    assert process_response_body(%{"results" => [%{"annotations" => ""}]}) === %{}

    assert process_response_body(%{"results" => [%{"annotations" => unexpected_annotations}]}) ===
             %{}
  end
end
