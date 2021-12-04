import { otherAPI } from '../../../api/api';
import { createNewIssueSuccessAC, fetchAllIssuesSuccessAC } from '../action/issue.action';

export const addNewIssueThunk = (data) => async (dispatch) => {
  try {
    await otherAPI.addIssue(data);
    dispatch(createNewIssueSuccessAC());
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllIssuesThunk = (data) => async (dispatch) => {
  try {
    const response = await otherAPI.getAllIssues();
    dispatch(fetchAllIssuesSuccessAC(response.data));
  } catch (err) {
    console.log(err);
  }
};
