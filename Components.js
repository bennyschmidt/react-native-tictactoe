import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { SCREEN_HEIGHT, SCREEN_WIDTH, TITLE_HEIGHT } from './Constants';

export const Background = styled(Image)`
  height: ${SCREEN_HEIGHT};
  position: absolute;
  width: ${SCREEN_WIDTH};
  z-index: 1;
`;

export const Board = styled(View)`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 20px;
  left: ${SCREEN_WIDTH * .05};
  height: ${SCREEN_WIDTH * .9};
  top: ${(SCREEN_HEIGHT - SCREEN_WIDTH) / 1.75};
  overflow: hidden;
  position: absolute;
  width: 90%;
  z-index: 100;
`;

export const Heading = styled(Text)`
  color: white;
  font-size: 13px;
  top: ${TITLE_HEIGHT * 1.5}px;
  position: absolute;
  text-align: center;
  text-shadow: 0 2px 0 black;
  width: ${SCREEN_WIDTH};
  z-index: 10;
`;

export const Row = styled(View)`
  flex: 1;
  flex-direction: row;
`;

export const Tile = styled(TouchableOpacity)`
  align-items: center;
  background-color: #111;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  shadow-color: black;
  shadow-opacity: 1.0;
  shadow-radius: 20;
`;

export const TileText = styled(Text)`
  color: white;
  font-size: 80px;
  font-weight: 100;
  margin: -5px 0 0 -2.5px;
  text-align: center;
  text-shadow: ${props => props.isX ? '0 0 5px red' : '0 0 5px blue'};;
  transform: scale(1, .85);
`;

export const Title = styled(Text)`
  color: white;
  font-size: 19px;
  font-weight: 100;
  letter-spacing: 1px;
  top: ${TITLE_HEIGHT}px;
  position: absolute;
  text-align: center;
  text-shadow: 0 2px 0 black;
  text-transform: uppercase;
  width: ${SCREEN_WIDTH};
  z-index: 10;
`;

export const Viewport = styled(View)`
  background-color: #111;
  height: ${SCREEN_HEIGHT};
  width: ${SCREEN_WIDTH};
`;
