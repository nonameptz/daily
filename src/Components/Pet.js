import React, { Component } from 'react';
import './App.css';

class Pet extends Component {
    constructor(props, context) {
        super(props, context);
        var animal = props.value;
        this.url = '/gifs/not_found.gif';
        this.tg_url = 'tg://resolve?domain=daily_dog';
        this.title = 'Dog 🐶';
        if (animal === 'cats') {
            this.tg_url = 'tg://resolve?domain=daily_cat_gif';
            this.title = 'Cat 🐱';
        }

        if (['dogs', 'cats'].indexOf(animal) !== -1) {
            var date = new Date().toJSON().slice(0,10);
            this.url = '/gifs/' + animal + '/' + date + '.gif';
        }
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <h2 className="daily-header">Here is your Daily {this.title}</h2>
                    <a href={this.tg_url}>
                        <img src={this.url} className="daily-picture" alt="logo" />
                    </a>
                    <p>Follow our telegram <a href={this.tg_url}>channel</a>!</p>
                </header>
            </div>
        );
    }
}

export default Pet;
