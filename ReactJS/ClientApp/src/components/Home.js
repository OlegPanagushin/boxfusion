import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import RegionSelect from "./RegionSelect";

const styles = {
  form: {
    maxWidth: 500,
    margin: "40px auto"
  },
  formControl: {
    width: "100%"
  },
  submit: {
    marginRight: 0,
    marginLeft: "auto",
    display: "block"
  }
};

const forbiddenCountries = ["aw", "in"];

class Home extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    region: PropTypes.string
  };

  state = {
    open: false
  };

  handleClickButton = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  validateRegionSelect = (country, region) => {
    if (forbiddenCountries.includes(country)) return "Select another country";
  };

  render() {
    const { classes, region = "" } = this.props;

    return (
      <form className={classes.form} autoComplete="off">
        <Typography variant="title" gutterBottom>
          Select Region
        </Typography>
        <FormControl className={classes.formControl}>
          <RegionSelect required customValidation={this.validateRegionSelect} />
        </FormControl>
        <Button
          variant="contained"
          className={classes.submit}
          onClick={this.handleClickButton}
          disabled={region === ""}
        >
          Submit
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{"Thank You"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Selected value: {region}</DialogContentText>
          </DialogContent>
        </Dialog>
      </form>
    );
  }
}

export default connect(state => ({
  country: state.region.selectedCountry,
  region: state.region.selectedRegion
}))(withStyles(styles)(Home));
