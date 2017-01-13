export const issue = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_ISSUE':
      return {
        text: action.text,
      };

    default:
      return state;
  }
};

export const issues = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ISSUE':
      return [
        ...state,
        issue(undefined, action),
      ];

    default:
      return state;
  }
};
