import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './Header.css';

class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(animal) {
        window.location = '/' + animal;
    }

    render() {
        let dogClassName = 'dog-header';
        let catClassName = 'cat-header';
        if (this.props.location.pathname === '/dog') {
            dogClassName += ' active';
        } else if (this.props.location.pathname === '/cat') {
            catClassName += ' active';
        }
        return (
            <header>
                <nav>
                    <ul>
                        <li className={dogClassName}
                            onClick={e => this.handleClick('dog')}>🐶</li>
                        <li className={catClassName}
                            onClick={e => this.handleClick('cat')}>🐱</li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header);
