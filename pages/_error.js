import React, { Component } from "react";
import Router from "next/router";

export default class _error extends Component {
  static getInitialProps({ res, err }) {
    // Check if there is an error message
    const message = err ? err.message : 'An error occurred';

    // Return the error message as a prop
    return { message };
  }
  
  componentDidMount = () => {
    
    // Router.push("/components");
  };

  render() {
    const { message } = this.props;
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
}
