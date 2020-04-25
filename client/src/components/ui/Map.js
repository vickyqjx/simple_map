import React from 'react';

function Map({url}) {
  return (
    <iframe
      width="100%"
      height="300"
      id="gmap_canvas"
      src={url}
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      title="embed_map"
    ></iframe>
  );
}

export default Map;
