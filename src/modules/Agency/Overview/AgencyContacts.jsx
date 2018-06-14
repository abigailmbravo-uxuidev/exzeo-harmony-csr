import React from 'react';
import { normalizePhone } from '@exzeo/core-ui/lib/InputLifecycle';
import ContactCard from './ContactCard';

export const AgencyContacts = ({ agency, editContact }) => (
  <section>
    <h3>Contacts</h3>
    <ContactCard agency={agency} type="CSR" editContact={editContact} />
    <ContactCard agency={agency} type="Contact" editContact={editContact} />
    <ContactCard agency={agency} type="Principal" editContact={editContact} />
  </section>);

export default AgencyContacts;
