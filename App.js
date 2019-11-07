import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      quiz_number: null,
      current_question: null,
      questions: [],
      question_counter: 0,
      startDate: [],
      quiz_data: [],
      total_points: [],
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

  nextQuestion = () => {
    let { question_counter } = this.state;
    this.setState({ question_counter: question_counter += 1 },
      () => console.log(this.state.question_counter))
  }
  decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  displayAnswer = (id, answer) =>{
    return(
      <div style={{float:'left',width:'45%',padding:'10px', backgroundColor:'black', marginRight:'30px',marginBottom:'30px',borderStyle:'solid',borderWidth:'1px',borderColor:'lime', borderRadius:'10px'}} onClick={this.nextQuestion}>
<li id={'li'+id} style={{margin:'10px',backgroundColor:'black'}}>{this.decodeHtml(answer)}</li>
      </div>
      
    )
  }
  displayAnswerList = ()=>{
    let list = [];
    list = this.state.myJson[this.state.question_counter].incorrect_answers
    list.push(this.state.myJson[this.state.question_counter].correct_answer)
    list = this.shuffle(list); 
    let answerList = []
    for(let i=0;i<4;i++){
      if(list[i]==null){
        continue;
      }else{
        answerList.push(this.displayAnswer(i,list[i]));
      }
      
    }
    return answerList;
  }
  shuffle=(array)=> {
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
                  {this.state.myJson.length > 0 && this.state.question_counter !==10 && this.decodeHtml(this.state.myJson[this.state.question_counter].question)}
                </div>
              </h2>
              <br />
              <h3>
                <div id="quiz-answer-list" style={{listStyleType:'none'}}>
                  {this.state.myJson.length > 0  && this.state.question_counter !==10 && this.displayAnswerList()}
                  <br/>
                </div>
              </h3>
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
