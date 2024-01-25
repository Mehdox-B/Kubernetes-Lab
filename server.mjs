import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
let mongoClient = MongoClient;
const DB_USER = process.env.MONGO_DB_USERNAME;
const DB_PASS = process.env.MONGO_DB_PWD;
const PORT = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//----When we start the app localy , instead the server should connect to mongoDB container's Configuration----//
let mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongo-db`;
//---To avoid Parsing and deprecation warnings---//
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
//Information about The DataBase
let dataBase_Name = "MyDB";
let collection_Name = "Data";

app.get("/fetchData", async (req, res) => {
  let fetched_data = new Array();

  let client = await mongoClient.connect(
    mongoUrlDockerCompose,
    mongoClientOptions
  );
  let dataBase = client.db(`${dataBase_Name}`);
  let Query = {};
  let cursor = await dataBase
    .collection(`${collection_Name}`)
    .find(Query)
    .toArray();

  cursor.forEach((element) => {
    fetched_data.push(element);
  });
  client.close();

  res.json(fetched_data ? fetched_data : {});
});

app.listen(PORT, () => {
  console.log(`The App is running in PORT ${PORT} `);
});
