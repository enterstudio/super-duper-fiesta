import { connect } from 'react-redux';
import { updateSetting } from '../actionCreators/createIssueForm.js';
import IssueFormCheckboxes from '../components/Admin/IssueForm/Checkboxes';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  values: state.issueSettings,
});

const mapDispatchToProps = dispatch => ({
  updateSetting: (id, value) => {
    dispatch(updateSetting(id, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueFormCheckboxes);
