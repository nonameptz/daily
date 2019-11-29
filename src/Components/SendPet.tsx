import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import axios from "axios";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./SendPet.css";
import Modal from './Modal';

class SendPet extends Component<RouteComponentProps> {
  public state = {
    pet: "dog",
    selectedDay: {} as Date,
    disabledDays: [],
    gifError: null,
    gif: "",
    resultMsg: ""
  };

  public componentDidMount() {
    this.updateDisabledDays(this.state.pet);
  }

  public handleInputChange = (event: React.SyntheticEvent) => {
    const target = event && event.target as HTMLInputElement;
    const gif =  target.value;

    if (!gif || !gif.toLowerCase().endsWith(".gif")) {
      this.setState({ gifError: true });
    } else {
      this.setState({ gifError: false });
    }
    this.setState({
      gif
    });
  };

  public submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!this.state.gif || !this.state.pet || !this.state.selectedDay) {
      return;
    }
    const reply = this.state.pet === 'dog' ? 'Afff!' : 'Meow!';
    let resultMsg = '';
    axios
      .post(`https://daily-pet.ru/scripts/add_spec_gif.php`, {
        pet: this.state.pet,
        gif: this.state.gif,
        day: this.state.selectedDay.toLocaleDateString()
      })
      .then(res => {
        if (res.data === 'success') {
          resultMsg = 'Success! Page will be reloaded in a while. ' + reply;
        } else {
          resultMsg = 'Error! :( Page will be reloaded in a while. ' + reply;
        }
        this.setState({ resultMsg });
        setTimeout(() => {
          document.location.reload(true);
        }, 3000)
      });
  };

  // TODO refactor and move to service
  public getSpecialGifs = (pet: string) => {
    return axios
      .get(`https://daily-pet.ru/scripts/get_spec_dates.php?pet=${pet}`)
      .then(res => {
        return res && res.data;
      });
  };

  private getAllowedDays = () => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 2));
    const plus30days = new Date(today.setDate(today.getDate() + 30));
    const allowedDays = {
      before: new Date(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate()
      ),
      after: new Date(
        plus30days.getFullYear(),
        plus30days.getMonth(),
        plus30days.getDate()
      )
    };

    return new Promise((resolve, reject) => {
      allowedDays ? resolve(allowedDays) : reject('Error');
    })
  };

  private updateDisabledDays = async (pet: string) => {
    if (!pet) {
      return;
    }
    const disabledDays = [] as any;
    this.getAllowedDays()
      .then((allowDays => {
        disabledDays.push(allowDays);
      }))
      .catch(error => console.log('There was an error: ' + error));

    const response = await this.getSpecialGifs(pet);

    response.forEach((date: string) => {
      const fullDate: string[] = date.split("-");
      disabledDays.push(
        new Date(+fullDate[0], +(fullDate[1]) - 1, +fullDate[2])
      );
    });

    this.setState({ disabledDays });
  };

  public handleDayClick = (
      day: Date,
      modifiers: DayModifiers
    ) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      selectedDay: modifiers.selected ? undefined : day
    });
  };

  public handlePetSelectorClick = (event: React.SyntheticEvent, pet: string) => {
    event.preventDefault();
    const elems = document.querySelectorAll(".pet-selector.active");

    [].forEach.call(elems, (el: HTMLInputElement) => {
      el.classList.remove("active");
    });
    const petSelector = document.getElementById(pet + "-selector");
    if (petSelector) {
      petSelector.classList.add("active");
    }
    this.setState({
      pet,
      selectedDay: null
    });
    this.updateDisabledDays(pet);
  };

  public render() {
    return (
      <div className="main-content active-send">
        <h2 className="send-header">
          Send a Pet!<sup>beta</sup>
        </h2>
        <div className="send-content">
          <form>
            <p className="top-text">I want to send a funny</p>
            <div className="form-group form-selector">
              <button
                className="pet-selector active"
                id="dog-selector"
                onClick={(e) => this.handlePetSelectorClick(e, "dog")}
              >
                Dog
              </button>
              <span>or</span>
              <button
                className="pet-selector"
                id="cat-selector"
                onClick={(e) => this.handlePetSelectorClick(e, "cat")}
              >
                Cat
              </button>
            </div>
            <p>and here is my gif url:</p>
            <input
              type="text"
              className={
                "send-input" +
                (this.state.gifError ? " error" : "") +
                (this.state.gif && !this.state.gifError ? " success" : "")
              }
              value={this.state.gif}
              onChange={this.handleInputChange}
            />
            <p>and I want to see it on:</p>
            <DayPicker
              disabledDays={this.state.disabledDays}
              selectedDays={this.state.selectedDay}
              onDayClick={(day, modifires) => this.handleDayClick(day, modifires)}
              firstDayOfWeek={1}
            />
            <div className="submit-wrapper">
              {!this.state.resultMsg &&
              <button
                className={
                  "submit-button " +
                  (this.state.selectedDay && this.state.gifError === false
                    ? "active"
                    : "")
                }
                onClick={(e) => this.submit(e)}
              >
                Yes yes please!
              </button>
              }
              {this.state.resultMsg &&
              <Modal>
                <div className="resultMsg">
                  {this.state.resultMsg}
                </div>
              </Modal>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SendPet;
