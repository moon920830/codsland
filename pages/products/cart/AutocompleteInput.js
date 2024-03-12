import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from "../../../AppConfigs";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from "notistack";
import GOOGLE_MAP_API_KEY from '../../../utils/config';

const AutocompleteInput = (props) => {
  //snackbar
  const snackbar = useSnackbar();
  //state
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
        // `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAP_API_KEY}`
        `${BACKEND_URL}/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAP_API_KEY}`
      )
      .then((response) => {
        setPredictions(response.data.predictions);
        if(response.data.predictions.length === 0)
          return snackbar.enqueueSnackbar("Invalid Address"+GOOGLE_MAP_API_KEY, { variant: "error" });

        const placeId = response.data.predictions[0].place_id;
        axios
          .get(
            `${BACKEND_URL}/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAP_API_KEY}`
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
            console.log(addressComponents);

            // Log the extracted components
            props.handleAddressContainerChange({
              street,
              city,
              state,
              country,
              address: input,
            });
          })
          .catch((error) => {
            return snackbar.enqueueSnackbar(error, { variant: "error" });
          });
      })
      .catch((error) => {
        return snackbar.enqueueSnackbar(error, { variant: "error" });
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
              />
            </ListItem>
          </List>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteInput;