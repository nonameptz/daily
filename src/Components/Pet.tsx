import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import "./App.css";
import LazyImage from "./LazyImage";
import PetService from "../Service/PetService";
import NotFound from "./NotFound";

class Pet extends Component<RouteComponentProps<{ pet: string }>> {
  public state = {
    noImageUrl: '',
    contextData: {
      title: '' as string,
      tgUrl: '' as string,
    },
    imageUrl: '',
  };

  public componentWillMount() {
    if (!this.props.pet) {
      return;
    }
    this.initializePet(this.props.pet);
  }

  public initializePet = (animal: string) => {
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

  public componentDidUpdate(prevProps: RouteComponentProps<{ pet: string }>) {
    if (this.props.pet && this.props.pet !== prevProps.pet) {
      this.initializePet(this.props.pet);
    }
  }

  public render() {
    const mainContentClassName = "main-content active-" + this.props.pet;
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
                  alt="daily image"
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
