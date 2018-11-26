(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),s=n(2),a=n.n(s),c=(n(13),n(3)),i=n(4),m=n(6),l=n(5),d=n(7),u=(n(15),function(e){return r.a.createElement("div",null,r.a.createElement("div",{id:"session-container"},r.a.createElement("div",{id:"session-label",className:"text"},"Session:"),r.a.createElement("div",{className:"text"},r.a.createElement("span",{id:"session-length"},e.sessionLength),r.a.createElement("span",null,e.sessionLength>1?" Minutes":" Minute")),r.a.createElement("div",{className:"buttons-container"},r.a.createElement("button",{className:"button-session",id:"session-increment-ten",onClick:e.incrementSessionTen},"+5"),r.a.createElement("button",{className:"button-session",id:"session-increment",onClick:e.incrementSession},"+"),r.a.createElement("button",{className:"button-session",id:"session-decrement",onClick:e.decrementSession},"\u2212"),r.a.createElement("button",{className:"button-session",id:"session-decrement-ten",onClick:e.decrementSessionTen},"\u22125"))),r.a.createElement("div",{id:"break-container"},r.a.createElement("div",{id:"break-label",className:"text"},"Break:"),r.a.createElement("div",{className:"text"},r.a.createElement("span",{id:"break-length"},e.breakLength),r.a.createElement("span",null,e.breakLength>1?" Minutes":" Minute")),r.a.createElement("div",{className:"buttons-container"},r.a.createElement("button",{className:"button-break",id:"break-increment-ten",onClick:e.incrementBreakTen},"+5"),r.a.createElement("button",{className:"button-break",id:"break-increment",onClick:e.incrementBreak},"+"),r.a.createElement("button",{className:"button-break",id:"break-decrement",onClick:e.decrementBreak},"\u2212"),r.a.createElement("button",{className:"button-break",id:"break-decrement-ten",onClick:e.decrementBreakTen},"\u22125"))))}),g=function(e){return r.a.createElement("div",{id:"timer-container"},r.a.createElement("div",{className:"text"},r.a.createElement("span",{id:"time-left"},e.timeLeft),r.a.createElement("span",null," left in "),r.a.createElement("span",{id:"timer-label"},e.phase)))},b=function(e){return r.a.createElement("div",{id:"controls-container"},r.a.createElement("div",{className:"buttons-container"},r.a.createElement("button",{className:"button-controls",id:"start-stop",onClick:e.startStop},e.buttonText),r.a.createElement("button",{className:"button-controls",id:"reset",onClick:e.reset},"Reset")))},E=function(e){return r.a.createElement("div",{id:"themes-container"},r.a.createElement("div",{className:"text"},r.a.createElement("span",null,"Theme:")),r.a.createElement("div",{className:"buttons-container"},r.a.createElement("button",{id:"red-theme",onClick:e.redTheme}),r.a.createElement("button",{id:"green-theme",onClick:e.greenTheme}),r.a.createElement("button",{id:"gray-theme",onClick:e.grayTheme})))},y=function(e){function t(){var e,n;Object(c.a)(this,t);for(var o=arguments.length,r=new Array(o),s=0;s<o;s++)r[s]=arguments[s];return(n=Object(m.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={breakLength:300,sessionLength:1500,timeLeft:1500,phase:"Session",running:!1,startStop:"Start"},n.initialState=n.state,n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"convertTime",value:function(e){return"".concat(String(Math.floor(e/60)).padStart(2,"0"),":").concat(String(e%60).padStart(2,"0"))}},{key:"incrementBreak",value:function(e){var t=this.state.breakLength;t<600-60*e+2941&&(t+=60*e,this.setState({breakLength:t}))}},{key:"incrementSession",value:function(e){var t=this.state.sessionLength;t<600-60*e+2941&&(t+=60*e,this.setState({sessionLength:t,timeLeft:t}))}},{key:"decrementBreak",value:function(e){var t=this.state.breakLength;t>60*e&&(t-=60*e,this.setState({breakLength:t}))}},{key:"decrementSession",value:function(e){var t=this.state.sessionLength;t>60*e&&(t-=60*e,this.setState({sessionLength:t,timeLeft:t}))}},{key:"timeLeft",value:function(){return-1===this.state.timeLeft&&(this.playAudio(),"Session"===this.state.phase?this.setState({timeLeft:this.state.breakLength,phase:"Break"}):"Break"===this.state.phase&&this.setState({timeLeft:this.state.sessionLength,phase:"Session"})),this.convertTime(this.state.timeLeft)}},{key:"setBackground",value:function(){!1===this.state.running?"Session"===this.state.phase?(document.getElementById("timer-container").classList.remove("timer-container-break"),document.getElementById("timer-container").classList.remove("timer-container-session"),document.getElementById("timer-container").classList.remove("timer-container-break-stop"),document.getElementById("timer-container").classList.add("timer-container-session-stop")):"Break"===this.state.phase&&(document.getElementById("timer-container").classList.remove("timer-container-break"),document.getElementById("timer-container").classList.remove("timer-container-session"),document.getElementById("timer-container").classList.add("timer-container-break-stop"),document.getElementById("timer-container").classList.remove("timer-container-session-stop")):"Session"===this.state.phase?(document.getElementById("timer-container").classList.remove("timer-container-break"),document.getElementById("timer-container").classList.add("timer-container-session"),document.getElementById("timer-container").classList.remove("timer-container-break-stop"),document.getElementById("timer-container").classList.remove("timer-container-session-stop")):"Break"===this.state.phase&&(document.getElementById("timer-container").classList.add("timer-container-break"),document.getElementById("timer-container").classList.remove("timer-container-session"),document.getElementById("timer-container").classList.remove("timer-container-break-stop"),document.getElementById("timer-container").classList.remove("timer-container-session-stop"))}},{key:"componentDidMount",value:function(){this.setBackground(),this.redTheme()}},{key:"componentDidUpdate",value:function(){this.setBackground()}},{key:"startStop",value:function(){var e=this;!1===this.state.running?(this.interval=setInterval(function(){e.setState({timeLeft:e.state.timeLeft-1})},10),this.setState({running:!0,startStop:"Stop"})):(clearInterval(this.interval),this.setState({running:!1,startStop:"Start"}))}},{key:"playAudio",value:function(){document.getElementById("beep").play()}},{key:"reset",value:function(){var e=document.getElementById("beep");clearInterval(this.interval),e.pause(),e.currentTime=0,this.setState(this.initialState),this.setBackground()}},{key:"redTheme",value:function(){document.getElementById("pomodoro").classList.add("pomodoro-red"),document.getElementById("pomodoro").classList.remove("pomodoro-green"),document.getElementById("controls-container").classList.remove("controls-container-red"),document.getElementById("controls-container").classList.add("controls-container-green"),document.getElementById("start-stop").classList.remove("controls-container-button-red"),document.getElementById("start-stop").classList.add("controls-container-button-green"),document.getElementById("start-stop").classList.remove("controls-container-button-gray"),document.getElementById("reset").classList.remove("controls-container-button-red"),document.getElementById("reset").classList.add("controls-container-button-green"),document.getElementById("reset").classList.remove("controls-container-button-gray"),document.getElementById("session-container").style.background="#ff9800",document.getElementById("break-container").style.background="#00bcd4",document.getElementById("controls-container").style.background="#8bc34a",document.getElementById("themes-container").style.background="#FDD835",document.querySelectorAll(".button-session").forEach(function(e){return e.style.background="#f57c00"}),document.querySelectorAll(".button-break").forEach(function(e){return e.style.background="#00bcd4"}),document.querySelectorAll(".button-controls").forEach(function(e){return e.style.background="#7CB342"}),document.getElementById("pomodoro").style.background="#FF7043"}},{key:"greenTheme",value:function(){document.getElementById("pomodoro").classList.remove("pomodoro-red"),document.getElementById("pomodoro").classList.add("pomodoro-green"),document.getElementById("controls-container").classList.add("controls-container-red"),document.getElementById("controls-container").classList.remove("controls-container-green"),document.getElementById("start-stop").classList.add("controls-container-button-red"),document.getElementById("start-stop").classList.remove("controls-container-button-green"),document.getElementById("start-stop").classList.remove("controls-container-button-gray"),document.getElementById("reset").classList.add("controls-container-button-red"),document.getElementById("reset").classList.remove("controls-container-button-green"),document.getElementById("reset").classList.remove("controls-container-button-gray"),document.getElementById("session-container").style.background="#ff9800",document.getElementById("break-container").style.background="#00bcd4",document.getElementById("controls-container").style.background="#FF7043",document.getElementById("themes-container").style.background="#FDD835",document.querySelectorAll(".button-session").forEach(function(e){return e.style.background="#f57c00"}),document.querySelectorAll(".button-break").forEach(function(e){return e.style.background="#00bcd4"}),document.querySelectorAll(".button-controls").forEach(function(e){return e.style.background="#ff5722"}),document.getElementById("pomodoro").style.background="#8bc34a"}},{key:"grayTheme",value:function(){document.getElementById("pomodoro").classList.remove("pomodoro-red"),document.getElementById("pomodoro").classList.remove("pomodoro-green"),document.getElementById("controls-container").classList.remove("controls-container-red"),document.getElementById("controls-container").classList.remove("controls-container-green"),document.getElementById("start-stop").classList.remove("controls-container-button-red"),document.getElementById("start-stop").classList.remove("controls-container-button-green"),document.getElementById("start-stop").classList.add("controls-container-button-gray"),document.getElementById("reset").classList.remove("controls-container-button-red"),document.getElementById("reset").classList.remove("controls-container-button-green"),document.getElementById("reset").classList.add("controls-container-button-gray"),document.getElementById("session-container").style.background="#BDBDBD",document.getElementById("break-container").style.background="#BDBDBD",document.getElementById("controls-container").style.background="#BDBDBD",document.getElementById("themes-container").style.background="#BDBDBD",document.querySelectorAll(".button-session").forEach(function(e){return e.style.background="#E0E0E0"}),document.querySelectorAll(".button-break").forEach(function(e){return e.style.background="#E0E0E0"}),document.querySelectorAll(".button-controls").forEach(function(e){return e.style.background="#E0E0E0"}),document.getElementById("pomodoro").style.background="#9E9E9E"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"App"},r.a.createElement("div",{id:"background"}),r.a.createElement("div",{id:"main"},r.a.createElement("h1",null,"Pomodoro Clock"),r.a.createElement("div",{id:"pomodoro"},r.a.createElement(u,{breakLength:this.state.breakLength/60,sessionLength:this.state.sessionLength/60,incrementSession:function(){return e.incrementSession(1)},incrementSessionTen:function(){return e.incrementSession(5)},decrementSession:function(){return e.decrementSession(1)},decrementSessionTen:function(){return e.decrementSession(5)},incrementBreak:function(){return e.incrementBreak(1)},incrementBreakTen:function(){return e.incrementBreak(5)},decrementBreak:function(){return e.decrementBreak(1)},decrementBreakTen:function(){return e.decrementBreak(5)}}),r.a.createElement(g,{timeLeft:this.timeLeft(),phase:this.state.phase}),r.a.createElement(b,{startStop:function(){return e.startStop()},reset:function(){return e.reset()},buttonText:this.state.startStop}),r.a.createElement("audio",{id:"beep",preload:"auto",src:"https://goo.gl/65cBl1"}),r.a.createElement(E,{redTheme:function(){return e.redTheme()},greenTheme:function(){return e.greenTheme()},grayTheme:function(){return e.grayTheme()}}))))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(17)}},[[8,2,1]]]);
//# sourceMappingURL=main.d347fd5a.chunk.js.map