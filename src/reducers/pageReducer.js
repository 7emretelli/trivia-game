const INITIAL_STATE = {
  pageNum: 0,
  questNum: 0,
};

const pageReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'INC_PAGE':
      return {...state, pageNum: parseInt(payload) + 1};
    case 'INC_QNUM':
      return {...state, questNum: parseInt(payload) + 1};

    default:
      return state;
  }
};
export default pageReducer;
