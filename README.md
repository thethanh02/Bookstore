# Book store

## Application

- **Server**

- **Client**

## Requirements

- yarn or npm
- Java 17+
- MySQL

## Running

- **Server**

    - Open a terminal and navigate to `shopping_be` folder

    - Export the following environment variables for the `Client ID` and `Client Secret` of the Social Apps

    `export` for Unix | `set` for Windows
    ```
    set GOOGLE_CLIENT_ID=...
    set GOOGLE_CLIENT_SECRET=...
    ```

    - Run the following `Maven` command to start the application
    ```
    ./mvnw clean spring-boot:run
    ```

- **Client**

    - Open another terminal and navigate to `shopping_fe` folder

    - Run the command below if you are running the application for the first time
    ```
    yarn
    ```

    - Run the `yarn` command below to start the application
    ```
    yarn start
    ```

## Application URLs

| Application  | URL                                   | Credentials                                         |
| ------------ | ------------------------------------- | --------------------------------------------------- |
| server       | http://localhost:8080/swagger-ui.html |                                                     |
| client       | http://localhost:3000                 | `admin/admin`, `user/user` or signing up a new user |