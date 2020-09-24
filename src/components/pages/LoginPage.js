import React from "react";
import { Grommet, Heading, Button, Box, Text, Main } from "grommet";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "4218105ab20743ea80387bf1a7f82bf9";
const redirectUri = "https://statstify.herokuapp.com/";
const scopes = [
  "user-top-read",
  "playlist-modify-private",
  "playlist-modify-public",
];

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const LoginPage = (props) => {
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
            Statstify
          </Heading>
          <Text level="4" margin={{ bottom: "20px" }} align="center">
            Created by Martin Au-yeung
          </Text>
          <Text level="4" margin={{ bottom: "30px" }} align="center">
            Learn more about your Spotify listening habits!
          </Text>
          <Button
            primary
            align="center"
            label="Login to Spotify"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          />
        </Box>
      </Main>
    </Grommet>
  );
};

export default LoginPage;
