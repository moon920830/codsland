import React, { Component } from 'react';
import { GoogleApiWrapper, Autocomplete } from 'google-maps-react';
class AddressAutocomplete extends Component {
  render() {
    return (
      <div>
        <Autocomplete
          placeholder="Enter your address"
          onPlaceSelected={this.handlePlaceSelect}
          types={['address']}
        />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9u-pX_jq4SzP8OMztxNqxYKTAIyk5KZQ',
})(AddressAutocomplete);