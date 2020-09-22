import React from 'react';
import { date } from '@exzeo/core-ui';

const Clock = ({ timezone, format }) => {
  const getTime = () => date.moment.tz(undefined, timezone).format(format);
  const [dateString, setDateString] = React.useState(getTime());
  React.useEffect(() => {
    const timeId = setInterval(() => setDateString(getTime()), 1000);
    return function cleanup() {
      clearInterval(timeId);
    };
  });

  return dateString;
};

Clock.defaultProps = {
  timezone: date.DEFAULT_TIME_ZONE,
  format: 'h:mm A zz'
};

export default Clock;
