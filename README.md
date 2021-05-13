# Cab-Booking-System-API

API for cab booking system using NodeJS, Express, MySQL, Sequelize, PassportJS and JWT tokenization.


## Getting Started

Please follow the given instructions for setting up this project locally.
To get a local copy check code tab and run following commands to get started.


### Prerequisites

Before starting the project install all dependencies by running,
* npm
  ```sh
  npm install npm@latest -g
  ```
  

### Installation
  
1. Start your SQL server on the device.
2. In project configure `Config.js` according to the SQL server.
3. After that **Create/Migrate** all the models and database schema in the database, 
 * ```sh
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  ```
4. Use seeder to import test data, or add new entries using routes.
  ```sh
  npx sequelize-cli db:seed:all
  ```
6. Finally, Run the project by running, 
  ```sh
  node index.js
  ```
The project will start at **localhost:5000** by default.
  
  
## Usage

Following are the endpoints of the API, through which you can communicate with the server.

1. Server Homepage (**get** - `localhost:5000/`)
2. New user registration (**post** - `localhost:5000/auth/register`)
3. Existing user login (**post** - `localhost:5000/auth/login`)
4. Check available rides (**get** - `localhost:5000/ride/check`)
5. Book a available ride (**post** - `localhost:5000/ride/book`)
6. Finish an ongoing ride (**post** - `localhost:5000/ride/finish/:id`)
7. Check completed rides (**get** - `localhost:5000/ride/completed`)
  
## Author

Anant Dhok - [LinkedIn](https://www.linkedin.com/in/anantdhok-444701/) - anantdhok16@gmail.com


## License

Distributed under the MIT License. See `LICENSE` for more information.
