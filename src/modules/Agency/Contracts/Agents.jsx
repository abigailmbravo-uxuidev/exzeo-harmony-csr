import React from 'react';
import { Field } from 'redux-form';

const Agents = (props) => {
  const {
    fields, agent, handleRemoveAgent, primaryAgentCode
  } = props;
  return (
    <ul className="contract-agent-list">
      {/* list headers */}
      <li className="header">
        <span className="agent-name label">Agent Name</span>
        <span className="appointed label">Appointed</span>
        <span className="aor label">AOR</span>
        <span className="actions label" />
      </li>
      {/* LOOP OF AGENTS ASSIGNED TO CONTRACT */}
      {/* Agent 1 */}
      {fields.map((a, index) =>
         (
           <li className="agent-detail" key={agent[index].agentCode}>
             <span className="agent-name display">{`${agent[index].agentInfo.firstName} ${agent[index].agentInfo.lastName}`}</span>
             <span className="appointed display">
               <Field
                 name={`${a}.appointed`}
                 data-test={`${a}.appointed`}
                 id="appointed"
                 component="input"
                 type="checkbox" />
             </span>
             <span className="aor display">
               <Field
                 name={`${a}.agentOfRecord`}
                 data-test={`${a}.agentOfRecord`}
                 id="agentOfRecord"
                 component="input"
                 type="checkbox" />
             </span>
             <span className="actions display">
               {primaryAgentCode !== agent[index].agentCode && <button tabIndex="0" className="btn btn-link btn-sm" onClick={() => handleRemoveAgent(index)}><i className="fa fa-times-rectangle" />Remove</button>}
             </span>
           </li>))
      }
    </ul>);
};

export default Agents;
