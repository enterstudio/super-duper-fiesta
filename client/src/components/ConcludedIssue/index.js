import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getResolutionTypeDisplay, RESOLUTION_TYPES } from 'common/actionTypes/voting';
import IconText from '../IconText';
import Card from '../Card';
import css from './ConcludedIssue.css';

const ConcludedIssue = ({
  winner, voteDemand, text, alternatives, concludedVotes, qualifiedVoters,
  }) => {
  const majority = winner !== null;
  return (<Card
    classes={css.concludedIssue}
    headerColor={majority ? 'green' : 'red'}
    title={text}
    corner={
      <IconText
        text={majority ? 'Vedtatt' : 'Avvist'}
        iconClass={majority ? css.majorityIcon : css.minorityIcon}
      />
    }
    subtitle={`Flertallskrav: ${getResolutionTypeDisplay(voteDemand).name} (${getResolutionTypeDisplay(voteDemand).voteDemandText})`}
  >
    <p>Antall stemmeberettigede: {qualifiedVoters}</p>
    <ul className={css.alternatives}>
      {alternatives
        .sort((_, a) => a.id === winner)
        .map(alternative => (
          <li
            key={alternative.id}
            className={classNames({
              [css.alternativesWinner]:
                majority
                && alternative.id === winner,
            })}
          >
            {alternative.text}{ Object.keys(concludedVotes).length > 0 && `: ${concludedVotes[alternative.id]}` }
          </li>
      ))}
    </ul>
  </Card>);
};

ConcludedIssue.defaultProps = {
  alternatives: [],
  concludedVotes: {},
  voteDemand: RESOLUTION_TYPES.regular.voteDemand,
  text: 'Denne saken har ingen tittel.',
  winner: null,
};

ConcludedIssue.propTypes = {
  voteDemand: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string]), // Kept for backwards compatibility. 'oldResolutionTypes'
  text: PropTypes.string.isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  qualifiedVoters: PropTypes.number.isRequired,
  concludedVotes: PropTypes.objectOf(PropTypes.number),
  winner: PropTypes.string,
};


export default ConcludedIssue;
