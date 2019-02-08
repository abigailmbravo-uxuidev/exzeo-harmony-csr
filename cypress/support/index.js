// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './globalHooks';
import './login';
import './persistLocalStorage';
import './utils';
import './workflow';
// Use this folder if you want any custom cypress stuff that will only be local
import '../local';
