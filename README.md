# MazeRun

The web application is a maze, where users can register an account, select a desired difficulty level, and enjoy the challenge of navigating through the maze. Additionally, users can track their progress as their score is updated at the end of each game.
## Introduction
The MazeRun project is a simple game that tests and improves the player's cognitive skills. It involves a player to navigate through the maze and findthe exact way out.
The Memory Game project can help assess several soft skills such as memory, concentration, attention to detail, problem-solving, and decision-making. These skills are essential for everyday life, and the game can help players improve them in a fun and engaging way.


One of the possible ways to solve the puzzle is to backtrack to the original position if you find a dead end.

## Steps to set up the project
    Clone the GitHub repository containing the memory game project to your local system.

    Install the required dependencies for the project by running the command npm install in your terminal from the project directory.

    Once the dependencies are installed, start the development server by running the command node index.js in your terminal from the project directory.
    
    If the project starts without any errors, open your web browser and go to localhost:3000 to access the memory game website locally on your system.

It's important to note that these steps assume that you have Node.js and npm (Node Package Manager) installed on your system. If you don't have these tools installed, you'll need to download and install them first before following the above steps. Additionally, the specific commands and steps may vary depending on the project's structure and dependencies.
## Implemented Features

    Anyone with an email address can create an Id and password to participate in the game
    puzzle contains
        Minimum 5 clues
        Minimum 2 dead-ends
        Minimum 1 solution 
    All the progress / user data (eg - time taken by each user for every step, solution accuracy, etc.) depending on your puzzle requirements are stored for every user

    On refreshing, from either browser or website, the puzzle should start from the same step or give the user an option to restart

    A dashboard for the admin where the progress of all the users can be tracked & analyzed
    
    A leaderboard where you can see all the best performing users.
    
## Additional Features
User analytics (eg - time taken by each user for every step, solution accuracy, etc.) depending on your puzzle is stored and can be seen by the admin in the database

## Deployment

The project is Deployed using render .

The live Website => https://mazerun-4jiw.onrender.com

## Tech Used

HTML, CSS, JS for front end

MongoDB, Express, Node, Mongoose for backend

Nodemon and Concurrently for development

Render for deployment
