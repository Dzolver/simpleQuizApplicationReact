import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';

function QuizCover(props) {
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
// function createQuizGame(buttonData){
//   alert('clicked');
//   console.log("data button clicked");

//   return (
//     <Quiz quizNumber={buttonData}/>
//   );
// }
class QuizList extends React.Component {

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

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      quiz_number: 9,
      current_question:null,
      questions: [],
      question_counter: 0,
      startDate: [],
      quiz_data: [],
      total_points: [],
      correct_answers: [],
      incorrect_answers: [],
      current_answer_status: [],
      current_answer_list: null
    }
  }
  highest_option_count = 4;
  componentDidMount() {
    //STUCK HERE
    const response = fetch('https://opentdb.com/api.php?amount=10&category=' + this.state.quiz_number);
    const myJson = response.data.json();
    this.setState({
      quiz_number: this.props.quizNumber,
      quiz_data: myJson.results
    });
    console.log('mount data',this.state.quiz_data);
  }
  componentDidUpdate(){
    this.setState({
      current_question:this.quiz_data[this.question_counter].question
    });
    console.log('new question',this.current_question);
  }
  createInterface() {
    console.log("quiz ", this.props.quizNumber);
    return (
      <div id="quiz-game-container">
        <div>
          <h1>
            <div id="quiz-title-in-game">
              <h1>ANSWER THE QUESTIONS AS FAST AS YOU CAN!</h1>
              <h2>
                <div id="quiz-question">
                  THIS IS THE QUESTION
                </div>
              </h2>
              <br />
              <h3>
                <div id="quiz-answer-list">
                  THIS IS THE ANSWER LIST
                </div>
              </h3>
              <div id="answer-container">
                <button id='answer_button' className='btn btn-primary'
                  style={{ marginLeft: '50px' }}>NEXT QUESTION</button>
              </div>
              <h3>
                <div id='stats' style={{ color: 'blue', marginLeft: '50px', marginTop: '20px' }}>
                </div>
              </h3>
            </div>
          </h1>
        </div>
      </div>
    );
  }
  render() {
    return (
      this.createInterface()
    );
  }
}

function App() {
  return (
    <QuizList></QuizList>
  );
}

export default App;
