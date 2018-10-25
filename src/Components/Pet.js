import React, { Component } from 'react';
import './App.css';
import LazyImage from './LazyImage'

class Pet extends Component {
    constructor(props, context) {
        super(props, context);
        var animal = props.value;
        this.no_image_url = '/gifs/' + animal + '/_not_found.gif';
        this.tg_url = 'tg://resolve?domain=daily_dog';
        this.title = 'Dog 🐶';
        if (animal === 'cats') {
            this.tg_url = 'tg://resolve?domain=daily_cat_gif';
            this.title = 'Cat 🐱';
        }

        if (['dogs', 'cats'].indexOf(animal) !== -1) {
            var utc = new Date().getTime();
            // 00:00 in PST timezone - is a time for new animal (it's UTC-7)
            var pst = new Date(utc - (3600000 * 7)).toJSON();
            var date = pst.slice(0,10);
            this.image_url = '/gifs/' + animal + '/' + date + '.gif';
        }
        // for localhost only
        // this.no_image_url = 'https://daily-pet.ru/' + this.no_image_url;
        this.image_url = 'https://daily-pet.ru/' + this.image_url;
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <h2 className="daily-header">Here is your Daily {this.title}</h2>
                    <a href={this.tg_url}>
                        <LazyImage className="daily-picture"
                                   unloadedSrc={this.no_image_url}
                                   src={this.image_url} />
                    </a>
                    <p>Follow our telegram <a href={this.tg_url}>channel</a>!</p>
                </header>
            </div>
        );
    }
}

export default Pet;
