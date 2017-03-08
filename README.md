# Angular Type Racer
An Typing Test Application build with AngularJS

## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Prerequisites

You need git to clone the `angular-type-racer` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `angular-type-racer`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `angular-type-racer`

Clone the `angular-type-racer` repository using git:

```
git clone https://github.com/midhunadarvin/angular-type-racer/.git
cd angular-type-racer
```

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  bower_components      --> contains bower components
  components/           --> all app specific modules
    navbar              --> navigation bar component
  core/                 --> core module containing the main shared components
    core.module.js        --> module file
    data.service.js       --> data service for fetching data
  home/                --> home module folder
    home.config.js        --> home configuration
    home.controller.js    --> home controller
    home.html             --> home template
    home.module.js        --> home module file
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```
