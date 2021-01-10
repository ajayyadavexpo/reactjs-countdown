import React from 'react';
class TimerComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = { time: {}, seconds: 0,continue:true };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resumeTimer = this.resumeTimer.bind(this);
    }
    secondsToTime(s) {
        const d = Math.floor(s / (3600 * 24));
        s -= d * 3600 * 24;
        const h = Math.floor(s / 3600);
        s -= h * 3600;
        const m = Math.floor(s / 60);
        s -= m * 60;
        let obj = {
            "d" : d,
            "h": h,
            "m": m,
            "s": s
        };
        return obj;
    }
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    stopTimer(){
        if(this.state.seconds > 0){
            this.setState({continue:false});
        }
    }
    
    resumeTimer(){
        if (this.state.continue === false && this.state.seconds > 0){
            this.setState({continue:true});
        }
    }
    resetTimer() {
        let obj = {
            "d": 0,
            "h": 0,
            "m": 0,
            "s": 0
        };
        this.setState({continue:true});
        this.setState({seconds:0});
        this.setState({ time: obj});
        clearInterval(this.timer);
        this.timer = 0;
        this._inputChange.value = '';
    }

    countDown() {
         if(this.state.continue === true){
            // Remove one second, set state so a re-render happens.        
            let seconds = this.state.seconds - 1;
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
            });

            // Check if we're at zero.
            if (seconds === 0) {
                clearInterval(this.timer);
            }
        }
    }
    handleChange = (event) => {
        this.setState({ seconds: event.target.value });
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-8">
                        <div className="parent-card">
                            <h3 className="text-center head">Countdown</h3>
                            <div className="row text-center time-card-layout">
                                <div className="col p-1 text-center">
                                    <div className="time-card">
                                        <p>D</p>
                                        <p>{this.state.time.d}</p>
                                    </div>
                                </div>
                                
                                <div className="col p-1 text-center">
                                    <div className="time-card">
                                        <p>H</p>
                                        <p>{this.state.time.h}</p>
                                    </div>
                                </div>
                                <div className="col p-1 text-center">
                                    <div className="time-card">
                                        <p>M</p>
                                        <p>{this.state.time.m}</p>
                                    </div>
                                </div>
                                <div className="col p-1 text-center">
                                    <div className="time-card">
                                        <p>S</p>
                                        <p>{this.state.time.s}</p>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="text-center w-100">
                                    <input type="number" className="form-input" placeholder="Enter Seconds..." onChange={this.handleChange} ref={(a)=>this._inputChange = a}/>
                                </div>
                            </div>

                            <div className="row button-card w-100 p-0 m-0">
                                <div className="col p-0 text-center">

                                    {this.state.continue === true ? (<button type="button" className="btn btn-stop" onClick={this.stopTimer}>Stop</button>) : <button type="button" className="btn btn-stop" onClick={this.resumeTimer}>Resume</button>}

                                    

                                </div>
                                <div className="col p-0 text-center">
                                    
                                    <button type="button" className="btn btn-start" onClick={this.startTimer}>Start</button>
                                </div>
                                <div className="col p-0 text-center">
                                    <button type="button" className="btn btn-reset" onClick={this.resetTimer}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimerComponent;