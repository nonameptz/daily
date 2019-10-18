import React, { Component } from "react";
import axios from "axios";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./SendPet.css";

class SendPet extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pet: "dog",
      selectedDay: null,
      disabledDays: [],
      gifError: null,
      gif: ""
    };

    this.handlePetSelectorClick = this.handlePetSelectorClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.getDisabledDays = this.getDisabledDays.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getDisabledDays(this.state.pet);
  }

  handleInputChange(event) {
    const gif = event && event.target && event.target.value.toLowerCase();

    if (!gif || !gif.endsWith(".gif")) {
      this.setState({ gifError: true });
    } else {
      this.setState({ gifError: false });
    }
    this.setState({
      gif
    });
  }

  submit() {
    if (!this.state.gif || !this.state.pet || !this.state.selectedDay) {
      console.log("ERROR");
      return;
    }
    axios
      .post(`https://daily-pet.ru/scripts/add_spec_gif.php`, {
        pet: this.state.pet,
        gif: this.state.gif,
        day: this.state.selectedDay.toLocaleDateString()
      })
      .then(res => {
        console.log(res);
      });
  }

  //TODO refactor and move to service
  getSpecialGifs(pet) {
    return axios
      .get(`https://daily-pet.ru/scripts/get_spec_dates.php?pet=${pet}`)
      .then(res => {
        return res && res.data;
      });
  }

  async getDisabledDays(pet) {
    if (!pet) {
      return;
    }
    let disabledDays = [];
    let today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 2));
    const plus30days = new Date(today.setDate(today.getDate() + 30));
    const allowDays = {
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
    disabledDays.push(allowDays);

    let response = await this.getSpecialGifs(pet);

    //new Date(2017, 3, 12)
    response.forEach(date => {
      let fullDate = date.split("-");
      disabledDays.push(
        new Date(fullDate[0], parseInt(fullDate[1]) - 1, fullDate[2])
      );
    });

    this.setState({ disabledDays });
  }

  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      selectedDay: modifiers.selected ? undefined : day
    });
  }

  handlePetSelectorClick(pet) {
    var elems = document.querySelectorAll(".pet-selector.active");

    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    document.getElementById(pet + "-selector").classList.add("active");
    this.setState({
      pet,
      selectedDay: null
    });
    this.getDisabledDays(pet);
  }

  render() {
    return (
      <div className="main-content active-send">
        <h2 className="send-header">
          Send a Pet!<sup>beta</sup>
        </h2>
        <div className="send-content">
          <form>
            <p className="top-text">I want to send a funny</p>
            <div className="form-group form-selector">
              <div
                className="pet-selector active"
                id="dog-selector"
                role="button"
                tabIndex="0"
                onClick={() => this.handlePetSelectorClick("dog")}
              >
                Dog
              </div>
              <span>or</span>
              <div
                className="pet-selector"
                id="cat-selector"
                role="button"
                tabIndex="0"
                onClick={() => this.handlePetSelectorClick("cat")}
              >
                Cat
              </div>
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
              tabIndex="0"
              onChange={this.handleInputChange}
            />
            <p>and I want to see it on:</p>
            <DayPicker
              disabledDays={this.state.disabledDays}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}
              firstDayOfWeek={1}
            />
            <div className="submit-wrapper">
              <div
                role="button"
                className={
                  "submit-button " +
                  (this.state.selectedDay && this.state.gifError === false
                    ? "active"
                    : "")
                }
                tabIndex="0"
                onClick={() => this.submit()}
              >
                Yes yes please!
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SendPet;
