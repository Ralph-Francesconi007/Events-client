import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Card from 'react-bootstrap/Card'
import messages from '../AutoDismissAlert/messages'
import { Redirect, withRouter } from 'react-router-dom'

class EventUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
      title: '',
      time: '',
      date: '',
      description: ''
    } // this.state
  } // constructor
  componentDidMount () {
    axios({
      url: `${apiUrl}/event/` + this.props.id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          title: response.data.event.title,
          time: response.data.event.time,
          date: response.data.event.date,
          description: response.data.event.description
        })
      })
      .catch(console.error)
  }
  onTitleChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.tag = userInput
    this.setState({
      // userImage: userImageCopy
      title: userInput
    })
  }
  onTimeChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.tag = userInput
    this.setState({
      // userImage: userImageCopy
      time: userInput
    })
  }
  onDateChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.tag = userInput
    this.setState({
      // userImage: userImageCopy
      date: userInput
    })
  }
  onDescriptionChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.description = userInput
    this.setState({
      // userImage: userImageCopy
      description: userInput
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    // make a POST request to API /books route with book data
    axios({
      url: `${apiUrl}/event/` + this.props.id,
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` },
      data: {
        event: {
          title: this.state.title,
          time: this.state.time,
          date: this.state.date,
          description: this.state.description
        }
      }
    })
      .then(response => this.setState({ isUpdated: true }))
      .then(() => history.push('/event-feed'))
      .then(() => msgAlert({
        heading: 'Succesfully Updated the Event',
        message: messages.updateEventSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ title: '', time: '', date: '', description: '' })
        msgAlert({
          heading: 'Could not update the event, failed with error ' + error.messages,
          message: messages.updateEventFailed,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.isUpdated) {
      return <Redirect to={'/event-feed'} />
    }
    let jsx
    // while the book is loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // when the request is complete
    } else {
      jsx = (
        <Card>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Card.Title>Title of The Event: <input name="title" type="text" value={this.state.title} onChange={this.onTitleChangeHandler}/></Card.Title>
              <Card.Title>Time of The Event: <input name="time" type="text" value={this.state.time} onChange={this.onTimeChangeHandler}/></Card.Title>
              <Card.Title>Date of The Event: <input name="date" type="text" value={this.state.date} onChange={this.onDateChangeHandler}/></Card.Title>
              <Card.Text>Description: <input name="description" type="text" value={this.state.description} onChange={this.onDescriptionChangeHandler}/>
              </Card.Text>
              <input type="submit" value="Submit" />
            </form>
          </Card.Body>
        </Card>
      )
    }
    return (
      <div>
        <h2>Update Event Page</h2>
        {jsx}
      </div>
    )
  }
}

export default withRouter(EventUpdate)
