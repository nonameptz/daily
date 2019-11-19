import React, { Component } from "react";
import "./App.css";
import PetService from "../Service/PetService";

class NotFound extends Component {
  constructor(props) {
    super(props);
    var animals = ["cat", "dog"];
    var animal = animals[Math.floor(Math.random() * animals.length)];
    this.no_image_url = PetService.getNoImageUrl(animal);
    this.context_data = PetService.getContextData(animal);
  }
  render() {
    return (
      <div>
        <header className="app-header">
          <h2 className="daily-header">Page not found :[</h2>
          <a href={this.context_data.tg_url}>
            <img src={this.no_image_url} className="daily-picture" alt="logo" />
          </a>
          <p>
            Follow our telegram <a href={this.context_data.tg_url}>channel</a>!
          </p>
        </header>
      </div>
    );
  }
}

export default NotFound;
