const INITIAL_STATE = {
  QUESTIONS: [],
  activeQuestion: [],
  loading: true,
  Points: 0,
};

const questionReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'UPDATE_QD':
      return {...state, QUESTIONS: payload};
    case 'UPDATE_AQ':
      return {...state, activeQuestion: payload};
    default:
      return state;
  }
};

export default questionReducer;
