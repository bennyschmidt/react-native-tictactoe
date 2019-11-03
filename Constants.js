import { Dimensions } from 'react-native';

export const BACKGROUND_IMAGE = require('./assets/background.png');

export const PLAYERS = ['X', 'O'];

export const SCREEN = Dimensions.get('screen');
export const SCREEN_HEIGHT = SCREEN.height;
export const SCREEN_WIDTH = SCREEN.width;

export const TIE_TEXT = 'Cat\'s game!';
export const TITLE_HEIGHT = 60;
export const TITLE_INSTRUCTION = 'Tap an open square to play.\nX moves first.';
export const TITLE_TEXT = 'Tic Tac Toe';
export const TURN_ERROR_TEXT = 'Space already played.';
export const TURN_TEXT = 'Player turn:';
export const VICTORY_TEXT = 'wins!';
