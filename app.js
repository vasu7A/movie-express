const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const dbpath = path.join(__dirname, "moviesData.db");

let db = null;

const estDbConnection = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("conection is started");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

estDbConnection();
//to Convert to Response OBj
const convertToResponseObj = (dbObj) => {
  return {
    MovieName: dbObj.movie_id,
    DirectorId: dbObj.director_id,
    MovieName: dbObj.movie_name,
    LeadActor: dbObj.lead_actor,
  };
};

//to get movie name

app.get("/movies/", async (Request, response) => {
  const queryMovie = `
        select movie_name
        from
        movie`;
  const MovieArray = await db.all(queryMovie);
  response.send(MovieArray.map((eachMovie) => convertToResponseObj(eachMovie)));
});
