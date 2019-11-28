import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import "./App.css";
import PetService from "../Service/PetService";

class NotFound extends Component<RouteComponentProps> {
  public state = {
    noImageUrl: '',
    contextData: {
      tgUrl: ''
    }
  };
  public componentDidMount() {
    const animal = ["cat", "dog"][Math.floor(Math.random() * 2)];
    this.setState({
      noImageUrl: PetService.getNoImageUrl(animal),
      contextData: PetService.getContextData(animal)
    });
  }
  public render() {
    return (
      <div>
        <header className="app-header">
          <h2 className="daily-header">Page not found :[</h2>
          <a href={this.state.contextData.tgUrl}>
            <img src={this.state.noImageUrl} className="daily-picture" alt="logo" />
          </a>
          <p>
            Follow our telegram <a href={this.state.contextData.tgUrl}>channel</a>!
          </p>
        </header>
      </div>
    );
  }
}

export default NotFound;
