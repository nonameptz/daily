import React, { Component } from 'react';
import './App.css';
import LazyImage from './LazyImage'
import PetService from '../Service/PetService';

class Pet extends Component {
    constructor(props, context) {
        super(props, context);
        var animal = props.value;
        this.noImageUrl = PetService.getNoImageUrl(animal);
        this.contextData = PetService.getContextData(animal);

        if (['dogs', 'cats'].indexOf(animal) !== -1) {
            this.imageUrl = PetService.getImageUrl(animal);
        }
    }

    render() {
        let mainContentClassName = 'main-content active-' + this.props.value;
        return (
            <div>
                <div className={mainContentClassName}>
                    <h2 className="daily-header">Here is your Daily {this.contextData.title}</h2>
                    <a href={this.contextData.tgUrl}>
                        <LazyImage className="daily-picture"
                                   unloadedSrc={this.noImageUrl}
                                   src={this.imageUrl} />
                    </a>
                    <p className="m-top-30">Follow our telegram <a href={this.contextData.tgUrl}>channel</a>!</p>
                </div>
            </div>
        );
    }
}

export default Pet;
