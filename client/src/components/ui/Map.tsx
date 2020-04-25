import React from 'react';

type MapProps = {
  url: string
}

const Map = ({ url }: MapProps) => (
  <iframe
    width="100%"
    height="400"
    id="gmap_canvas"
    src={url}
    frameBorder="0"
    scrolling="no"
    title="embed_map"
  ></iframe>
)

export default Map;
