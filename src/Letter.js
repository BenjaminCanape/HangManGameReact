import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

/*
 * Component Letter: It will display a simple button which will allow to execute a function onClick
 * The props needed are:
 * value: the text of the button
 * disabled: the property disabled of the button
 * onClick: the function executed onClick
 */

const Letter = ({ value, disabled, onClick }) => (
  <Button className="letterButton" disabled={disabled(value)} onClick={() => onClick(value)}>
    {value}
  </Button>
);

Letter.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Letter;
