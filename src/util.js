export function shuffle(array) {
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

export const QUESTION_INDEX = 0;
export const ANSWER_INDEX = 1;

export const modalCategories = [
  {label: 'Entertainment: General Knowledge', value: 9},
  {label: 'Entertainment: Books', value: 10},
  {label: 'Entertainment: Film', value: 11},
  {label: 'Entertainment: Music', value: 12},
  {
    label: 'Entertainment: Musicals & Theatres',
    value: 13,
  },
  {label: 'Entertainment: Television', value: 14},
  {label: 'Entertainment: Video Games', value: 15},
  {label: 'Entertainment: Board Games', value: 16},
  {label: 'Science & Nature', value: 17},
  {label: 'Science: Computers', value: 18},
  {label: 'Science: Mathematics', value: 19},
  {label: 'Mythology', value: 20},
  {label: 'Sports', value: 21},
  {label: 'Geography', value: 22},
  {label: 'History', value: 23},
  {label: 'Politics', value: 24},
  {label: 'Art', value: 25},
  {label: 'Celebrities', value: 26},
  {label: 'Animals', value: 27},
  {label: 'Vehicles', value: 28},
  {label: 'Entertainment: Comics', value: 29},
  {label: 'Science: Gadgets', value: 30},
  {
    label: 'Entertainment: Japanese Anime & Manga',
    value: 31,
  },
  {
    label: 'Entertainment: Cartoon & Animations',
    value: 32,
  },
];

export const modalDifficulty = [
  {label: 'Easy', value: 'easy'},
  {label: 'Medium', value: 'medium'},
  {label: 'Hard', value: 'hard'},
];
