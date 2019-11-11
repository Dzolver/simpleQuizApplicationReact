import React, { Component } from 'react';

import QuizCover from './QuizCover';
import Quiz from './Quiz';

class QuizList extends Component {

    constructor() {
        super();
        this.state = {
            buttonData: null
        }
    }

    quizList = ['General Knowledge', 'Books', 'Film', 'Music', 'Musicals & Theatres', 'Television', 'Video Games', 'Board Games', 'Science & Nature', 'Computers', 'Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Comics', 'Gadgets', 'Japanese Anime & Manga', 'Cartoon and Animations'];
    title = "";
    list = [];

    onCreateQuiz = (buttonData) => {
        this.setState({
            buttonData
        });
    }

    renderQuizCover(cat, title) {
        return (
            <QuizCover value={cat} title={title} onCreateQuiz={this.onCreateQuiz} />
        );
    }
    renderQuizList() {
        let list = [];
        for (let i = 9; i < 33; i++) {
            list.push(this.renderQuizCover(i, this.quizList[i - 9]));
        }
        return list;
    }
    render() {
        return (
            <div id='quizs-container'>
                <ul id="quiz-list" style={{ listStyleType: 'none' }}>
                    {this.renderQuizList()}
                </ul>
                {this.state.buttonData != null && <Quiz quizNumber={this.state.buttonData} />}
            </div>
        );
    }
}
export default QuizList;
