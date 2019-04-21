import React from 'react';    import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import SplitToggle from 'react-bootstrap/lib/SplitToggle';
import omit from 'lodash-compat/object/omit';
import pick from 'lodash-compat/object/pick';

class SplitButton extends React.Component {

  render() {
    let {
      children,
      title,
      onClick,
      target,
      href,
      toggleLabel,
      bsSize,
      bsStyle,
      ...props } = this.props;

    let { disabled } = props;

    let dropdownProps = pick(props, Object.keys(Dropdown.ControlledComponent.propTypes));
    let buttonProps = omit(props, Object.keys(Dropdown.ControlledComponent.propTypes));

    return (
      <Dropdown {...dropdownProps}>
        <Button
          {...buttonProps}
          onClick={onClick}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={disabled}
          target={target}
          href={href}
        >
          {title}
        </Button>
        <SplitToggle
          {...buttonProps}
          aria-label={toggleLabel || title}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={disabled}
        />
        <Dropdown.Menu>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SplitButton.propTypes = {
  ...Dropdown.propTypes,
  bsStyle: Button.propTypes.bsStyle,

  /**
   * @private
   */
  onClick() {},
  target: PropTypes.string,
  href: PropTypes.string,
  /**
   * The content of the split button.
   */
  title: PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: PropTypes.string
};

SplitButton.defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

SplitButton.Toggle = SplitToggle;

export default SplitButton;
