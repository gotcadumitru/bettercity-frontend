import { combineReducers } from 'redux';
import { notificationReducer } from './reducer/notification.reducer';
import otherReducer from './reducer/other.reducer';
import userReducer from './reducer/user.reducer';

const rootReducer = combineReducers({
  profileInfo: userReducer,
  notification: notificationReducer,
  other: otherReducer,
});

export default rootReducer;
