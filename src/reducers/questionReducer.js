const INITIAL_STATE = {
  QUESTIONS: [],
  activeQuestion: [],
  loading: true,
  Points: 0,
  QuestNum: 0,
};

const questionReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'UPDATE_QD':
      return {...state, QUESTIONS: payload};
    case 'UPDATE_AQ':
      return {...state, activeQuestion: payload};
    default:
      return state;
    case 'INC_QNUM':
      if (state.QuestNum < 14) {
        qNum = parseInt(state.QuestNum) + 1;
        function shuffle(array) {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;

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

          return array;
        }

        var answers = [];
        answers.push(
          state.QUESTIONS.results[qNum].incorrect_answers[0],
          state.QUESTIONS.results[qNum].incorrect_answers[1],
          state.QUESTIONS.results[qNum].incorrect_answers[2],
        );
        answers.push(state.QUESTIONS.results[qNum].correct_answer);

        var _activeQuestion = [];

        _activeQuestion[0] = state.QUESTIONS.results[qNum].question;

        randomizedAnswers = shuffle(answers);
        _activeQuestion[1] = randomizedAnswers;
      }

      return {
        ...state,
        QuestNum: parseInt(payload) + 1,
        activeQuestion: _activeQuestion,
      };
  }
};

export default questionReducer;
