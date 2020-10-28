import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Card from 'react-bootstrap/Card'

class Profile extends Component {
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
              <Card key={eventLog._id} border="primary">
                <Card.Title>Title of Event: {eventLog.title}</Card.Title>
                <Card.Title>Time: {eventLog.time}</Card.Title>
                <Card.Title>Date: {eventLog.date}</Card.Title>
                <Card.Text>{eventLog.description}</Card.Text>
              </Card>
            )
          })}
          <br />
        </div>
      )
    }
    return (
      <div>
        <h2>{this.props.user.email} Profile</h2>
        {jsx}
      </div>
    )
  }
}

export default Profile
