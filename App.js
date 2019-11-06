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
        <button className="btn btn-primary" value={props.value} style={{ height: '100%' }} onClick={()=>createQuizGame(props.value)}>Start Quiz</button>
      </div>
    </li>
  );
}
function createQuizGame(buttonData){
  alert('Button clicked with data: ' + buttonData);
}
class QuizList extends React.Component {
  quizList = ['General Knowledge', 'Books', 'Film', 'Music', 'Musicals & Theatres', 'Television', 'Video Games', 'Board Games', 'Science & Nature', 'Computers', 'Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Comics', 'Gadgets', 'Japanese Anime & Manga', 'Cartoon and Animations'];
  title = "";
  list = [];
  renderQuizCover(cat, title) {
    return (
      <QuizCover value={cat} title={title} />
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
      </div>

    );
  }
}

function App() {
  return (
    <QuizList></QuizList>
  );
}

export default App;
