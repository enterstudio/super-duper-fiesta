export const issue = (state = {}, action, currentIssue) => {
  switch (action.type) {
    case 'CREATE_ISSUE':
      return {
        id: action.id,
        text: action.text,
        alternatives: action.alternatives,
        votes: [],
      };

    case 'VOTE':
      // If the vote has been cancelled before this vote was submitted, it needs
      // to be discarded. We also skip it if this is not the current issue.
      if (state.id !== currentIssue || state.id !== action.id) {
        return state;
      }

      return {
        ...state,

        votes: [
          ...state.votes,

          {
            alternative: action.alternative,
          },
        ],
      };

    default:
      return state;
  }
};

const defaultIssues = [{
  id: 0,
  text: 'Trump',
  alternatives: [{
    id: 0,
    text: 'yes',
  }],

  votes: [],
}];

export const issues = (state = defaultIssues, action) => {
  switch (action.type) {
    case 'CREATE_ISSUE':
      return [
        ...state,
        issue(undefined, action),
      ];

    case 'VOTE':
      return state.map(i => issue(i, action, state[state.length - 1].id));

    default:
      return state;
  }
};