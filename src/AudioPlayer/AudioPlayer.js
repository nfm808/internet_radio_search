import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './AudioPlayer.css'
 
class AudioPlayer extends Component {
  state = {
    // initial state of playing for the
    // audio
    isPlaying: true
  }

  // as the user chooses a new station to play
  // after stopping playback this triggers start playback
  componentDidUpdate(prevProps, prevState) {
    if(this.props.url !== prevProps.url) {
      this.startPlayback()
    }
  }
  // sets the player to play
  startPlayback = () => {
    this.setState({
      isPlaying: true
    })
  }
  // stops player
  stopPlayback = () => {
    this.setState({
      isPlaying: false
    })
  }
  render () {
    const {isPlaying} = this.state
    return (
      // NEEDS A MESSAGE ABOUT PLAYING LOGIC - MUST HAVE
      // NEEDS A WAY TO TONE DOWN SOUNDS - NICE TO HAVE
      // NEEDS TO A VARIETY OF MESSAGE HOW TO's
      
      <div className="AudioPlayer">
        <button 
          type='button'
          className="mainButton" 
          aria-label='stop playback' 
          onClick={() => this.stopPlayback()}
        >
          Stop Playback
        </button>
        <ReactPlayer 
          url={this.props.url} 
          playing={!isPlaying ? false : true} 
          volume={.5}
          width='0%'
          height='0%'
        />
      </div>
    )}
}

export default AudioPlayer;