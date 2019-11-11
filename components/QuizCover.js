import React from 'react';

const QuizCover = (props) => {

    return (
        <li id="quiz-container">
            <div id="quiz-title">
                <div id="quiz-label">
                    <h1>
                        {props.title}
                    </h1>
                </div>
            </div>
            <div id="quiz-start">
                <button className="btn btn-primary" value={props.value} style={{ height: '100%' }} onClick={() => props.onCreateQuiz(props.value)}>Start Quiz</button>
            </div>
        </li>
    );

}
export default QuizCover;