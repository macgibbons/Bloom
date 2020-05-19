
# ☻☕ Bloom ☕☻

Bloom is a full-stack web application built in C# and React. **Bloom** is a social media platform for specialty coffee enthusiasts. It allows users to build and share pour over coffee recipies and notes as well as discover new recipies from your favorite roasters and baristas. 


#### 👨‍🔬 Problem 👨‍🔬
Dialling in a coffee recipie can be very tricky and requires constant tasting and tinerking. Recipies can change with the age of the coffee or the humidity of where it is being brewed.
It can also be overwhelming to keep up with trends in the coffee world: what new coffees are coming out, what equipment everyone is loving, and what recipies people are brewing.
#
Bloom packages all of this into one easy to use web application. Bloom could be used by coffee shops to keep their staff up to date on what the current coffee is dialed in to or it can be used by home brewers who want to follow their favorite shops or just log their brews!

# 
When a user logs in, they will be taken to a dashboard that shows them the current day and which plants are to be watered on this day. They can then mark them as watered, which will automatically update a `completed` boolean to true in the `JSON` database, and take them off of the list of plants to be watered. Said boolean will be reverted back to false when it is time for them to be watered again.  


# Backend
The backend for bloom is an API built in C# ASP.NET Core.
- Start this project in Visual Studio from the `Capstone.sln` file
- Using your NuGet Packagame Manager Console, run `Update-Database` to run the migraton, create a database, and seed it with some data
- Run your server from Visual Studio

# Frontend
The frontend of Bloom is a React App bootstrapped from `create-react-app` with a few depencencies:
- Moment.js
- React-icons 
- GSAP 
- react-router-dom
- use-timer

# 
from the command line, cd into the `client/src` directory. From here (with your backend server running) run `npm start` to spin up the front end


# Usage
- login or register as a new user 
- create a few coffees and grinders from the appropriate pages
- from the dashboard, select a brew method to brew
- use the form and timer to construct your brew recipie
- on submission you are taken to your list of brews, from here you have the option to `share` a brew
- once shared, you can view your shared brew from the `explore` page
- view, rate, and comment on others brews!

