import React, { useState } from "react";
import { Text, Layer, Button, Box, Heading } from "grommet";

const AboutMe = (props) => {
  // About Me popup tab

  const [show, setShow] = useState();

  return (
    <Box>
      <Button label="About" onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box align="center" pad="large">
            <Heading> About this Project </Heading>
            <Box align="center" gap="medium" pad="medium">
              <Text pad="medium">
                This project was created by Martin Au-yeung{" "}
              </Text>
              <Text pad="medium">
                It is meant to find out more about what you listen/listened to{" "}
              </Text>
            </Box>
            <Text>
              {" "}
              To logout, simply close the browser or refresh the page.
            </Text>
            <Box align="center" direction="column">
              <Text textAlign="center">
                {" "}
                No data is saved on servers, and the data you see is only
                presented to you when you login.
              </Text>
              <Text textAlign="center">
                {" "}
                Your login gives you a one-time use access token that refreshes
                everytime you close or refresh the page, requiring you to login
                again if you chose to do so.
              </Text>
            </Box>
            <Box direction="row-responsive" gap="medium" pad="medium">
              <Button
                primary
                label="LinkedIn"
                href="https://www.linkedin.com/in/martinauyeung/"
                target="_blank"
              />
              <Button
                primary
                label="GitHub"
                href="https://github.com/Foamyseal/Lullaby/"
                target="_blank"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default AboutMe;
