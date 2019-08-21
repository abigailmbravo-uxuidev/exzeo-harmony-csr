import React from 'react';
import GoToMenu from '../../components/Policy/Endorsements/GoToMenu';

const Endorsements = ({ customHandlers, initialValues }) => {
  const {
    policyHolders,
    policyHolderMailingAddress,
    policyNumber
  } = initialValues;
  return (
    <React.Fragment>
      <GoToMenu />
    </React.Fragment>
  );
};

export default Endorsements;
