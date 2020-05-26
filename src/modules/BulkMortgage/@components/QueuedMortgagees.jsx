import React from 'react';
import { Button } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import QueuedMortgageeCard from './QueuedMortgageeCard';
import MortgageeCard from './MortgageeCard';

const QueuedMortgagees = ({
  queuedMortgagees,
  removeFromQueue,
  removeAllFromQueue
}) => {
  return (
    <React.Fragment>
      <div className="queue-header">
        <div className="title">
          Queued For Update&nbsp;
          <span className="queue-count">
            ({queuedMortgagees.length} queued)
          </span>
        </div>
        {queuedMortgagees.length > 0 && (
          <Button
            dataTest="queue-mortgagee"
            size={BUTTON_SIZE.small}
            className={BUTTON_CLASS.link}
            type="button"
            onClick={removeAllFromQueue}
          >
            <i className="fa fa-remove" />
            Remove All
          </Button>
        )}
      </div>
      <section className="policy-list">
        {queuedMortgagees.map(m => {
          return (
            <QueuedMortgageeCard
              key={`${m._id}_${m.policyNumber}`}
              result={m}
              handleRemove={() => removeFromQueue(m)}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
};

export default QueuedMortgagees;
