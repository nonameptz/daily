import React, { Component } from "react";
import "./App.css";
import LazyImage from "./LazyImage";
import PetService from "../Service/PetService";
import NotFound from "./NotFound";

class Pet extends Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.state = {
      noImageUrl: '',
      contextData: {},
      imageUrl: '',
    };
  }

  componentWillMount() {
      this.initializePet(this.props.pet);
  }

  initializePet = animal => {
    let imageUrl = '';
    if (["dog", "cat"].indexOf(animal) !== -1) {
      imageUrl = PetService.getImageUrl(animal);
    }
    this.setState({
      noImageUrl: PetService.getNoImageUrl(animal),
      contextData: PetService.getContextData(animal),
      imageUrl,
    })
  };

  componentDidUpdate(prevProps) {
    if (this.props.pet !== prevProps.pet) {
      this.initializePet(this.props.pet);
    }
  }

  render() {
    let mainContentClassName = "main-content active-" + this.props.pet;
    return (
      <div className={mainContentClassName}>
        {this.state.imageUrl &&
          <div>
            <h2 className="daily-header">
              Here is your Daily {this.state.contextData.title}
            </h2>
            <a href={this.state.contextData.tgUrl}>
                <LazyImage
                  className="daily-picture"
                  noImageSrc={this.state.noImageUrl}
                  src={this.state.imageUrl}
                />
            </a>
            <p className="m-top-30">
              Follow our telegram <a href={this.state.contextData.tgUrl}>channel</a>!
            </p>
          </div>
        }
        {this.state.imageUrl === '' &&
          <NotFound />
        }
      </div>
    );
  }
}

export default Pet;
