import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class EventLog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      eventLog: []
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/event`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          eventLog: response.data.event
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading ...</p>
    } else if (this.state.eventLog === 0) {
      jsx = <p>No Events, please add an event!</p>
    } else {
      jsx = (
        <div>
          {this.state.eventLog.map(eventLog => {
            return (
              <div key={eventLog._id}>
                <h3>{eventLog.title}</h3>
                <p>{eventLog.time}</p>
                <p>{eventLog.date}</p>
              </div>
            )
          })}
        </div>
      )
    }
    return (
      <div>
        <h2>Event Log</h2>
        {jsx}
      </div>
    )
  }
}

export default EventLog
