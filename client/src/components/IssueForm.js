import React from 'react';
import Button from './Button';
import '../css/IssueForm.css';
import SelectResolutionTypeContainer from '../containers/SelectResolutionTypeContainer';
import SelectQuestionTypeContainer from '../containers/SelectQuestionTypeContainer';
import AddIssueFormAlternative from '../containers/AddIssueFormAlternative';
import IssueFormSettings from '../containers/IssueFormSettings';

const YES_NO_ANSWERS = [
  { text: 'Ja' },
  { text: 'Nei' },
];

class IssueForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issueDescription: '',
      alternatives: YES_NO_ANSWERS,
      secretVoting: false,
      showOnlyWinner: false,
      countBlankVotes: false,
    };

    this.handleAddAlternative = this.handleAddAlternative.bind(this);
    this.handleCreateIssue = this.handleCreateIssue.bind(this);
    this.updateIssueDescription = this.updateIssueDescription.bind(this);
    this.handleUpdateCountBlankVotes = this.handleUpdateCountBlankVotes.bind(this);
    this.handleUpdateSecretVoting = this.handleUpdateSecretVoting.bind(this);
    this.handleUpdateShowOnlyWinner = this.handleUpdateShowOnlyWinner.bind(this);
  }

  handleAddAlternative(alternativeText) {
    const { alternatives } = this.state;
    alternatives.push({ text: alternativeText });
    this.setState({ alternatives });
  }

  handleCreateIssue() {
    const { createIssue } = this.props;
    const { issueDescription, alternatives, countBlankVotes, secretVoting, showOnlyWinner } = this.state;
    createIssue(issueDescription, alternatives,
      1, // @ToDo: Get from state.
      showOnlyWinner, secretVoting, countBlankVotes,
    );
  }

  updateIssueDescription(e) {
    this.setState({ issueDescription: e.target.value });
  }

  handleUpdateCountBlankVotes(countBlankVotes) {
    this.setState({ countBlankVotes });
  }

  handleUpdateSecretVoting(secretVoting) {
    this.setState({ secretVoting });
  }

  handleUpdateShowOnlyWinner(showOnlyWinner) {
    this.setState({ showOnlyWinner });
  }

  render() {
    const showActiveIssueWarning = this.props.issue && this.props.issue.text;
    const issueReadyToCreate = !showActiveIssueWarning && this.state.issueDescription && this.state.issueDescription.length;
    return (
      <div className="IssueForm">
        <p
          className="IssueForm--ActiveIssueWarning"
          hidden={!showActiveIssueWarning}
        >Det er allerede en aktiv sak!</p>
        <label className="IssueForm-textarea">
          <div className="IssueForm-label">Beskrivelse</div>
          <textarea
            onChange={this.updateIssueDescription}
            placeholder="Skriv inn saken her."
            value={this.state.issueDescription}
          />
          <p>Beskrivelse av saken</p>
        </label>
        <AddIssueFormAlternative
          alternatives={this.state.alternatives}
          handleAddAlternative={this.handleAddAlternative}
        />
        <div className="IssueForm-label">Innstillinger</div>
        <IssueFormSettings
          handleUpdateCountBlankVotes={this.handleUpdateCountBlankVotes}
          handleUpdateSecretVoting={this.handleUpdateSecretVoting}
          handleUpdateShowOnlyWinner={this.handleUpdateShowOnlyWinner}
          countBlankVotes={this.state.countBlankVotes}
          secretVoting={this.state.secretVoting}
          showOnlyWinner={this.state.showOnlyWinner}
        />
        <label className="IssueForm-select">
          <div className="IssueForm-label">Flertallstype</div>
          <SelectResolutionTypeContainer />
        </label>
        <label className="IssueForm-select">
          <div className="IssueForm-label">Spørsmålstype</div>
          <SelectQuestionTypeContainer />
        </label>
        <Button
          background
          onClick={this.handleCreateIssue}
          disabled={!issueReadyToCreate}
        >Lagre sak</Button>
      </div>
    );
  }
}

IssueForm.defaultProps = {
  createIssue: undefined,
};

IssueForm.propTypes = {
  createIssue: React.PropTypes.func,
};

export default IssueForm;
