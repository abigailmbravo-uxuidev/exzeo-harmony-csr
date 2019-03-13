// Global before, beforeEach, afterEach
// These hooks run on every test, everywhere
// Try not to write global afterEach, this is an antipattern

// Order:
// 1. before (global first, then local)
// 2. beforeEach (global first, then local)
// 3. tests run
// 4. aftereach (local) aftereach (global)
// 5. Redo 2-4 for the remainder tests
// 6. after (local)

// ** NOTE: Do not write a global after(), it does not execute where you think it will
// and it's an anti-pattern anyway.

import { AUTH_TOKENS } from '../support/constants';

beforeEach('Reset local storage', () => cy.restoreSession(AUTH_TOKENS));

afterEach('Save local storage', () => cy.persistSession(AUTH_TOKENS));
