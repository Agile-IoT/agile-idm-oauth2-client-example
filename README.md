# AGILE IDM OAauth2 client example

This repository contains examples of minimal node js web applications that use AGILE IDM for different purposes.
All the branches have an oauth2 client, hence the name of the repository.

#Branches

This repository contains several branches depending on the functionalities that are showcased:

* client: a minimalistic application that uses AGILE IDM as its identity provider, and displays user information  (user information, and token).
* api-client: an extended version of the client application, but on top it also offers some basic functionality to register entities on identity management.


## Setup

### Create User

First of all, we need to create the first user with IDM, if it not already created:
For this, execute the following command in the scripts folder of agile-idm-web-ui

```
  node createUser.js --username=bob --password=secret  --auth=agile-local
```

### Create the Oauth2 client (so that it matches the configuration of this example)

```
node createClient.js --client=MyAgileClient2 --name="My first example as IDM client" --secret="Ultrasecretstuff" --owner=bob --auth_type=agile-local --uri=http://localhost:3002/auth/example/callback
```

## RUN Identity Management

Then run identity management by executing this in the root of the agile-idm-web-ui folder:

```
  node app.js
```

## RUN this example


Run this example by executing this in the root of the current project:

```
  node index.js
```
