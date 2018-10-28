import React, { Component } from 'react';
import './App.css';
import './Privacy.css';

class NotFound extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <h2 className="privacy-header">Privacy Policy</h2>
                    <div className="privacy-data">
                        <p>We don't store any of your data.</p>
                        <p>We physically can’t. We have nowhere to store it.
                            We don’t even have a server database to store it.</p>
                        <p>So even if Justin Bieber asked nicely to see your data,
                            we wouldn’t have anything to show him.</p>
                    </div>
                    <img src="https://daily-pet.ru/gifs/privacy.gif" className="privacy-picture" alt="logo" />
                </header>
            </div>
        );
    }
}

export default NotFound;
