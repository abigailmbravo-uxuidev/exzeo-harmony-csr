import React from 'react';
import { Button } from '@exzeo/core-ui/src';

const scrollToView = elementName => {
  const element = document.getElementById(elementName);
  if (element) {
    element.scrollIntoView(true);
  }
};

const GoToMenu = props => {
  const {
    config: {
      extendedProperties: { links }
    }
  } = props;
  return (
    <div className="endo-jump-menu">
      {Array.isArray(links) &&
        links.map(link => (
          <Button
            onClick={() => scrollToView(link.id)}
            className="btn btn-xs btn-link"
          >
            {link.label}
          </Button>
        ))}
    </div>
  );
};

GoToMenu.propTypes = {};

GoToMenu.defaultProps = {};

export default GoToMenu;
