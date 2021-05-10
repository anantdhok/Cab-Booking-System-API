# Cab-Booking-System-API

API for cab booking system using NodeJS, Express, MySQL, Sequelize.


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


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
  ```sh
  npm install npm@latest -g
  ```
4. Run the project by running, 
  ```sh
  node index.js
  ```
The project will start at **localhost:5000** by default.
  
  
## Usage

Following are the endpoints of the API, through which you can communicate with the server.

1. Server Homepage (`localhost:5000/`)
2. New user registration (`localhost:5000/auth/register`)
3. Existing user login (`localhost:5000/auth/login`)
4. Check available rides (`localhost:5000/ride/check`)
5. Book a available ride (`localhost:5000/ride/book`)
6. Finish an ongoing ride (`localhost:5000/ride/finish`)
7. Check completed rides (get - `localhost:5000/ride/completed`)
  
## Author

Anant Dhok - [LinkedIn](https://www.linkedin.com/in/anantdhok-444701/) - anantdhok16@gmail.com


## License

Distributed under the MIT License. See `LICENSE` for more information.
