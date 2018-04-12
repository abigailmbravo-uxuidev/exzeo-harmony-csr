#!/bin/bash

set -x
set -e

function replace() {
  find ./build/static/js/*.js -type f -exec sed -i "s@{{REACT_APP_$1}}@"$(eval echo '$'"$1")"@g" {} \;
}

replace 'API_URL' 
replace 'AUTH0_PRIMARY_URL' 
replace 'AQA_SSO_URL' 
replace 'AUTH0_DOMAIN' 
replace 'AUTH0_CLIENT_ID' 
replace 'AUTH0_CONNECTION' 
replace 'AUTH0_AUDIENCE' 
