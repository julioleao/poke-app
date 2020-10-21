import React, { Component } from "react";
import Axios from "axios";
import Cards from "../../components/Cards";
import logo from "../../assets/logo.png";

import "./style.css";

export default class List extends Component {
  state = {
    cards: [],
    query: "",
    loading: false,
    message: "",
    cancel: "",
  };

  fetchSearchResults = (query) => {
    const url = `https://api.pokemontcg.io/v1/cards?name=${query}`;
    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = Axios.CancelToken.source();
    Axios.get(url, { cancelToken: this.cancel.token })
      .then((res) => {
        this.setState({ cards: res.data.cards });
      })
      .catch((error) => {
        if (Axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Falha ao encontrar o valor digitado",
          });
        }
      });
  };

  handleOnInputChange = (e) => {
    const query = e.target.value;
    this.setState({ query, loading: true, message: "" }, () => {
      this.fetchSearchResults(query);
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="d-flex justify-content-center mb-5 mt-5">
            <img src={logo} alt="cur" height={350} width={700} />
          </div>
          <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan mt-2">
          <i className="fa fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              placeholder="Buscar..."
              aria-label="Search"
              
              onChange={this.handleOnInputChange}
            />
          </form>
        </div>

        <div className="container-fluid">
          <div className="row mt-5">
            {this.state.cards.map((cards, index) => (
              <Cards key={index} cards={cards} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
