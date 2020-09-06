import React, { Component } from "react";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { Box, Grommet, Avatar, Heading, ResponsiveContext } from "grommet";

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 900,
      },
      medium: undefined,
      middle: {
        value: 2000,
      },
    },
  },
});

const AvatarCustom = (props) => {
  console.log(props)
  var image = props.artistItems[0].images[0].url;
  var link = props.artistItems[0].uri;
  
  return (
    <Grommet theme={customBreakpoints}>
      <ResponsiveContext.Consumer>
            {size => (
                  <Box>
                 <Avatar
                 size={size}
                 src={image}
                 onClick={() => window.open({link}, "_self")}
               />
             </Box>
            )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default AvatarCustom;
