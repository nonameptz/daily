import React, { Component } from 'react';
import './App.css';

class NotFound extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <h2 className="daily-header">Page not found :[</h2>
                    <a href="tg://resolve?domain=daily_dog">
                        <img src="/gifs/not_found.gif" className="daily-picture" alt="logo" />
                    </a>
                    <p>Follow our telegram <a href="tg://resolve?domain=daily_dog">channel</a>!</p>
                </header>
            </div>
        );
    }
}

export default NotFound;
