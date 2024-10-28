# Skillex Test Task by Grisha Yepiskoposyan

## Assignment Description

Create an API using Node.js and MySQL to generate combinations from a list of items and store them in the database. The API should respect a rule where items starting with the same letter cannot be combined.

## Prerequisites

- Node.js and Docker installed on your local machine

## What did I do?

I've created an api with single **POST** request _**/api/combination/generate**_ to generate combinations from given request body which should include **_items_** (array of numbers) and **_length_** (number). By calling to the endpoint we generate items by combining letters and numbers from the array given by request body. After that we generate matrix of unique combinations of items and inserting them to the database. As I use **Backtracking** algorithm to generate combinations, it can take long time to generate combinations in case of big array or when the array includes big numbers. So I set limitations for it, which can be configured from _**.env**_ file. Also, items length can't be bigger than 26 as in that case we cannot use uppercase letters to combine with numbers.

## How to start application?

1. Install dependencies:

```sh
npm install
```

2. Run _**docker-compose.yml**_ file to run **MySQL** container:

```sh
docker-compose up -d mysql
```

3. Create _**.env**_ file for configuration

Run to create _**.env**_ file
```sh
touch .env
```
or create it manually from your code redactor. After creating the file set necessary configurations as in _**.env.example**_ file.

4. Create necessary tables

In my opinion it's a good practice to execute database change manually. So I created a _**updates.sql**_ file in _**/src/common/db/mysql/changes**_ folder so you can find necessary **SQL** queries and run it manually from database GUI or via command line.

5. Run application:

```sh
npm start
```
or for dev mode use
```sh
npm run start:dev
```
## Thank you!!!