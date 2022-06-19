# CRUD-API
A simple CRUD API which uses in-memory database underneath

## Installing
1. Clone this repository https://github.com/yuliya-v/CRUD-API.git
2. Go to folder `CRUD-API`
3. Choose development branch `git checkout develop`
4. To install all dependencies use `npm install`

## Running the application

- development mode: `npm run start:dev`
- production mode: `npm run start:prod`
- horizontal scaling mode: `npm run start:multi`

## Using the application

API Endpoints are the following

| Methods | URLs | Description |
| :--- | :--- | :--- |
| GET | api/users | Get all users |
| GET | api/users/id | Get a specific user |
| POST | api/users | Create a new user |
| PUT | api/users/id | Update an existing user |
| DELETE | api/users/id | Delete an existing user |

Users are stored as objects that have following properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)


