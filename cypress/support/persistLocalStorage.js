// This file is to persist and rehydrate local storage.
// Add/remove keys from ourKeys as necessary to bypass Cypress's local storage clear.

const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  const ourKeys = ['access_token', 'id_token'];

  Object.keys(localStorage)
    .filter(key => ourKeys.includes(key))
    .forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY)
    .forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});
