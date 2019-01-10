# harmony-csr
Harmony CSR Portal

###### This app is bootstrapped with a custom version of Create React App
[Repo](https://github.com/facebook/create-react-app)  
[User Guide](https://facebook.github.io/create-react-app/)

### Getting setup
clone the repository (requires access rights) from bitbucket
`git clone git@bitbucket.org:exzeo-usa/harmony-csr.git`  
*_its likely you will be cloning multiple projects, we recommend using a common directory for them_

*From the root of the project*

add `.npmrc` file **you will need this file before attempting* `npm install`
```bash
//registry.npmjs.org/:_authToken=GET_ACCESS_TOKEN_FROM_DEVOPS
@exzeo:registry=https://registry.npmjs.org/
```

add `.env.local` file
```.bash
# point to sandbox
REACT_APP_API_URL=https://api.harmony-ins.com

# running locally using mock-auth0
#REACT_APP_AUTH0_DOMAIN=mock-auth0:8888
#REACT_APP_AUTH0_CLIENT_ID=https://mock-auth0:8888
#REACT_APP_AUTH0_CONNECTION=ashton-sandbox
#REACT_APP_AUTH0_AUDIENCE=https://mock-auth0:8888
```

install dependencies
```bash
npm install
```

**Important!**  
append the following to `/etc/hosts` file on your machine
```bash
127.0.0.1               devapi.harmony-ins.com
127.0.0.1               devlogin.harmony-ins.com
127.0.0.1               devcsr.harmony-ins.com
127.0.0.1               devagent.harmony-ins.com
127.0.0.1               mock-auth0
```

### Contributing to Harmony CSR

All components must meet the following criteria
* Follow formatting / linting rules ( `npm run lint` must exit with 0 code )
* PropTypes must be declared - required and default
* Covered by unit tests
* A front end dev approval required for PR's
