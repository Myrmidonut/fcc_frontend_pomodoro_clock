import React, { Component } from 'react';
import './App.css';

const Settings = (props) => {
  return (
    <div>

      <div id="session-container">
        <div id="session-label" className="text">Session:</div>
        <div className="text">
          <span id="session-length">{props.sessionLength}</span>
          <span>{props.sessionLength > 1 ? " Minutes" : " Minute"}</span>
        </div>
        <div className="buttons-container">
          <button className="button-session" id="session-increment-ten" onClick={props.incrementSessionTen}>&#43;5</button>
          <button className="button-session" id="session-increment" onClick={props.incrementSession}>&#43;</button>
          <button className="button-session" id="session-decrement" onClick={props.decrementSession}>&#8722;</button>
          <button className="button-session" id="session-decrement-ten" onClick={props.decrementSessionTen}>&#8722;5</button>
        </div>
      </div>

      <div id="break-container">
        <div id="break-label" className="text">Break:</div>
        <div className="text">
          <span id="break-length">{props.breakLength}</span>
          <span>{props.breakLength > 1 ? " Minutes" : " Minute"}</span>
        </div>
        <div className="buttons-container">
          <button className="button-break" id="break-increment-ten" onClick={props.incrementBreakTen}>&#43;5</button>
          <button className="button-break" id="break-increment" onClick={props.incrementBreak}>&#43;</button>
          <button className="button-break" id="break-decrement" onClick={props.decrementBreak}>&#8722;</button>
          <button className="button-break" id="break-decrement-ten" onClick={props.decrementBreakTen}>&#8722;5</button>
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
        <button className="button-controls" id="start-stop" onClick={props.startStop}>{props.buttonText}</button>
        <button className="button-controls" id="reset" onClick={props.reset}>Reset</button>
      </div>
    </div>
  )
}

const Themes = (props) => {
  return (
    <div id="themes-container">
      <div className="text">
        <span>Theme:</span>
      </div>
      <div className="buttons-container">
        <button id="red-theme" onClick={props.redTheme}></button>
        <button id="green-theme" onClick={props.greenTheme}></button>
        <button id="gray-theme" onClick={props.grayTheme}></button>
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

  incrementBreak(factor) {
    let breakLength = this.state.breakLength;
    
    if (breakLength < 2941 + (600 - (60 * factor))) {
      breakLength += 60 * factor;
      
      this.setState({
        breakLength: breakLength,
      })
    }
  }

  incrementSession(factor) {
    let sessionLength = this.state.sessionLength;
    
    if (sessionLength < 2941 + (600 - (60 * factor))) {
      sessionLength += 60 * factor;
      
      this.setState({
        sessionLength: sessionLength,
        timeLeft: sessionLength
      })
    }
  }

  decrementBreak(factor) {
    let breakLength = this.state.breakLength;
    
    if (breakLength > (60 * factor)) {
      breakLength -= 60 * factor;
      
      this.setState({
        breakLength: breakLength
      })
    }
  }

  decrementSession(factor) {
    let sessionLength = this.state.sessionLength;
    
    if (sessionLength > (60 * factor)) {
      sessionLength -= 60 * factor;
      
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

  setBackground() {
    if (this.state.running === false) {
      if (this.state.phase === "Session") {
        document.getElementById("timer-container").classList.remove("timer-container-break")
        document.getElementById("timer-container").classList.remove("timer-container-session");
        document.getElementById("timer-container").classList.remove("timer-container-break-stop");
        document.getElementById("timer-container").classList.add("timer-container-session-stop")
      } else if (this.state.phase === "Break") {
        document.getElementById("timer-container").classList.remove("timer-container-break")
        document.getElementById("timer-container").classList.remove("timer-container-session");
        document.getElementById("timer-container").classList.add("timer-container-break-stop");
        document.getElementById("timer-container").classList.remove("timer-container-session-stop")
      }
    } else {
      if (this.state.phase === "Session") {
        document.getElementById("timer-container").classList.remove("timer-container-break")
        document.getElementById("timer-container").classList.add("timer-container-session");
        document.getElementById("timer-container").classList.remove("timer-container-break-stop");
        document.getElementById("timer-container").classList.remove("timer-container-session-stop")
      } else if (this.state.phase === "Break") {
        document.getElementById("timer-container").classList.add("timer-container-break")
        document.getElementById("timer-container").classList.remove("timer-container-session");
        document.getElementById("timer-container").classList.remove("timer-container-break-stop");
        document.getElementById("timer-container").classList.remove("timer-container-session-stop")
      }
    }
  }

  componentDidMount() {
    this.setBackground();
    this.redTheme();
  }

  componentDidUpdate() {
    this.setBackground();
  }

  startStop() {
    if (this.state.running === false) {
      this.interval = setInterval(() => {
        this.setState({
          timeLeft: this.state.timeLeft - 1
        });
      }, 10);

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
    this.setBackground();
  }

  redTheme() {
    document.getElementById("pomodoro").classList.add("pomodoro-red");
    document.getElementById("pomodoro").classList.remove("pomodoro-green");
    document.getElementById("controls-container").classList.remove("controls-container-red");
    document.getElementById("controls-container").classList.add("controls-container-green");
    document.getElementById("start-stop").classList.remove("controls-container-button-red");
    document.getElementById("start-stop").classList.add("controls-container-button-green");
    document.getElementById("start-stop").classList.remove("controls-container-button-gray");
    document.getElementById("reset").classList.remove("controls-container-button-red");
    document.getElementById("reset").classList.add("controls-container-button-green");
    document.getElementById("reset").classList.remove("controls-container-button-gray");

    document.getElementById("session-container").style.background = "#ff9800";
    document.getElementById("break-container").style.background = "#00bcd4";
    document.getElementById("controls-container").style.background = "#8bc34a";
    document.getElementById("themes-container").style.background = "#FDD835";
    document.querySelectorAll(".button-session").forEach(e => e.style.background = "#f57c00");
    document.querySelectorAll(".button-break").forEach(e => e.style.background = "#00bcd4");
    document.querySelectorAll(".button-controls").forEach(e => e.style.background = "#7CB342");
    document.getElementById("pomodoro").style.background = "#FF7043";
  }

  greenTheme() {
    document.getElementById("pomodoro").classList.remove("pomodoro-red");
    document.getElementById("pomodoro").classList.add("pomodoro-green")
    document.getElementById("controls-container").classList.add("controls-container-red");
    document.getElementById("controls-container").classList.remove("controls-container-green")
    document.getElementById("start-stop").classList.add("controls-container-button-red");
    document.getElementById("start-stop").classList.remove("controls-container-button-green");
    document.getElementById("start-stop").classList.remove("controls-container-button-gray");
    document.getElementById("reset").classList.add("controls-container-button-red");
    document.getElementById("reset").classList.remove("controls-container-button-green");
    document.getElementById("reset").classList.remove("controls-container-button-gray");

    document.getElementById("session-container").style.background = "#ff9800";
    document.getElementById("break-container").style.background = "#00bcd4";
    document.getElementById("controls-container").style.background = "#FF7043";
    document.getElementById("themes-container").style.background = "#FDD835";
    document.querySelectorAll(".button-session").forEach(e => e.style.background = "#f57c00");
    document.querySelectorAll(".button-break").forEach(e => e.style.background = "#00bcd4");
    document.querySelectorAll(".button-controls").forEach(e => e.style.background = "#ff5722");
    document.getElementById("pomodoro").style.background = "#8bc34a";
  }

  grayTheme() {
    document.getElementById("pomodoro").classList.remove("pomodoro-red");
    document.getElementById("pomodoro").classList.remove("pomodoro-green");
    document.getElementById("controls-container").classList.remove("controls-container-red");
    document.getElementById("controls-container").classList.remove("controls-container-green");
    document.getElementById("start-stop").classList.remove("controls-container-button-red");
    document.getElementById("start-stop").classList.remove("controls-container-button-green");
    document.getElementById("start-stop").classList.add("controls-container-button-gray");
    document.getElementById("reset").classList.remove("controls-container-button-red");
    document.getElementById("reset").classList.remove("controls-container-button-green");
    document.getElementById("reset").classList.add("controls-container-button-gray");
    
    document.getElementById("session-container").style.background = "#BDBDBD";
    document.getElementById("break-container").style.background = "#BDBDBD";
    document.getElementById("controls-container").style.background = "#BDBDBD";
    document.getElementById("themes-container").style.background = "#BDBDBD";
    document.querySelectorAll(".button-session").forEach(e => e.style.background = "#E0E0E0");
    document.querySelectorAll(".button-break").forEach(e => e.style.background = "#E0E0E0");
    document.querySelectorAll(".button-controls").forEach(e => e.style.background = "#E0E0E0");
    document.getElementById("pomodoro").style.background = "#9E9E9E";
  }

  render() {
    return (
      <div id="App">
        <div id="background" />
        <div id="main">
          <h1>Pomodoro Clock</h1>
          <div id="pomodoro">
            <Settings
              breakLength={this.state.breakLength/60} 
              sessionLength={this.state.sessionLength/60} 
              incrementSession={() => this.incrementSession(1)}
              incrementSessionTen={() => this.incrementSession(5)}
              decrementSession={() => this.decrementSession(1)}
              decrementSessionTen={() => this.decrementSession(5)}
              incrementBreak={() => this.incrementBreak(1)}
              incrementBreakTen={() => this.incrementBreak(5)}
              decrementBreak={() => this.decrementBreak(1)}
              decrementBreakTen={() => this.decrementBreak(5)} />
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
            <Themes 
              redTheme={() => this.redTheme()}
              greenTheme={() => this.greenTheme()}
              grayTheme={() => this.grayTheme()}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;