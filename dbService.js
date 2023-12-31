const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  // console.log('db ' + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM reviews;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name, pros, cons, rating) {
    try {
      return new Promise((resolve, reject) => {
        const query =
          "INSERT INTO reviews (name, pros,cons,rating) VALUES (?, ?, ? ,?);";

        connection.query(query, [name, pros, cons, rating], (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve({
              name: name,
              pros: pros,
              cons: cons,
              rating: rating,
            });
          }
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM reviews  WHERE name = ?;";

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
