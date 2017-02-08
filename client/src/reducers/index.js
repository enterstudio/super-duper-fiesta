import { combineReducers } from 'redux';
import issues from './issues';
import meeting from './meeting';
import voterKey from './voterKey';
import totalUsers from './totalUsers';
import votingEnabled from './votingEnabled';
import registrationEnabled from './adminButtons';
import userFilter from './userFilter';
import users from './users';

const votingApp = combineReducers({
  issues,
  meeting,
  voterKey,
  totalUsers,
  votingEnabled,
  registrationEnabled,
  userFilter,
  users,
});

export default votingApp;