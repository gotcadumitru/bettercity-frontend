import { otherAPI } from '../../../api/api';
import { createNewIssueSuccessAC, fetchAllIssuesSuccessAC, fetchSingleIssueSuccessAC } from '../action/issue.action';

export const addNewIssueThunk = (data) => async (dispatch) => {
  try {
    await otherAPI.addIssue(data);
    dispatch(createNewIssueSuccessAC());
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllIssuesThunk = () => async (dispatch) => {
  try {
    const response = await otherAPI.getAllIssues();
    dispatch(fetchAllIssuesSuccessAC(response.data ? response.data : []));
  } catch (err) {
    console.log(err);
  }
};

export const fetchSingleIssueThunk = (id) => async (dispatch) => {
  try {
    const response = await otherAPI.getIssue(id);
    dispatch(fetchSingleIssueSuccessAC(response.data));
  } catch (err) {
    console.log(err);
  }
};
