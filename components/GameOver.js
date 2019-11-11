import React, { Component } from 'react';

class GameOver extends Component {
    ClickToGoBack() {
        //location.href = "index.html";
        window.location.reload();
    }
    render() {
        return (
            <div id='game-over'>
                <h1>You Have Finished!</h1>
                <h2>Your score is {this.props.score} / 10</h2>
                <h3>in under {this.props.time_taken}</h3>
                <button onClick={() => this.ClickToGoBack()} className='btn btn-primary'>Select Another Quiz!</button>
            </div>
        );
    }
}
export default GameOver;