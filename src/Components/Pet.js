import React, { Component } from 'react';
import './App.css';
import LazyImage from './LazyImage'
import PetService from '../Service/PetService';

class Pet extends Component {
    constructor(props, context) {
        super(props, context);
        var animal = props.value;
        this.no_image_url = PetService.getNoImageUrl(animal);
        this.context_data = PetService.getContextData(animal);

        if (['dogs', 'cats'].indexOf(animal) !== -1) {
            this.image_url = PetService.getImageUrl(animal);
        }
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <h2 className="daily-header">Here is your Daily {this.context_data.title}</h2>
                    <a href={this.context_data.tg_url}>
                        <LazyImage className="daily-picture"
                                   unloadedSrc={this.no_image_url}
                                   src={this.image_url} />
                    </a>
                    <p>Follow our telegram <a href={this.context_data.tg_url}>channel</a>!</p>
                </header>
            </div>
        );
    }
}

export default Pet;
