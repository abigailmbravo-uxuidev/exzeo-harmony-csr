import React from 'react';

export const PolicyWorkflowContext = React.createContext();

export function PolicyWorkflowProvider({
  children,
  setAppError,
  getPolicy,
  updateBillPlan,
  transferAOR
}) {
  return (
    <PolicyWorkflowContext.Provider
      value={{
        setAppError,
        getPolicy,
        updateBillPlan,
        transferAOR
      }}
      children={children}
    />
  );
}

export function usePolicyWorkflow() {
  const context = React.useContext(PolicyWorkflowContext);
  if (context === undefined) {
    throw new Error(
      `usePolicyWorkflow must be used within a PolicyWorkflowProvider`
    );
  }

  return context;
}
