import React from "react";
import { Grommet, Heading, Button, Box, Text, Main } from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const ErrorPage = (props) => {
  // login page render

  return (
    <Grommet theme={theme}>
      <Main
        justify="center"
        alignContent="center"
        align="center"
        animation="fadeIn"
        height="xxlarge"
      >
        <Box margin={{ vertical: "300px" }} align="center" justify="center">
          <Heading size="large" align="center">
            Oops! Something went wrong :(
          </Heading>
          <Text level="4" margin={{ bottom: "20px" }} align="center">
            You must currently be an active Spotify user for this app to work. 
          </Text>
          <Text level="4" margin={{ bottom: "20px" }} align="center">
          Open an issues request on https://github.com/Foamyseal/Lullaby if you believe this is not right.
          </Text>
        </Box>
      </Main>
    </Grommet>
  );
};

export default ErrorPage;
