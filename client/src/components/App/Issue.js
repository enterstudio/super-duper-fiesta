import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { getIssueText, getIssueKey } from '../../selectors/issues';
import Card from '../Card';
import Loader from './Loader';
import css from './Issue.css';

const Issue = ({ text, secret, showOnlyWinner, countingBlankVotes, voteDemand }) => (
  <DocumentTitle title={text}>
    <Card
      classes={css.issue}
      subtitle={'Aktiv sak'}
    >
      <p>{text}</p>
      {text === Issue.defaultProps.text && (
        <Loader />
      )}
      <p className={css.infoTags}>{
        'Hemmelig: ' + (secret ? ' Ja' : ' Nei')
      }</p>
      <p className={css.infoTags}>{
        'Vis bare vinner: ' + (showOnlyWinner ? ' Ja' : ' Nei')
      }</p>
      <p className={css.infoTags}>{
        'Blanke stemmer telles: ' + (countingBlankVotes ? ' Ja' : ' Nei')
      }</p>
      <p className={css.infoTags}>{
        'Minimum stemmer for vedtak: ' + (voteDemand === 'regular' ? '1/2' : '2/3')
      }</p>
    </Card>
  </DocumentTitle>
);

Issue.defaultProps = {
  text: 'Ingen aktiv sak for øyeblikket.',
};

Issue.propTypes = {
  text: React.PropTypes.string,
};


const mapStateToProps = state => ({
  text: getIssueText(state),
  secret: getIssueKey(state, 'secret', false),
  showOnlyWinner: getIssueKey(state, 'showOnlyWinner', false),
  countingBlankVotes: getIssueKey(state, 'countingBlankVotes', false),
  voteDemand: getIssueKey(state, 'voteDemand', false),
});

export default Issue;
export const IssueContainer = connect(
  mapStateToProps,
)(Issue);
