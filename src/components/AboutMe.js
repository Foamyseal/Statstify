import React, { useState } from "react";
import {
  Text,
  Layer,
  Button,
  Box,
  Heading,
} from "grommet";

const AboutMe = (props) => {
  const [show, setShow] = useState();

  return (
    <Box>
      <Button label="About" onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box align="center" pad="medium">
            <Heading> About this Project </Heading>
            <Text pad="medium">
              {" "}
              This project was created by Martin Au-yeung{" "}
            </Text>
            <Text pad="medium">
              {" "}
              It is meant to find out more about what you listen/listened to{" "}
            </Text>
            <Text href="">Github Repo: foamyseal/Lullaby </Text>
            <Button
              primary
              label="LinkedIn:martinauyeung"
              href="https://www.linkedin.com/in/martinauyeung/"
            />
            <Text> Report all issues on Github! </Text>
            <Text> To logout, simply close the browser or refresh the page.</Text>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default AboutMe;
