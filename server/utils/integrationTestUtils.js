const { addIssue } = require('../models/issue.accessors');
const { createGenfors } = require('../models/meeting.accessors');
const { addUser, addAnonymousUser } = require('../models/user.accessors');
const { createUserVote } = require('../models/vote.accessors');
const { addAlternative } = require('../models/alternative.accessors');

const { generateAlternative: generateAlternativeData } = require('./generateTestData');

const { VOTING_NOT_STARTED } = require('../../common/actionTypes/issues');

// TODO: Refactor away the need for this helper
async function getObjectOrDefault(data, key, defaultFunc, args = null) {
  if (data && data[key]) {
    if (typeof data[key] === 'string') {
      return { id: data[key] };
    }
    return data[key];
  }
  if (args) {
    return defaultFunc(args);
  }
  return defaultFunc();
}


async function generateMeeting(data) {
  const meeting = Object.assign({}, {
    title: 'title',
    date: new Date(2010, 1, 1, 1, 1, 1),
    registrationOpen: false,
    status: 'open',
  }, data);
  return createGenfors(meeting.title, meeting.date);
}

async function generateIssue(data, noAlternatives = false) {
  const meeting = (data && data.meeting) || await generateMeeting();
  const alternatives = (data && data.alternatives) ||
    [Object.assign(generateAlternativeData(), { id: undefined })];
  const issue = Object.assign({}, {
    voteDemand: 'regular',
    date: new Date(2010, 1, 1, 0, 0, 0),
    description: 'question',
    meetingId: meeting.id,
    status: VOTING_NOT_STARTED,
    active: true,
    deleted: false,
    secret: false,
    showOnlyWinner: false,
    countingBlankVotes: false,
  }, data);
  return (noAlternatives) ? addIssue(issue) : addIssue(issue, alternatives);
}

async function generateUser(data) {
  const meeting = (data && data.meeting) || await generateMeeting();
  const user = Object.assign({}, {
    onlinewebId: 'test',
    name: 'test user',
    registerDate: new Date(2010, 1, 1, 0, 0, 0),
    canVote: false,
    notes: '',
    permissions: 0,
    completedRegistration: false,
    meetingId: meeting.id,
  }, data);
  return addUser(user);
}

async function generateAnonymousUser(data) {
  const meeting = (data && data.meeting) || await generateMeeting();
  const user = Object.assign({}, {
    passwordHash: '123',
    meetingId: meeting.id,
  }, data);
  return addAnonymousUser(user);
}

async function generateAlternative(data) {
  const issue = await generateIssue();
  const alternative = Object.assign({}, {
    text: 'default alternative',
    issueId: (data && data.issueId) || issue.id,
  }, data);
  return addAlternative(alternative);
}

async function generateVote(data) {
  const issue = await getObjectOrDefault(data, 'question', generateIssue);
  const alternative = await getObjectOrDefault(data, 'alternative', generateAlternative, {
    issueId: issue.id,
    text: 'Blank',
  });
  const user = await getObjectOrDefault(data, 'user', generateUser);
  return createUserVote(user.id, issue.id, alternative.id);
}

module.exports = {
  generateAlternative,
  generateIssue,
  generateMeeting,
  generateUser,
  generateAnonymousUser,
  generateVote,
};
