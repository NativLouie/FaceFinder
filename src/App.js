import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { Navigation, Logo, ImageForm, Rank, FaceRecognition, SignIn, Register } from './components'
import * as util from './Util'
import './App.css';


class App extends Component {

  constructor () {
    super()
    this.state = {
      userInput: '',
      imageUrl: '',
      boxCord: {},
      route: 'signin',
      isSignedIn: false
    }
  }


  handleInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }


  handleOnSubmit = () => {
    const { userInput } = this.state

    this.setState({
      imageUrl: userInput
    })

    util.config.app.models
      .predict(Clarifai.FACE_DETECT_MODEL, userInput)
      .then(resp => {
        console.log(resp, 'resp')

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
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })

    }

    this.setState({ route: route })

  }

  render () {
    const { imageUrl, boxCord, route, isSignedIn } = this.state
    return (
      <div className="App">
        <Particles
          className='particles'
          params={ util.config.particlesConfig } />
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.handleOnRouteChange } />
        { route === 'home' ?
          <div>

            <Logo />
            <Rank />
            <ImageForm onInputChange={ this.handleInputChange } onButtonSubmit={ this.handleOnSubmit } />
            <FaceRecognition boxArea={ boxCord } imageUrl={ imageUrl } />
          </div>

          :
          (route === 'signin' ?
            <SignIn onRouteChange={ this.handleOnRouteChange } />
            :
            <Register onRouteChange={ this.handleOnRouteChange } />

          )

        }

      </div>
    );
  }

}

export default App;
