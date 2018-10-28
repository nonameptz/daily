import React, { Component } from 'react';
import './App.css';

class NotFound extends Component {
    constructor(props) {
        super(props);
        var animals = ['cats', 'dogs'];
        var animal = animals[Math.floor(Math.random() * animals.length)];
        this.url = '/gifs/' + animal + '/_not_found.gif';
        // for localhost only
        // this.url = 'https://daily-pet.ru' + this.url;
    }
    render() {
        return (
            <div>
                <header className="app-header">
                    <h2 className="daily-header">Page not found :[</h2>
                    <a href="tg://resolve?domain=daily_dog">
                        <img src={this.url} className="daily-picture" alt="logo" />
                    </a>
                    <p>Follow our telegram <a href="tg://resolve?domain=daily_dog">channel</a>!</p>
                </header>
            </div>
        );
    }
}

export default NotFound;
