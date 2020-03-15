import React from "react";
import PropTypes from "prop-types";
import BForm from "react-bootstrap/lib/Form";
import FormGroup from "./FormGroup";
import FormControl from "./FormControl";

export default class Form extends React.Component {
  static propTypes = {
    allowAutoComplete: PropTypes.bool
  };

  static defaultProps = {
    allowAutoComplete: false
  };

  render() {
    let props = { ...this.props };

    delete props.allowAutoComplete;

    if (!props.allowAutoComplete) {
      return (
        <BForm {...props} autoComplete="off">
          <div style={{ height: 0, visibility: "hidden" }}>
            <FormGroup>
              <FormControl name="__test__" type="text" />
            </FormGroup>
            <FormGroup>
              <FormControl name="__testemail__" type="email" />
            </FormGroup>
            <FormGroup>
              <FormControl type="__password__" />
            </FormGroup>
          </div>
          {this.props.children}
        </BForm>
      );
    }

    return <BForm {...props} />;
  }
}
