import React from 'react';
import { Button } from '@exzeo/core-ui/src';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';

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
            key={link.id}
            dataTest={link.id}
            onClick={() => scrollToView(link.id)}
            className={BUTTON_CLASS.link}
            size={BUTTON_SIZE.xsmall}
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
