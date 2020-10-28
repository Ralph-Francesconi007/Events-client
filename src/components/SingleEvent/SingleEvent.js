import React, { Component } from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class SingleEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
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

  updateClick = () => {
    this.setState({ formShown: true })
  }

  handleUpdate = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/event/` + this.props.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + `${this.props.user.token}`
      },
      data: {
        event: {
          title: this.state.title,
          time: this.state.time,
          date: this.state.date,
          description: this.state.description
        }
      }
    })
      .then(response => {
        this.setState({
          isUpdated: true,
          formShown: false
        })
      })
      .catch(console.error)
  }

  handleDelete = () => {
    axios({
      url: `${apiUrl}/event/` + this.props.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + `${this.props.user.token}`
      }
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
            <Card border="primary">
              <Card.Title>Title of Event: {this.state.title}</Card.Title>
              <Card.Title>Time: {this.state.time}</Card.Title>
              <Card.Title>Date: {this.state.date}</Card.Title>
              <Card.Text>{this.state.description}</Card.Text>
            </Card>
          </Col>
          <Button variant="primary" type="button" onClick={this.handleDelete}>Delete</Button>
          <Button variant="primary" type="button" onClick={this.updateClick}>Update</Button>
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
