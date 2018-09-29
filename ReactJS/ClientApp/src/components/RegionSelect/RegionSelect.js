import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "./styles";
import { actionCreators } from "../RegionSelect/reducer";

class RegionSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    regions: PropTypes.array.isRequired,
    selectedCountry: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    countriesLoading: PropTypes.bool.isRequired,
    regionsLoading: PropTypes.bool.isRequired,
    lookingForCountry: PropTypes.bool.isRequired,
    getCountries: PropTypes.func.isRequired,
    selectCountry: PropTypes.func.isRequired,
    selectRegion: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    customValidation: PropTypes.func
  };

  componentDidMount() {
    this.props.getCountries();
  }

  countrySelectHandler = e => {
    const country = e.target.value;
    this.props.validate(country, this.props.selectedRegion);
    this.props.selectCountry(country);
  };

  regionSelectHandler = e => {
    const region = e.target.value;
    this.props.validate(this.props.selectCountry, region);
    this.props.selectRegion(region);
  };

  render() {
    const {
      selectedCountry = "",
      selectedRegion = "",
      errorMessage = "",
      countries,
      regions,
      classes,
      required
    } = this.props;

    return (
      <React.Fragment>
        <FormControl
          className={classes.formControl}
          error={errorMessage !== ""}
          required={required === true}
        >
          <InputLabel htmlFor="country-select">Country</InputLabel>
          <Select
            value={selectedCountry}
            onChange={this.countrySelectHandler}
            name="country"
            input={<Input id="country-select" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {countries.map(country => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText />
        </FormControl>
        <FormControl
          className={classes.formControl}
          error={errorMessage !== ""}
          required={required === true}
        >
          <InputLabel htmlFor="region-select">Region</InputLabel>
          <Select
            value={selectedRegion}
            onChange={this.regionSelectHandler}
            name="region"
            input={<Input id="region-select" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {regions.map(region => (
              <MenuItem key={region.region} value={region.region}>
                {region.region}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({ ...state.region }),
  (dispatch, ownProps) => {
    var {
      validate,
      getCountries,
      selectCountry,
      selectRegion
    } = actionCreators;

    return {
      validate: (country, region) =>
        dispatch(
          validate(
            ownProps.required,
            ownProps.customValidation,
            country,
            region
          )
        ),
      getCountries: () => dispatch(getCountries()),
      selectCountry: country => dispatch(selectCountry(country)),
      selectRegion: region => dispatch(selectRegion(region))
    };
  }
)(withStyles(styles)(RegionSelect));
