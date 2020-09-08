import React from "react";
import {
  Text,
  Box,
  Meter,
} from "grommet";

const UserAudioStats = (props) => {
  
  // render statistics of users average song energy, danceability and track tempo. 
  var audioFeatures = props.audioFeatures;
  var tbAudioFeatures = props.tbAudioFeatures;

  // get danceability, tempo and energy from from current top songs audio features object
  var trackDanceability = audioFeatures.map(({ danceability }) => danceability);
  var trackTempo = audioFeatures.map(({ tempo }) => tempo);
  var trackEnergy = audioFeatures.map(({ energy  = {}}) => energy);

  // get danceability, tempo and energy from top songs audio features object
  var tbTrackDanceability = tbAudioFeatures.map(
    ({ danceability }) => danceability
  );
  var tbTrackTempo = tbAudioFeatures.map(({ tempo }) => tempo);
  var tbTrackEnergy = tbAudioFeatures.map(({ energy }) => energy );

 
  // calculate average Danceability, Tempo, and Energy of current top songs
  const trackDanceabilityAvg = (trackDanceability) =>
    trackDanceability.reduce((a, b) => a + b, 0) / trackDanceability.length;
  const trackTempoAvg = (trackTempo) =>
    trackTempo.reduce((a, b) => a + b, 0) / trackTempo.length;
  const trackEnergyAvg = (trackTempo) =>
    trackTempo.reduce((a, b) => a + b, 0) / trackEnergy.length;

   // calculate average Danceability, Tempo, and Energy of all-time top songs
  const tbTrackDanceabilityAvg = (tbTrackDanceability) =>
    trackDanceability.reduce((a, b) => a + b, 0) / tbTrackDanceability.length;
  const tbTrackTempoAvg = (trackTempo) =>
    trackTempo.reduce((a, b) => a + b, 0) / tbTrackTempo.length;
  const tbTrackEnergyAvg = (trackTempo) =>
    trackTempo.reduce((a, b) => a + b, 0) / tbTrackEnergy.length;


  return (
    <Box direction="row-responsive" gap="medium">
      <Box direction="row-responsive" gap="large">
        <Box direction="column">
          <Text> Current Average Song Energy </Text>
          <Box direction="row-responsive" gap="medium">
            <Meter
              values={[
                {
                  value: trackEnergyAvg(trackEnergy) * 100,
                  label: "sixty",
                  onClick: () => {},
                },
              ]}
              aria-label="meter"
            />
            <Text> {Math.round(trackTempoAvg(trackEnergy) * 100)} </Text>
          </Box>
            <Text> Current Average Danceability level</Text>
            <Box direction="row-responsive" gap="medium">
              <Meter
                color="light-2"
                values={[
                  {
                    value: trackDanceabilityAvg(trackDanceability) * 100,
                    label: "sixty",
                    onClick: () => {},
                  },
                ]}
                aria-label="meter"
              />
              <Text>
                {" "}
                {Math.round(trackDanceabilityAvg(trackDanceability) * 100)}{" "}
              </Text>
          </Box>
          <Text> Current Average Track Tempo</Text>
          <Box direction="row-responsive" gap="medium">
            <Meter
              values={[
                {
                  value: trackTempoAvg(trackTempo) / 2,
                  label: "sixty",
                  onClick: () => {},
                },
              ]}
              aria-label="meter"
            />
            <Text>{Math.round(trackTempoAvg(trackTempo))} bpm </Text>
          </Box>
        </Box>
      </Box>
    <Box direction="row-responsive" gap="medium">
      <Box direction="column">
          <Text> All-time Average Song Energy </Text>
          <Box direction="row-responsive" gap="medium">
            <Meter
              values={[
                {
                  value: tbTrackEnergyAvg(tbTrackEnergy) * 100,
                  label: "sixty",
                  onClick: () => {},
                },
              ]}
              aria-label="meter"
            />
            <Text> {Math.round(tbTrackTempoAvg(tbTrackEnergy) * 100)} </Text>
          </Box>
            <Text> All-time Average Danceability level</Text>
            <Box direction="row-responsive" gap="medium">
              <Meter
                color="light-2"
                values={[
                  {
                    value: tbTrackDanceabilityAvg(tbTrackDanceability) * 100,
                    label: "sixty",
                    onClick: () => {},
                  },
                ]}
                aria-label="meter"
              />
              <Text>
                {" "}
                {Math.round(tbTrackDanceabilityAvg(tbTrackDanceability) * 100)}{" "}
              </Text>
          </Box>
          <Text> All-time Average Track Tempo</Text>
          <Box direction="row-responsive" gap="medium">
            <Meter
              values={[
                {
                  value: tbTrackTempoAvg(tbTrackTempo) / 2,
                  label: "sixty",
                  onClick: () => {},
                },
              ]}
              aria-label="meter"
            />
            <Text> {Math.round(tbTrackTempoAvg(tbTrackTempo))} bpm </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserAudioStats;
