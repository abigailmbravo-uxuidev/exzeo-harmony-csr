import React from 'react';
import { date } from '@exzeo/core-ui';

const Clock = ({ timezone = date.DEFAULT_TIME_ZONE, format = 'h:mm A zz' }) => {
  const getTime = () => date.formattedDate(undefined, format, timezone);
  const [dateString, setDateString] = React.useState(getTime());
  React.useEffect(() => {
    const timeId = setInterval(() => setDateString(getTime()), 1000);
    return function cleanup() {
      clearInterval(timeId);
    };
  });

  return (
    <div className="property-time-wrapper">
      <label>Property Time</label>
      {dateString}
    </div>
  );
};

export default Clock;
