import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const cardStyle = {
  margin: '10px'
}

class EventLog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      event: []
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
    } else if (this.state.eventLog.length === 0) {
      jsx = <p>No Events, please add an event!</p>
    } else {
      jsx = (
        <div>
          {this.state.eventLog.map(eventLog => {
            return (
              <Col key={eventLog._id}><Link to={`/event-feed/${eventLog._id}`}>
                <Card key={eventLog._id} border="primary" style={cardStyle}>
                  <Card.Title>Title of Event: {eventLog.title}</Card.Title>
                  <Card.Title>Time: {eventLog.time}</Card.Title>
                  <Card.Title>Date: {eventLog.date}</Card.Title>
                  <Card.Text>{eventLog.description}</Card.Text>
                </Card>
              </Link>
              </Col>
            )
          })}
          <br />
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
