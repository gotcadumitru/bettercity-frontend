export const issueActions = {
  CREATE_NEW_ISSUE_SUCCESS: 'CREATE_NEW_ISSUE_SUCCESS',
  RESET_NEW_ISSUE_STATUS: 'RESET_NEW_ISSUE_STATUS',

  FETCH_ALL_ISSUES_SUCCESS: 'FETCH_ALL_ISSUES_SUCCESS',
};

export const createNewIssueSuccessAC = () => ({
  type: issueActions.CREATE_NEW_ISSUE_SUCCESS,
});
export const resetNewIssueStatusAC = () => ({
  type: issueActions.RESET_NEW_ISSUE_STATUS,
});

export const fetchAllIssuesSuccessAC = (allIssues) => ({
  type: issueActions.FETCH_ALL_ISSUES_SUCCESS,
  payload: allIssues,
});
