import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(animal) {
        window.location = '/' + animal;
    }

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li onClick={e => this.handleClick('dog')}>🐶</li>
                        <li onClick={e => this.handleClick('cat')}>🐱</li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header
