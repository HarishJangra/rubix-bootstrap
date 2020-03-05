import React from "react";
import PropTypes from "prop-types";
import RSplitButton from "./RSplitButton";

import { DropdownButtonHOC } from "./DropdownButton";

@DropdownButtonHOC
export default class SplitButton extends React.Component {
  render() {
    return <RSplitButton {...this.props.buttonProps} />;
  }
}
