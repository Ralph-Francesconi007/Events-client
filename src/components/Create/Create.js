import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateEvent extends Component {
  constructor (props) {
    super()
    this.state = {
      createEvent: {
        title: '',
        time: '',
        date: '',
        description: ''
      },
      createdEvent: null
    }
    console.log(props)
  }

  handleChange = (event) => {
    const userInput = event.target.value
    const key = event.target.name
    const eventCopy = Object.assign({}, this.state.createEvent)
    eventCopy[key] = userInput
    this.setState({ createEvent: eventCopy })
    console.log(eventCopy)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const eventItem = this.state.createEvent
    axios({
      url: `${apiUrl}/event`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` },
      data: {
        event: eventItem
      }
    })
      .then(response => this.setState({ createdEvent: response.data.event._id }))
      .catch(console.error)
  }

  render () {
    const { title, time, date, description } = this.state
    return (
      <div>
        <h2>Create an Event</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Title of The Event:</Form.Label>
            <Form.Control required id="title" type="text" name="title" value={title} placeholder="Title of Event" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Time of The Event:</Form.Label>
            <Form.Control required id="time" type="text" name="time" value={time} placeholder="Time of Event" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of the Event:</Form.Label>
            <Form.Control required id="date" type="text" name="date" value={date} placeholder="Date of Event" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description of the Event:</Form.Label>
            <Form.Control required id="description" type="text" name="description" value={description} placeholder="Description of The Event" onChange={this.handleChange}/>
          </Form.Group>
          <Button type="submit">Create the Event</Button>
        </Form>
      </div>
    )
  }
}

export default CreateEvent
