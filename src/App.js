import React, { Component } from 'react';
import './App.css';

const Settings = (props) => {
  return (
    <div>

      <div id="break-container">
        <div id="break-label" className="text">Break:</div>
        <div className="text">
          <span id="break-length">{props.breakLength}</span>
          <span> Minutes</span>
        </div>
        <div className="buttons-container">
          <button id="break-increment" onClick={props.incrementBreak}>+</button>
          <button id="break-decrement" onClick={props.decrementBreak}>-</button>
        </div>
      </div>
      
      <div id="session-container">
        <div id="session-label" className="text">Session:</div>
        <div className="text">
          <span id="session-length">{props.sessionLength}</span>
          <span> Minutes</span>
        </div>
        <div className="buttons-container">
          <button id="session-increment" onClick={props.incrementSession}>+</button>
          <button id="session-decrement" onClick={props.decrementSession}>-</button>
        </div>
      </div>

    </div>
  )
}

const Timer = (props) => {
  return (
    <div id="timer-container">
      <div className="text">
        <span id="time-left">{props.timeLeft}</span>
        <span> left in </span>
        <span id="timer-label">{props.phase}</span>
      </div>
    </div>
  )
}

const Controls = (props) => {
  return (
    <div id="controls-container">
      <div className="buttons-container">
        <button id="start_stop" onClick={props.startStop}>{props.buttonText}</button>
        <button id="reset" onClick={props.reset}>Reset</button>
      </div>
    </div>
  )
}

class App extends Component {
  state = {
    breakLength: 300,
    sessionLength: 1500,
    timeLeft: 1500,
    phase: "Session",
    running: false,
    startStop: "Start"
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
        running: true,
        startStop: "Stop"
      })
    } else {
      clearInterval(this.interval);
      this.setState({
        running: false,
        startStop: "Start"
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
          reset={() => this.reset()}
          buttonText={this.state.startStop} />
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