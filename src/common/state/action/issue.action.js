export const issueActions = {
  CREATE_NEW_ISSUE_SUCCESS: 'CREATE_NEW_ISSUE_SUCCESS',
  RESET_NEW_ISSUE_STATUS: 'RESET_NEW_ISSUE_STATUS',

  FETCH_ALL_ISSUES_SUCCESS: 'FETCH_ALL_ISSUES_SUCCESS',

  FETCH_SINGLE_ISSUE_SUCCESS: 'FETCH_SINGLE_ISSUE_SUCCESS',

  FETCH_STATISTICS: 'FETCH_STATISTICS',
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

export const fetchSingleIssueSuccessAC = (issue) => ({
  type: issueActions.FETCH_SINGLE_ISSUE_SUCCESS,
  payload: issue,
});
export const fetchStatisticsSuccessAC = (statistics) => ({
  type: issueActions.FETCH_STATISTICS,
  payload: statistics,
});
