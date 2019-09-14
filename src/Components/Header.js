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
        let sendClassName = 'send-header';
        let privacyClassName = 'privacy-header';
        switch (this.props.location.pathname) {
            case '/dog':
                dogClassName += ' active';
                break;
            case '/cat':
                catClassName += ' active';
                break;
            case '/send':
                sendClassName += ' active';
                break;
            case '/privacy':
                privacyClassName += ' active';
                break;
            default:
                break;
        }
        return (
            <header>
                <nav>
                    <ul>
                        <li className={dogClassName}
                            onClick={e => this.handleClick('dog')}>
                            <span role="img"
                                  aria-label="dog">🐶</span>
                        </li>
                        <li className={catClassName}
                            onClick={e => this.handleClick('cat')}>
                            <span role="img"
                                  aria-label="cat">🐱</span>
                        </li>
                        <li className={sendClassName}
                            onClick={e => this.handleClick('send')}>
                            <span role="img"
                                  aria-label="send">💜</span>
                        </li>
                        <li className={privacyClassName}
                            onClick={e => this.handleClick('privacy')}>
                            <span role="img"
                                  aria-label="privacy">🗄️</span>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header);
