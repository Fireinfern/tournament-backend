# Requirements to run this project

## Needed software

`NodeJS@16.19.0`

## Run Commands

When you clone the project you first need to install all dependencies of the node js project. This can be done by using the following command:

```bash
npm install
```

Then you can use:

```bash
npm run dev
```

this uses nodemon and dotenv to manage your development enviroment.

## Env variables

You will need to add a `.env` file to your folder, in this `.env` file we must have the values that will be use in the final deployment but must not be uploaded to git hub.
One clear example is the data base. Currently the `.env` file should look as such:

```env
DB="<Database URI>"
```

Just replace the `<Name of the Property>` for the required field

> :warning: **Update this file if more things are needed in the .env file**


# Basic Design

## Tournament System

Construct an Web App that displays tournaments on a grid. Each tournament must have fixed number of players, this will be either 16 or 8.

The tournament will have a number of rounds depending of the number of players. For 16 it will be 4 rounds, and for 8, 3.

## Front End

The fron end must have 3 basic pages in the nav bar:
* Home -> This will work as a basic landing page
* Login -> For Auth
* Tournaments -> Displays the tournaments

Then we need secondary pages like:
* Add Tournament
* Edit Tournament
* Confirmation for deletion
* Edit Rounds
* Create Player
* Select Winners