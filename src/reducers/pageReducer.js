const initialState = {
  pageNum: 0,
};

const pageReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'INC_PAGE':
      return {...state, pageNum: parseInt(payload) + 1};
    default:
      return state;
  }
};
export default pageReducer;
