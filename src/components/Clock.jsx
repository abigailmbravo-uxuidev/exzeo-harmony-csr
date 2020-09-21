import React from 'react';
import { moment, DEFAULT_TIME_ZONE } from '@exzeo/core-ui';

const Clock = ({ timezone }) => {
  const [date, setDate] = React.useState(moment().tz(timezone));

  React.useEffect(() => {
    const timeId = setInterval(() => setDate(moment().tz(timezone)), 1000);
    return function cleanup() {
      clearInterval(timeId);
    };
  });

  return date.toLocaleTimeString();
};

Clock.defaultProps = {
  timezone: DEFAULT_TIME_ZONE
};

export default Clock;
