import { ScreenOrientation } from 'expo';
import React, { Component } from 'react';

import {
  Background,
  Board,
  Heading,
  Row,
  Tile,
  TileText,
  Title,
  Viewport
} from './Components';

import {
  BACKGROUND_IMAGE,
  PLAYERS,
  TIE_TEXT,
  TITLE_TEXT,
  TITLE_INSTRUCTION,
  TURN_ERROR_TEXT,
  TURN_TEXT,
  VICTORY_TEXT
} from './Constants';

class App extends Component {
  /*
   * Prevent landscape orientation
   */
  static async onChangeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  /*
   * Instantiate with a default state
   * Log Expo settings (app.json)
   */
  constructor(launchSettings) {
    super();

    this.state = this.initialState;

    console.log(launchSettings);
  }

  /*
   * Get the initial state of a new game
   */
  get initialState() {
    return {
      board: [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
      ],
      heading: TITLE_INSTRUCTION,
      turn: 0
    };
  }

  /*
   * Check if a player won
   */
  _getWinningPlayer = boardValues => boardValues.includes('000') ? 0 : boardValues.includes('111') ? 1 : -1;

  /*
   * Virtually rotate the value matrix by 90° (to easily get vertical values)
   */
  _transformMatrix90Deg = board => {
    const output = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ];

    board.forEach((row, i) => {
      row.forEach((col, j) => {
        output[j][i === 0 ? 2 : i === 1 ? 1 : 0] = board[i][j];
      });
    });

    return output;
  };

  /*
   * Lifecycle method to invoke after a play
   * Checks if a player won the game
   */
  didPlay = () => {
    const { board } = this.state;
    let winner = -1;

    // Check for horizontal win
    winner = winner === -1 ? this._getWinningPlayer(board.map(r => r.join(''))) : winner;

    // Check for vertical win
    winner = winner === -1 ? this._getWinningPlayer(this._transformMatrix90Deg(board).map(r => r.join(''))) : winner;

    // Check for diagonal win
    winner = winner === -1 ? this._getWinningPlayer([
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]]
    ].map(r => r.join(''))) : winner;

    const isWinner = winner > -1;

    // Announce the winner (if any) and reset
    if (isWinner || board.flat().filter(v => v > -1).length > 8) {
      if (isWinner) {
        alert(`${PLAYERS[winner]} ${VICTORY_TEXT}`);
      }
      else {
        alert(TIE_TEXT);
      }

      this.setState(this.initialState);
    }
  };

  play = (row, col) => event => {
    const { board, turn } = this.state;
    const tile = board[row][col];

    if (tile !== -1) {
      state = {
        heading: `${TURN_ERROR_TEXT} ${TURN_TEXT} ${PLAYERS[turn]}`,
      };
    }
    else {
      board[row][col] = turn;

      const playerTurn = turn === 0 ? 1 : 0;

      state = {
        board,
        heading: `${TURN_TEXT} ${PLAYERS[playerTurn]}`,
        turn: playerTurn
      };
    }

    this.setState(state, this.didPlay);
  };

  render() {
    const { board, heading, turn } = this.state;

    return (
      <Viewport>
        <Title>
          { TITLE_TEXT }
        </Title>
        <Heading>
          { heading }
        </Heading>
        <Board>
          {
            board.map((r, i) => (
              <Row key={i}>
                {
                  r.map((v, j) => (
                    <Tile key={j} onPress={this.play(i, j)}>
                      <TileText isX={PLAYERS[board[i][j]] === PLAYERS[0]}>
                        { PLAYERS[board[i][j]] }
                      </TileText>
                    </Tile>
                  ))
                }
              </Row>
            ))
          }
        </Board>
        <Background resizeMode="cover" source={BACKGROUND_IMAGE} />
      </Viewport>
    );
  }
}

const changeScreenOrientation = App.onChangeScreenOrientation;

export default App;
