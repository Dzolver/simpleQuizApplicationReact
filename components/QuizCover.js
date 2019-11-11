import React, { Component } from 'react';

class QuizCover extends Component {
    render() {
        return (
            <li id="quiz-container">
                <div id="quiz-title">
                    <div id="quiz-label">
                        <h1>
                            {this.props.title}
                        </h1>
                    </div>
                </div>
                <div id="quiz-start">
                    <button className="btn btn-primary" value={this.props.value} style={{ height: '100%' }} onClick={() => this.props.onCreateQuiz(this.props.value)}>Start Quiz</button>
                </div>
            </li>
        );
    }
}
export default QuizCover;