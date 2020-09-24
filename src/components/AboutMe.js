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
            <Heading textAlign="center"> About this Project </Heading>
            <Box align="center" gap="medium" pad="medium">
              <Text textAlign="center">Created by Martin Au-yeung</Text>
              <Text textAlign="center">
                Find out your past throwbacks, current top artists and songs.
              </Text>
              <Text textAlign="center">
                Share them on Instagram or make a playlist out of them!
              </Text>
              <Text textAlign="center">
                {" "}
                Although to view your stats all properly, I would suggest not
                using a mobile browser for best experience{" "}
              </Text>
              <Text textAlign="center">
                {" "}
                There is a known issue with the sharing songs not showing background image. 
                
              </Text>
              <Text textAlign="center">
                This is done on purpose as there is a bug with html2canvas that prevents images from having an opacity setting, making the title text unreadable.
              </Text>
              <Text textAlign="center">
               Please report any further issues to the GitHub repo.
              </Text>
            </Box>
            <Text textAlign="center">
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
                href="https://github.com/Foamyseal/Statstify/"
                target="_blank"
              />
            </Box>
            <Button
              width="large"
              label="close"
              onClick={() => setShow(false)}
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default AboutMe;
