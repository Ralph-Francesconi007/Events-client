import React, { Component } from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import { Link } from 'react-router-dom'

class SingleEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
      rsvp: false,
      title: '',
      time: '',
      date: '',
      description: ''
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/event/` + this.props.id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${this.props.user.token}`
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          isLoaded: true,
          formShown: false,
          eventLog: response.data.event,
          title: response.data.event.title,
          time: response.data.event.time,
          date: response.data.event.date,
          description: response.data.event.description,
          createdAt: response.data.event.createdAt,
          owner: response.data.event.owner
        })
      })
      .catch(console.error)
  }

  toggleRSVP = () => {
    this.setState(prevState => {
      return { rsvp: !prevState.rsvp }
    })
  }

  handleDelete = () => {
    const { msgAlert, history } = this.props
    axios({
      url: `${apiUrl}/event/` + this.props.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + `${this.props.user.token}`
      }
    })
      .then(() => history.push('/event-feed'))
      .then(() => msgAlert({
        heading: 'Succesfully Deleted the Event',
        message: messages.deleteEventSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ title: '', time: '', date: '', description: '' })
        msgAlert({
          heading: 'Could not delete the event, failed with error ' + error.messages,
          message: messages.deleteEventFailed,
          variant: 'danger'
        })
      })
  }

  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading ...</p>
    } else {
      jsx = (
        <div>
          <Col key={event._id}>
            <Card border="primary" className={this.state.rsvp ? 'RSVP' : 'UN-RSVP'}>
              <Card.Title>Title of Event: {this.state.title}</Card.Title>
              <Card.Title>Time: {this.state.time}</Card.Title>
              <Card.Title>Date: {this.state.date}</Card.Title>
              <Card.Text>{this.state.description}</Card.Text>
            </Card>
          </Col>
          <Button variant="primary" type="button" onClick={this.handleDelete}>Delete</Button>
          <Link to={`/event-feed/edit/${this.props.id}`}><Button variant="primary" type="button">Update</Button></Link>
          <Button variant="primary" type="button" onClick={this.toggleRSVP}>
            {this.state.rsvp ? 'UN-RSVP' : 'RSVP'}
          </Button>
        </div>
      )
    }
    return (
      <div>
        <h2>Single Page Event</h2>
        {jsx}
      </div>
    )
  }
}

export default SingleEvent
