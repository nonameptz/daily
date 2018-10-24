import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './Header.css';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.isDog = props.location.pathname === '/dog';
        this.isCat = props.location.pathname === '/cat';
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
                        <li className={this.isDog ? 'active' : ''}
                            onClick={e => this.handleClick('dog')}>🐶</li>
                        <li className={this.isCat ? 'active' : ''}
                            onClick={e => this.handleClick('cat')}>🐱</li>
                    </ul>
                </nav>
            </header>
        )
    }
}
//onClick={e => this.handleClick('dog')}

export default withRouter(Header);
