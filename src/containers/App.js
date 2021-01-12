import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import 'tachyons';
import './App.css';
import { render } from 'react-dom';

const app = new Clarifai.App({
    apiKey: 'caab52e30d2b465aa1a271bc9a6e89e0'
});

const particlesOptions = {
    //customize this to your liking
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

// .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',

        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
        .then(
            function(response) {
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            },
            function(err) {
                // there was an error
            }
        );
    }
    render() {
        return (
            <div className="App">
                <Particles className="particles"
                    params={particlesOptions}
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit}
                /> 
                <FaceRecognition imageUrl={this.state.imageUrl}/> 
            </div>
        );
    }
}

export default App;
