import { combineReducers } from 'redux';
import issueReducer from './reducer/issue.reducer';
import { notificationReducer } from './reducer/notification.reducer';
import userReducer from './reducer/user.reducer';

const rootReducer = combineReducers({
  profileInfo: userReducer,
  notification: notificationReducer,
  issue: issueReducer,
});

export default rootReducer;
