import React, { PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeContainer as AppHomeContainer } from './Home';
import { SetupContainer } from './Setup';
import Button from '../Button';
import Heading from '../Heading';
import NewVersionAvailable from '../NewVersionAvailable';
import { ErrorContainer } from '../Error';
import { IS_MANAGER } from '../../../../common/auth/permissions';
import NotFound from '../NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newVersionAvailable: false,
      currentVersion: props.version,
    };
  }

  componentWillReceiveProps(nextProps) {
    // If no version stored in state, store the incoming version.
    if (this.state && !this.state.currentVersion.length) {
      this.setState({
        currentVersion: nextProps.version,
      });
    } else if (this.state.currentVersion !== nextProps.version) {
      this.setState({ newVersionAvailable: true });
    }
  }

  render() {
    const { fullName, loggedIn, title, match, userPermissions } = this.props;
    const { newVersionAvailable } = this.state;
    const userIsManager = userPermissions >= IS_MANAGER;
    return (
      <div>
        <Heading link="/" title={title}>
          <span>{fullName}</span>
          <a href={loggedIn ? '/logout' : '/login'}>
            <Button>Logg {loggedIn ? 'ut' : 'inn'}</Button>
          </a>
          {userIsManager &&
            <Link to="/admin">
              <Button>Tellekorps</Button>
            </Link>}
        </Heading>
        <main>
          <NewVersionAvailable newVersionAvailable={newVersionAvailable} />
          <ErrorContainer />
          <Switch>
            <Route exact path={`${match.path}register`} component={SetupContainer} />
            <Route exact path={match.path} component={AppHomeContainer} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

App.defaultProps = {
  fullName: '',
  loggedIn: false,
  title: 'Super Duper Fiesta : Ingen aktiv generalforsamling',
  match: null,
  version: '',
};

App.propTypes = {
  fullName: PropTypes.string,
  loggedIn: PropTypes.bool,
  title: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })).isRequired,
  userPermissions: PropTypes.number.isRequired,
  version: PropTypes.string,
};

const mapStateToProps = state => ({
  fullName: state.auth.fullName,
  loggedIn: state.auth.loggedIn,
  title: state.meeting.title,
  userPermissions: state.auth.permissions,
  version: state.version,
});

export default App;
export const AppContainer = connect(
  mapStateToProps,
)(App);
