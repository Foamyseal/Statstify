import React from "react";
import {
  Button,
  Box,
} from "grommet";
import html2canvas from "html2canvas";

const TopArtistsShare = () => {

  function imageTopSongs () {
    html2canvas(document.getElementById("topartists"), {
      height: 1700,
      useCORS: true,
    }
    ).then((canvas) => {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/png");
      a.download = "yourartists.png";
      a.click();
  });
}



  return (
    <Box>
      <Button label="share top artists" onClick={imageTopSongs}/>
    </Box>
  );
}

export default TopArtistsShare;
