const initialState = {
  points: 0,
  earnedPerQuiz: 0,
};

const profileReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'INC_POINTS':
      return {...state, points: parseInt(payload) + state.points};
    case 'INC_EARNED':
      return {
        ...state,
        earnedPerQuiz: state.earnedPerQuiz + parseInt(payload),
      };
    case 'CLEAR':
      return {
        ...state,
        earnedPerQuiz: 0,
      };
    default:
      return state;
  }
};
export default profileReducer;
