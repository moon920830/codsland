import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from "../../../AppConfigs";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

const AutocompleteInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      fetchPredictions(e.target.value);
    } else {
      setPredictions([]);
    }
  };

  function findAddressComponent(addressComponents, type) {
    const component = addressComponents.find((component) => component.types.includes(type));
    return component ? component.long_name : '';
  }

  const fetchPredictions = (input) => {
    // axios
    //   .get(`${BACKEND_URL}/shop/cart`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
    axios
      .get(
        // `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyD8AFOPal_mqvfiuPxwvML-kg_SdZBK9s0`
        `${BACKEND_URL}/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyD8AFOPal_mqvfiuPxwvML-kg_SdZBK9s0`
      )
      .then((response) => {
        setPredictions(response.data.predictions);

        const placeId = response.data.predictions[0].place_id;
        axios
          .get(
            `${BACKEND_URL}/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyD8AFOPal_mqvfiuPxwvML-kg_SdZBK9s0`
          )
          .then((res) => {
            const data = res.data;
            const addressComponents = data.result.address_components;
            // Find the specific components you need
            const street = findAddressComponent(addressComponents, 'route');
            const city = findAddressComponent(addressComponents, 'locality');
            const state = findAddressComponent(addressComponents, 'administrative_area_level_1');
            const country = findAddressComponent(addressComponents, 'country');
            const phone = data.result.formatted_phone_number;

            // Log the extracted components
            props.handleAddressContainerChange({
              street,
              city,
              state,
              country
            });
            // console.log('Street:', street);
            // console.log('City:', city);
            // console.log('State:', state);
            // console.log('Country:', country);
            // console.log('Phone:', phone);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <TextField
        className={props.outlinedStyle}
        onChange={handleInputChange}
        placeholder="Address"
        fullWidth
        variant="outlined"
        value={inputValue}
        InputProps={{
          style: {
            // Control font or other styles here
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            marginTop: '30px',
            '::placeholder' : {
              display: 'none'
            },
          },
        }}
      />
      <ul>
        {predictions.map((prediction) => (
          // <li key={prediction.place_id}>{prediction.description}</li>
          <List
          classes={{
            padding	: props.noPadding
          }}>
            <ListItem>
              <ListItemText
                classes={{
                  primary: props.smallFont
                }}
                key={prediction.place_id}
                primary={prediction.description}
                onClick={() => {
                  setInputValue(prediction.description);
                  setPredictions([]);
                }}
                // secondary={prediction.description}
              />
            </ListItem>
          </List>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteInput;