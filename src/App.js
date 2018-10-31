import React, { Component } from 'react';
import './App.css';

class Settings extends Component {
  render() {
    return (
      <div>
        <div id="break-container">
          <div id="break-label" className="text">Break:</div>
          <div className="text">
            <span id="break-length">{this.props.breakLength}</span>
            <span> Minutes</span>
          </div>
          <div className="buttons-container">
            <button id="break-increment" onClick={this.props.incrementBreak}>+</button>
            <button id="break-decrement" onClick={this.props.decrementBreak}>-</button>
          </div>
        </div>
        
        <div id="session-container">
          <div id="session-label" className="text">Session:</div>
          <div className="text">
            <span id="session-length">{this.props.sessionLength}</span>
            <span> Minutes</span>
          </div>
          <div className="buttons-container">
            <button id="session-increment" onClick={this.props.incrementSession}>+</button>
            <button id="session-decrement" onClick={this.props.decrementSession}>-</button>
          </div>
        </div>
      </div>
    )
  }
}

class Timer extends Component {
  render() {
    return (
      <div id="timer-container">
        <div className="text">
          <span id="time-left">{this.props.timeLeft}</span>
          <span> left in </span>
          <span id="timer-label">{this.props.phase}</span>
        </div>
      </div>
    )
  }
}

class Controls extends Component {
  render() {
    return (
      <div id="controls-container">
        <div className="buttons-container">
          <button id="start_stop" onClick={this.props.startStop}>Start Stop</button>
          <button id="reset" onClick={this.props.reset}>Reset</button>
        </div>
      </div>
    )
  }
}

/*
class Audio extends Component {
  render() {
    return (
      <div>
        <audio 
          id="beep"
          src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav" />
      </div>
    )
  }
}
*/

class App extends Component {
  state = {
    breakLength: 300,
    sessionLength: 1500,
    timeLeft: 1500,
    phase: "Session",
    running: false
  }

  initialState = this.state;

  convertTime(e) {
    return `${String(Math.floor(e/60)).padStart(2, "0")}:${String(e%60).padStart(2, "0")}`;
  }

  incrementBreak() {
    let breakLength = this.state.breakLength;
    
    if (breakLength < 3541) {
      breakLength += 60;
      
      this.setState({
        breakLength: breakLength,
      })
    }
  }

  incrementSession() {
    let sessionLength = this.state.sessionLength;
    
    if (sessionLength < 3541) {
      sessionLength += 60;
      
      this.setState({
        sessionLength: sessionLength,
        timeLeft: sessionLength
      })
    }
  }

  decrementBreak() {
    let breakLength = this.state.breakLength;
    
    if (breakLength > 60) {
      breakLength -= 60;
      
      this.setState({
        breakLength: breakLength
      })
    }
  }

  decrementSession() {
    let sessionLength = this.state.sessionLength;
    
    if (sessionLength > 60) {
      sessionLength -= 60;
      
      this.setState({
        sessionLength: sessionLength,
        timeLeft: sessionLength
      })
    }
  }

  timeLeft() {
    if (this.state.timeLeft === -1) {
      this.playAudio();
      
      if (this.state.phase === "Session") {
        this.setState({
          timeLeft: this.state.breakLength,
          phase: "Break"
        })
      } else if (this.state.phase === "Break") {
        this.setState({
          timeLeft: this.state.sessionLength,
          phase: "Session"
        })
      }
    }
    
    return this.convertTime(this.state.timeLeft);
  }

  startStop() {
    if (this.state.running === false) {
      this.interval = setInterval(() => {
        this.setState({
          timeLeft: this.state.timeLeft - 1
        });
      }, 1000);
      
      this.setState({
        running: true
      })
    } else {
      clearInterval(this.interval);
      this.setState({
        running: false
      })
    }
  }

  playAudio() {
    const audio = document.getElementById("beep");

    //audio.load();
    audio.play();
  }
  
  reset() {
    const audio = document.getElementById("beep");
    
    clearInterval(this.interval);
    audio.pause();
    audio.currentTime = 0;
    this.setState(this.initialState);
  }

  render() {
    return (
      <div id="main">
        <Settings
          breakLength={this.state.breakLength/60} 
          sessionLength={this.state.sessionLength/60} 
          incrementSession={() => this.incrementSession()}
          decrementSession={() => this.decrementSession()}
          incrementBreak={() => this.incrementBreak()}
          decrementBreak={() => this.decrementBreak()} />
        <Timer
          timeLeft={this.timeLeft()}
          phase={this.state.phase} />
        <Controls
          startStop={() => this.startStop()}
          reset={() => this.reset()} />
        <audio 
          id="beep"
          preload="auto"
          src="https://goo.gl/65cBl1">
        </audio>
      </div>
    )
  }
}

export default App;