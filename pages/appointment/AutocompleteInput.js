import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from "../../AppConfigs";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from "notistack";
import { GOOGLE_MAP_API_KEY } from '../../utils/config';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => {
  return {
    noPadding: {
      padding: '0px'
    },
    smallFont: {
      fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
      fontSize: '14px',
      cursor: 'pointer'
    },
    outlinedStyle: {
      marginTop: '30px',
      '& .MuiOutlinedInput-input' : {
        padding: '9px'
      },
      '& .MuiInputLabel-outlined' : {
        marginTop: '-9px',
      },
      '& .MuiInputLabel-shrink' : {
        marginTop: '0px',
      }
    },
  }
});

const AutocompleteInput = (props) => {
  //style
  const classes = useStyles();
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
    if (type === "administrative_area_level_1" || type === "country") {
      return component ? component.short_name : '';
    }
    return component ? component.long_name : '';
  }

  const fetchPredictions = (input, erase = 1) => {
    // axios
    //   .get(`${BACKEND_URL}/shop/cart`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
    axios
      .get(
        // `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAP_API_KEY}`
        `${BACKEND_URL}/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAP_API_KEY}`
      )
      .then((response) => {
        if (erase) {
          setPredictions(response.data.predictions);
        }
        if(response.data.predictions.length === 0)
          return snackbar.enqueueSnackbar("Invalid Address", { variant: 'error' });

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
            const zip_code = findAddressComponent(addressComponents, 'postal_code');
            const phone = data.result.formatted_phone_number;

            // Log the extracted components
            props.handleAddressContainerChange({
              street,
              city,
              state,
              country,
              zip_code,
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
        className={classes.outlinedStyle}
        onChange={handleInputChange}
        placeholder="Address"
        label="Address"
        fullWidth
        variant="outlined"
        value={inputValue}
        InputProps={{
          style: {
            // Control font or other styles here
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            '::placeholder' : {
              display: 'none'
            },
          },
        }}
      />
      <ul>
        {predictions.map((prediction) => (
          <List
          key={prediction.place_id}
          classes={{
            padding	: classes.noPadding
          }}>
            <ListItem>
              <ListItemText
                classes={{
                  primary: classes.smallFont
                }}
                key={prediction.place_id}
                primary={prediction.description}
                onClick={() => {
                  setInputValue(prediction.description);
                  setPredictions([]);
                  fetchPredictions(prediction.description, 0);
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