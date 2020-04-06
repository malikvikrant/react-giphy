import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGiphy } from "../../action/giphyAction";
import Loading from "../loading/Loading.jsx";
import Error from "../error/Error.jsx";
import "./giphy.css";

class Giphy extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.refs.scroller) {
      this.refs.scroller.addEventListener("scroll", () => {
        if (
          this.refs.scroller.scrollTop + this.refs.scroller.clientHeight >=
          this.refs.scroller.scrollHeight
        ) {
          this.props.fetchGiphy();
        }
      });
    }
  }

  handleChange(event) {
    const searchString = event.target.value;
    this.props.fetchGiphy(true, searchString);
  }
  render() {
    const gifs = this.props.giphy.giphyObject.gifs;
    const isFetching = this.props.giphy.isFetching;
    const isError = this.props.giphy.isError;
    return (
      <div className="container">
        <div className="sub-container">
          <div className="search">
            <input
              className="search-field"
              type="text"
              placeholder="Type here to search gifs"
              value={this.props.giphy.searchText}
              onChange={this.handleChange}
            />
          </div>
          {isFetching && <Loading />}
          <div className="gif-container" ref="scroller">
            {!isError ? (
              gifs.map((gif) => (
                <img className="img-container" key={gif.id} src={gif.url} />
              ))
            ) : (
              <Error />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    giphy: state.giphy,
  };
};

const mapDispatchToProps = {
  fetchGiphy: (isSearchStringChanged, inputText) =>
    fetchGiphy(isSearchStringChanged, inputText),
};

export default connect(mapStateToProps, mapDispatchToProps)(Giphy);
