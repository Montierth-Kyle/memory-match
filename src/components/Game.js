import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  cards = [
    { flipped: false, matched: false, icon: 'fa-youtube fa-spin'},
    { flipped: false, matched: false, icon: 'fa-twitter fa-spin'},
    { flipped: false, matched: false, icon: 'fa-youtube fa-spin'},
    { flipped: false, matched: false, icon: 'fa-twitter fa-spin'},
    { flipped: false, matched: false, icon: 'fa-facebook-official fa-spin'},
    { flipped: false, matched: false, icon: 'fa-snapchat fa-spin'},
    { flipped: false, matched: false, icon: 'fa-facebook-official fa-spin'},
    { flipped: false, matched: false, icon: 'fa-snapchat fa-spin'}
  ];

  state = { cards: this.cards, flippedCardIndexes: [], matchedCardIndexes: [] };

  componentDidUpdate() {
    let { cards, flippedCardIndexes, matchedCardIndexes } = this.state;
    if(matchedCardIndexes.length === cards.length && !this.props.gameOver) {
      // game over because all cards are matched
      alert('You Won!');
      this.props.endGame();
    } else if(flippedCardIndexes.length == 2) {
      // checking for a match
      const card1 = cards[flippedCardIndexes[0]];
      const card2 = cards[flippedCardIndexes[1]]
      if(card1.icon === card2.icon) {
        // match!
        alert('Found a Match!');
        this.setState({ matchedCardIndexes: [...matchedCardIndexes, ...flippedCardIndexes], flippedCardIndexes: [] });
      } else {
        alert('No Match');
        // this shows the user the non match for .5 seconds
        setTimeout( () => {
          this.resetBoard(flippedCardIndexes[0], flippedCardIndexes[1]);
        }, 500);
      }
    }
  }

  resetBoard = (card1Index, card2Index) => {
    let cards = this.state.cards.map( (card, loopIndex) => {
      if(card1Index === loopIndex)
        return({...card, flipped: false});
      else if(card2Index === loopIndex)
        return({...card, flipped: false});
      else
        return({...card});
    })

    this.setState({ cards, flippedCardIndexes: [] });
  }

  updateCard = (cardIndex, flipped = false) => {
    let flippedCards = [...this.state.flippedCardIndexes];
    let { flippedCardIndexes } = this.state;

    if(flippedCardIndexes.length < 2 && !this.props.gameOver) {
      if(!flippedCardIndexes.includes(cardIndex)) {
        let cards = this.state.cards.map( (card, loopIndex) => {
          if(cardIndex === loopIndex) {
            flippedCards.push(cardIndex);
            return { ...card, flipped };
          }
          else
            return card;
        });
        this.setState({ cards, flippedCardIndexes: flippedCards });
      } else
        alert('You have already flipped that card!');
    }
  }

  resetGame = () => {
    // reset all the cards
    let cards = this.state.cards.map( card => {
      return {...card, flipped: false, matched: false};
    });

    this.setState({ cards, flippedCardIndexes: [], matchedCardIndexes: [] });
    this.props.startGame();
  }

  newGameButton() {
    if(this.props.gameOver)
      return(
        <div className='text-center'>
          <button className='btn btn-danger' onClick={this.resetGame}>New Game?</button>
        </div>
      )
  }

  render(){
    let { username, gameStarted, gameOver, toggleStarted } = this.props;

    return(
      <div className='container'>
        <h1 className='text-center'>React Memory Match</h1>
        <h4>
          Current Player: { username }
          <br />
          <button className='btn btn-warning' onClick={toggleStarted}>Edit Player?</button>
        </h4>
        { this.newGameButton() }
        <Board cards={ this.state.cards } updateCard={ this.updateCard }  />
      </div>
    );
  }
}

export default Game;
