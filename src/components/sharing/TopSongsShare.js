import React from "react";
import {
  Button,
  Box,
} from "grommet";
import html2canvas from "html2canvas";

const TopSongsShare = () => {

  function imageTopSongs () {
    html2canvas(document.getElementById("topsongs"), {
      width:1080,
      height:1920
    }).then((canvas) => {
      var image = canvas.toDataURL('image/png', 1.0).replace("image/png", "image/octet-stream");
      console.log(image); 
      window.open(image);
  });
}



  return (
    <Box>
      <Button label="share top songs" onClick={imageTopSongs}/>
    </Box>
  );
}

export default TopSongsShare;
