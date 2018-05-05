import React, { Component } from 'react'
import { Button,Alert } from 'reactstrap';

import './App.css'

import HangManDrawing from './HangManDrawing.js'
import Letter from './Letter.js'
import WORDS_LIST from './wordsList.js'

const ASCII_A = 65
const ASCII_Z = 90
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

class App extends Component {

  state = {
    word: this.generateWord(),
    lettersClicked: [],
    won: false,
    score: 0,
    error:0,
    attempt: 0
  }  

  /*
   * Generate a word by selecting randomly a word or a sentence in the word list
   */
  generateWord(){
    return WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]
  }

  /*
   * After the component mount, an event listener is creating 
   * wainting for a key to be pressed. When, it is happenning, the function which will
   * verify if the key pressed is relevant and if a letter has been discovered 
   */
  componentDidMount(){
    document.onkeypress = (event) => (
      this.handleLetterClick(event.key.toUpperCase())
    )
  }

  /*
   * When the component is unmount, the key press event is needed no more 
   */
  componentWillUnmount(){
    document.onkeypress = null
  }

  /*
   * Restart function which will re-iniatialize the local state
   */
  restart(){ 
    this.setState({word: this.generateWord(), won: false, error: 0, attempt:0, score: 0, lettersClicked: []})
  }

  /*
   * How to display the word by hiding the letters not yet found
   * sentence: string - the sentence or the word to find
   * usedLetters: array of string - array containing the letters found
   */
  computeDisplay = (sentence, usedLetters) => (
    sentence.replace(/\w/g, (letter) => (usedLetters.includes(letter) ? letter : '_'))
  )

  /*
   * Check if a letter has already been click
   * value is the letter (A-Z)
   */
  hasAlreadyBeenClicked = (value) => {
    const {lettersClicked} = this.state
    return lettersClicked.includes(value)
  }

  /*
   * Check if a letter is in the word and return how many times it has been found
   */
  isLetterInWord = (letter, word) => (
    word.split(letter).length - 1
  )

    
  /*
   * check if all the letters of the word to find have been found
   */
  hasAllLettersBeenFound(word,lettersClicked){
    let wordLetters = word.split('')
    return wordLetters.every((letter) => {
      let asciiLetter = letter.charCodeAt(0)
      if(asciiLetter >= ASCII_A && asciiLetter <= ASCII_Z){
        return lettersClicked.includes(letter) ? true:false
      }
      return true
    })
  }
  /*
   * handle the click on a letter
   * check if the value of the letter is found in the word
   *       if the word has been entirely been found
   *       if the user has commited an error
   */
  handleLetterClick = (value) => {
    const {word, lettersClicked, won, error, score, attempt} = this.state 
    let ascii = value.charCodeAt(0)

    //to be interesting, the user must not have won or lost yet
    // and the value sent must be a string A-Z
    if(!won && error<6 && ascii >= ASCII_A && ascii <= ASCII_Z){
      //the key must not have been clicked yet
      if(!(this.hasAlreadyBeenClicked(value))){
        //the key is added to the array of the letters clicked
        let newLettersClicked = lettersClicked
        lettersClicked.push(value)
        this.setState({lettersClicked: newLettersClicked})

        //the user has made a new attempt
        let newAttempt = attempt + 1

        //now, we check if the letter is actually in the word
        let newError = error
        let newScore = score
        let numberLetterInWord = this.isLetterInWord(value,word)
        if(numberLetterInWord > 0){
          newScore = newScore + numberLetterInWord 
        }
        else{
          newScore--
          newError++
        }

        //check if all letters of the word have been found
        let newWon = this.hasAllLettersBeenFound(word,lettersClicked)

        //the local state is updated
        this.setState({attempt: newAttempt, error: newError, score:newScore, won: newWon})
      }
    }
  }

  /*
   * Render the app
   */
  render() {
    const { word, lettersClicked, won, error,score} = this.state
    return (
      <div className="App">
          { won || error >= 6 ? (             
            <div className="centralPanel">            
              <span>
                {error >= 6 ? <h1 className='finalScore'>Tu as perdu</h1> : <h1 className="finalScore">Score: {score} </h1> }
              </span>     
              <br/><br/><br/>
              <Button onClick={() => this.restart()}>Recommencer</Button> 
            </div>             
            ): (
              <div>
                <Alert color="info"><span >Score: {score}</span></Alert>
                <span>
                  Attention: Les citations à trouver sont en langue originale (pour l'instant Anglais et Français)<br/><br/>
                  Thème: Séries TV<br/>
                  Vous pouvez utilisez les boutons ci dessous pour resoudre l'egnime ou saisir les lettres sur votre clavier
                </span>
                <br/><br/><br/>
                <HangManDrawing bodyElement={error} />
                <br/><br/><br/>
                <span><h1 className="word" >{this.computeDisplay(word, lettersClicked)}</h1></span>
                <br/><br/>
                {letters.map((value,index) =>
                  <Letter value={value}  disabled={this.hasAlreadyBeenClicked} key={index} onClick={this.handleLetterClick} />
                )}
              </div>
            )}
          </div>        
      )
  }
}

export default App