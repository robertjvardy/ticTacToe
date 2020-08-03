import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import "./styles.scss";

const Cell = ({ value, classes, handleClick }) => {
  var iconName;
  var className;
  if (value === "x") {
    iconName = "times";
    className = classNames("cell", "icon", classes);
  } else if (value === "o") {
    iconName = ["far", "circle"];
    className = classNames("cell", "icon", classes);
  } else {
    iconName = "times";
    className = classNames("cell", "icon", "empty", classes);
  }

  return (
    <FontAwesomeIcon
      icon={iconName}
      className={className}
      onClick={() => handleClick()}
    />
  );
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Cell;
