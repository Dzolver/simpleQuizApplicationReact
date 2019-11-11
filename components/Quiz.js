import React, { Component } from 'react';
import ScoreCover from './ScoreCover';
import GameOver from './GameOver';

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            quiz_number: null,
            current_question: null,
            questions: [],
            question_counter: 0,
            startDate: new Date(),
            quiz_data: [],
            total_points: 0,
            correct_answers: [],
            incorrect_answers: [],
            current_answer_status: [],
            current_answer_list: [],
            myJson: []
        }
    }
    highest_option_count = 4;
    componentDidMount() {
        //STUCK HERE
        if (this.state.quiz_number == null) {
            this.setState({
                quiz_number: this.props.quizNumber
            })
            fetch('https://opentdb.com/api.php?amount=10&category=' + this.props.quizNumber)
                .then((result) => {
                    result.json()
                        .then(myJson => {
                            this.setState({
                                myJson: myJson.results
                            }, () => {
                                console.log(this.state.myJson);

                            });
                        })
                });
        }
    }
    round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    nextQuestion = (answer) => {
        console.log('RECEIVED ANSWER', answer);
        if (answer === this.state.myJson[this.state.question_counter].correct_answer) {
            let current_score = this.state.total_points;
            this.setState({
                total_points: current_score + 1
            })
        }
        console.log('S C O R E', this.state.total_points);
        let { question_counter } = this.state;
        this.setState({ question_counter: question_counter += 1 },
            () => console.log(this.state.question_counter))
    }

    decodeHtml = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    displayAnswer = (id, answer) => {
        return (
            <div id={'divli' + id} style={{ float: 'left', width: '45%', padding: '10px', backgroundColor: 'black', marginRight: '30px', marginBottom: '30px', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lime', borderRadius: '10px' }} onClick={() => this.nextQuestion(answer)}>
                <li id={'li' + id} style={{ margin: '10px', backgroundColor: 'black' }}>{this.decodeHtml(answer)}</li>
            </div>

        )
    }
    displayGameOver = (score, time) => {
        let now = new Date();
        let time_taken = (now.getTime() - time.getTime()) / 1000;
        let minutes = 0;
        let seconds = 0;
        if (time_taken < 60) {
            time_taken = time_taken + ' SECONDS TAKEN';
        } else {
            minutes = Math.floor(time_taken / 60);
            seconds = time_taken - minutes * 60;
            if (seconds === 0) {
                time_taken = minutes + ' MINUTES TAKEN'
            } else {
                time_taken = minutes + ' MINUTES AND ' + this.round(seconds, 1) + " SECONDS TAKEN";
            }
        }
        return (
            <GameOver score={score} time_taken={time_taken} />
        )
    }
    displayAnswerList = () => {
        let list = [];
        list = this.state.myJson[this.state.question_counter].incorrect_answers
        list.push(this.state.myJson[this.state.question_counter].correct_answer)
        list = this.shuffle(list);
        let answerList = []
        for (let i = 0; i < 4; i++) {
            if (list[i] == null) {
                continue;
            } else {
                answerList.push(this.displayAnswer(i, list[i]));
            }

        }
        return answerList;
    }
    displayScore = () => {
        return <ScoreCover score={this.state.total_points} />
    }
    shuffle = (array) => {
        console.log('raw array', array)
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        console.log('shuffled array ' + array);
        return array;
    }
    createInterface() {
        console.log("quiz ", this.props.quizNumber);
        return (
            <div id="quiz-game-container">
                <div>
                    <h1>
                        <div id="quiz-title-in-game">
                            <h1 id='quiz-heading'>ANSWER THE QUESTIONS AS FAST AS YOU CAN!</h1>
                            <h2>
                                <div id="quiz-question" defaultValue="loading question">
                                    {this.state.myJson.length > 0 && this.state.question_counter !== 10 && this.decodeHtml(this.state.myJson[this.state.question_counter].question)}
                                </div>
                            </h2>
                            <br />
                            <h3>
                                <div id="quiz-answer-list" style={{ listStyleType: 'none' }}>
                                    {this.state.myJson.length > 0 && this.state.question_counter !== 10 && this.displayAnswerList()}
                                    <br />
                                </div>
                            </h3>
                            <h3>
                                <div id='stats' style={{ color: 'blue', marginLeft: '50px', marginTop: '20px' }}>
                                    {this.state.myJson.length > 0 && this.state.question_counter !== 10 && this.displayScore()}
                                </div>
                            </h3>
                        </div>
                    </h1>
                </div>
                {this.state.myJson.length > 0 && this.state.question_counter === 10 && this.displayGameOver(this.state.total_points, this.state.startDate)}
            </div>
        );
    }
    render() {
        return (
            this.createInterface()
        );
    }
}
export default Quiz;