import React from "react";
import { Button, Box } from "grommet";
import html2canvas from "html2canvas";

const ThrowbackShare = () => {
  function imageThrowbackSongs() {
    html2canvas(document.getElementById("throwbacks"), {
      height: 1340,
    }).then((canvas) => {
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "yourthrowbacks.png";
      a.click();
    });
  }

  return (
    <Box>
      <Button label="share throwback songs" onClick={imageThrowbackSongs} />
    </Box>
  );
};

export default ThrowbackShare;
