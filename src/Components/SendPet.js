import React, { Component } from "react";
import axios from "axios";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./SendPet.css";
import Modal from './Modal';

class SendPet extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pet: "dog",
      selectedDay: null,
      disabledDays: [],
      gifError: null,
      gif: "",
      resultMsg: ""
    };
  }

  componentDidMount() {
    this.getDisabledDays(this.state.pet);
  }

  handleInputChange = event => {
    const gif = event && event.target && event.target.value;

    if (!gif || !gif.toLowerCase().endsWith(".gif")) {
      this.setState({ gifError: true });
    } else {
      this.setState({ gifError: false });
    }
    this.setState({
      gif
    });
  };

  submit = event => {
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

  //TODO refactor and move to service
  getSpecialGifs = pet => {
    return axios
      .get(`https://daily-pet.ru/scripts/get_spec_dates.php?pet=${pet}`)
      .then(res => {
        return res && res.data;
      });
  };

  getDisabledDays = async pet => {
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
        new Date(fullDate[0], +(fullDate[1]) - 1, fullDate[2])
      );
    });

    this.setState({ disabledDays });
  };

  handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      selectedDay: modifiers.selected ? undefined : day
    });
  };

  handlePetSelectorClick = (event, pet) => {
    event.preventDefault();
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
  };

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
              <button
                className="pet-selector active"
                id="dog-selector"
                tabIndex="0"
                onClick={(e) => this.handlePetSelectorClick(e, "dog")}
              >
                Dog
              </button>
              <span>or</span>
              <button
                className="pet-selector"
                id="cat-selector"
                tabIndex="0"
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
              {!this.state.resultMsg &&
              <button
                className={
                  "submit-button " +
                  (this.state.selectedDay && this.state.gifError === false
                    ? "active"
                    : "")
                }
                tabIndex="0"
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
