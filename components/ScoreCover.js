import React, { Component } from 'react';

class ScoreCover extends Component {
    render() {
        return (
            <div id='quiz-score'>
                {this.props.score}
            </div>
        )
    }
}
export default ScoreCover;