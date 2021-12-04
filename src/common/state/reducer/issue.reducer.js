import { issueActions } from '../action/issue.action';
import { FetchStatus } from './user.reducer';

const initialState = {
  addIssueStatus: FetchStatus.NULL,
  allIssues: [],
  issue: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case issueActions.CREATE_NEW_ISSUE_SUCCESS: {
      return {
        ...initialState,
        addIssueStatus: FetchStatus.SUCCESS,
      };
    }
    case issueActions.RESET_NEW_ISSUE_STATUS: {
      return {
        ...initialState,
        addIssueStatus: FetchStatus.NULL,
      };
    }
    case issueActions.FETCH_ALL_ISSUES_SUCCESS: {
      return {
        ...initialState,
        allIssues: action.payload,
      };
    }
    case issueActions.FETCH_SINGLE_ISSUE_SUCCESS: {
      return {
        ...initialState,
        issue: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
export default issueReducer;
