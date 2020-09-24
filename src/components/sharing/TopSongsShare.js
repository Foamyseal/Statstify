import React from "react";
import {
  Button,
  Box,
} from "grommet";
import html2canvas from "html2canvas";

const TopSongsShare = () => {

  function imageTopSongs () {
    html2canvas(document.getElementById("topsongs"), {
      height: 1350
    }
    ).then((canvas) => {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/png");
      a.download = "yourtopsongs.png";
      a.click();
  });
}



  return (
    <Box>
      <Button label="share top songs" onClick={imageTopSongs}/>
    </Box>
  );
}

export default TopSongsShare;
