import { useField } from 'formik';
import PropType from 'prop-types';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';
import { geocode, RequestType, setKey } from "react-geocode";
import {getCoordByAddress} from '@/helpers/utils';
import mwcConfig from '@/services/mwcConfig';

const CustomAddressInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { label, placeholder, defaultValue } = props;
    const { touched, error } = meta;
    const { setValue } = helpers;

  const handleAutoComplete = async (value) => {
    if (!value?.label) return;
    setKey(mwcConfig.gmapsApiKey);
    let newCoord = {};
    const placeIdResponse = await geocode(
      RequestType.PLACE_ID,
      value.value.place_id,
      { language: "en", region: "sp" }
    );

    const { lat, lng } = placeIdResponse.results[0].geometry.location;
    const location = {
      latitude: lat,
      longitude: lng,
      address: value.label,
      error_street_address: '',
      label: label,
    };

    setValue(location);

  };

  return (
    <div className="input-group">
      {touched && error ? (
        <span className="label-input label-error">{error?.value || error?.address}</span>
      ) : (
        <label className="label-input" htmlFor={field.name}>{label}</label>
      )}
      <GooglePlacesAutocomplete
        apiKey={mwcConfig.gmapsApiKey}
        selectProps={{
          inputId: 'gmaps-address',
          onChange: (value) => handleAutoComplete(value),
          placeholder: 'Shipping Address...',
          // isDisabled: false,
        }}
        minLengthAutocomplete={5}
      />
      <input
        type="text"
        // disabled={true}
        color='black'
        className={`input-form ${touched['address'] && errors['address'] && 'input-error'}`}
        // value={defaultValue?.address || ''}
        value={field.value?.address || ''}
        readOnly
        />
    </div>
  );
}

CustomAddressInput.defaultProps = {
  label: '* Shipping Address',
  placeholder: ''
};

CustomAddressInput.propTypes = {
  label: PropType.string,
  placeholder: PropType.string,
  defaultValue: PropType.object.isRequired
};

export default CustomAddressInput;