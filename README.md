### Brief

Frogo Baggins, a hobbit from the Shire, has a great idea. He wants to build a restaurant that serves traditional dishes from the world of Middle Earth. The restaurant will be called "The Dancing Pony" and will have a cozy atmosphere.

Frogo has hired you to build the website for his restaurant. As payment, he has offered you either a chest of gold or a ring. Choose wisely.

### Tasks (Specifications)

Deliver a REST API which meets the following requirements:

All functionality of the API must require a logged in user.

Users of the system must be able to register and login.
- At a minimum, the system should support password based authentication.
- Users must always have a name and email

The API needs authorization support for two roles, namely Administrators, and Customers.

Adminstrators must be able to take the following actions:
- Create, View, List, Update, and Delete dishes
- Dishes must always have a name, description, price, and image

Customers must be able to take the following actions:
- Search, View, and Rate dishes
- A dish can only be rated once per customer, and the rating can be updated.

### Supporting Assets

You've been provided with a docker-compose file which will bring up a postgres database and prometheus. These are optional and provided to help get started.

#### Postgres

You can connect to the database via localhost:5432 using the username and password configured in the docker-compose.yml.

#### Prometheus

You can configure prometheus via the provided prometheus.yml file.
