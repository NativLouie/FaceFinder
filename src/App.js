import React from 'react';
import Particles from 'react-particles-js';
import { Navigation, Logo, ImageForm, Rank } from './components'
import * as util from './Util'
import './App.css';



function App () {
  return (
    <div className="App">
      <Particles
        className='particles'
        params={ util.particlesConfig } />
      <Navigation />
      <Logo />
      <Rank />
      <ImageForm />
      {/*
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
