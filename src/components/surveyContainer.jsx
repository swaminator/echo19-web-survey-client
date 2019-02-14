import React from 'react';
import PropTypes from 'prop-types';

import QuestionParser from '../QuestionParser/QuestionParser';
import Question from './Question/Question';

export default class SurveyContainer extends React.Component {
  static propTypes = {
    survey: PropTypes.shape({
      question: PropTypes.array
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.questionParser = new QuestionParser(props.survey);
    this.state = {
      question: this.questionParser.getFirstQuestion(),
      complete: false,
      endMessage: this.questionParser.getEndMessage()
    };
  }

  answerClicked = id => {
    const q = this.questionParser.getNextQuestion(id);
    if (q) {
      this.setState({ question: q });
    } else {
      this.setState({ complete: true });
    }
  };

  render() {
    const { question, complete } = this.state;
    if (!question) {
      return <div>loading...</div>;
    }
    if (complete) {
    }
    return (
      <div className="surveyContainer">
        <Question question={question} cf={this.answerClicked} />
      </div>
    );
  }
}
