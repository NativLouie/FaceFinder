import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Navigation, Logo, ImageForm, Rank, FaceRecognition, SignIn, Register } from '../components'
import * as util from '../Util'
import './Home.css';


export default class Home extends Component {

  constructor () {
    super()
    this.state = {
      userInput: '',
      imageUrl: '',
      boxCord: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  handleInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }


  handleOnSubmit = () => {
    const { userInput, user } = this.state

    this.setState({
      imageUrl: userInput
    })


    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: userInput
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(user, { entries: count }))
            })
            .catch(error => {
              console.log(error)
            })

        }
        this.handleSetFaceBox(this.handleCalculateFaceLocation(response))
      })
      .catch(error => console.log(error))
  }

  handleCalculateFaceLocation = (data) => {
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage')

    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: faceLocation.left_col * width,
      topRow: faceLocation.top_row * height,
      rightCol: width - (faceLocation.right_col * width),
      bottomRow: height - (faceLocation.bottom_row * height)
    }


  }

  handleSetFaceBox = (location) => {

    this.setState({
      boxCord: location
    })

  }

  handleOnRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        userInput: '',
        imageUrl: '',
        boxCord: {},
        route: 'signin',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }

      })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })

    }

    this.setState({ route: route })

  }

  handleLoadUserData = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  render () {
    const { imageUrl, boxCord, route, isSignedIn, user } = this.state
    return (
      <div className="App">
        <Particles
          className='particles'
          params={ util.config.particlesConfig } />
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.handleOnRouteChange } />
        { route === 'home' ?
          <div>

            <Logo />
            <Rank
              name={ user.name }
              entries={ user.entries }

            />
            <ImageForm onInputChange={ this.handleInputChange } onButtonSubmit={ this.handleOnSubmit } />
            <FaceRecognition boxArea={ boxCord } imageUrl={ imageUrl } />
          </div>

          :
          (route === 'signin' ?
            <SignIn loadUser={ this.handleLoadUserData } onRouteChange={ this.handleOnRouteChange } />
            :
            <Register loadUser={ this.handleLoadUserData } onRouteChange={ this.handleOnRouteChange } />

          )

        }

      </div>
    );
  }

}
