const generateAlternative = data => (Object.assign({
  id: '1',
  text: 'Blank',
}, data));

const generateIssue = (data) => {
  const issueObject = Object.assign({
    id: '1',
    active: true,
    meetingId: '1',
    description: 'Description goes here',
    showOnlyWinner: false,
    voteDemand: 'regular',
    countingBlankVotes: false,
    secret: false,
    alternatives: [
      generateAlternative({ id: '1', text: 'Blank' }),
      generateAlternative({ id: '2', text: 'Yes' }),
      generateAlternative({ id: '3', text: 'No' }),
    ],
    status: 'VOTING_IN_PROGRESS',
  }, data);
  issueObject.toObject = () => issueObject;
  return issueObject;
};

const generateUser = data => (Object.assign({
  id: '123',
  onlinewebId: '123',
  name: 'Namy',
  completedRegistration: true,
  permissions: 5,
  meetingId: '1',
  canVote: true,
}, data));

const generateManager = data => ({ ...generateUser(), permissions: 10, ...data });

const roomEmit = jest.fn();

const generateSocket = (user = {}, cookie = {}) => ({
  request: {
    user: async () => generateUser(user),
    headers: {
      cookie: Object.assign({
        passwordHash: 'hashy',
      }, cookie),
    },
  },
  broadcast: {
    emit: jest.fn(),
  },
  emit: jest.fn(),
  join: jest.fn(),
  to: () => ({ emit: roomEmit }),
  on: function on(action, callback) {
    this.createAction[action] = callback;
  },
  // HACK: access on's callback
  createAction: {},
});

const generateGenfors = data => (Object.assign({
  id: '1',
  registrationOpen: true,
  pin: 3141592653,
  title: 'Testfors',
  status: 'open',
}, data));

const generateAnonymousUser = data => (Object.assign({
  passwordHash: 'secret_hash',
  meetingId: '1',
}, data));

function generateVote(data) {
  const alternativeId = (data && data.alternative) || (data && data.alternativeId) || '3';
  const issueId = (data && data.issue) || (data && data.issueId) || '1';
  return Object.assign({
    id: '0',
    issueId,
    userId: '1',
    alternativeId,
  }, data);
}

function generateOW4OAuth2ResponseBody(data) {
  return Object.assign({
    first_name: 'first name',
    last_name: 'last name',
    username: 'username',
    preferred_username: 'username',
    email: 'test@example.org',
    member: false,
    staff: false,
    superuser: false,
    nickname: 'nickname',
    rfid: '12345678',
    image: '',
    field_of_study: '',
  }, data);
}

module.exports = {
  generateIssue,
  generateSocket,
  generateGenfors,
  generateAnonymousUser,
  generateUser,
  generateManager,
  generateVote,
  generateAlternative,
  generateOW4OAuth2ResponseBody,
};
