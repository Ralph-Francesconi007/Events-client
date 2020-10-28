import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateEvent from '../Create/Create'
import EventLog from '../EventLog/EventLog'
import SingleEvent from '../SingleEvent/SingleEvent'
import EventUpdate from '../EventUpdate/EventUpdate'
import Profile from '../Profile/Profile'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-event' render={() => (
            <CreateEvent user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/event-feed' render={() => (
            <EventLog user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/event-feed/:id' render={(eventLogProps) => {
            const { match, history } = eventLogProps
            const eventLogId = match.params.id
            return (
              <SingleEvent
                id={eventLogId}
                user={user}
                history={history}
              />
            )
          }} />
          <AuthenticatedRoute user={user} exact path='/event-feed/:id' render={(eventLogProps) => {
            const { match } = eventLogProps
            const eventLogId = match.params.id
            return (
              <EventUpdate
                id={eventLogId}
                user={user}
                history={history}
              />
            )
          }} />
          <AuthenticatedRoute user={user} path='/profile' render={() => (
            <Profile user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
