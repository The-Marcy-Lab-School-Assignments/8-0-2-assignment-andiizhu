require("dotenv").config(); // imports environment variables and allows access to the values
const express = require("express"); // requires express package and set to a variable
const path = require("path"); // imports path Module for serveStatic
const fetchData = require("./utils/handleFetch"); // imports fetchData function for API request
const pathToDist = path.join(__dirname, "../giphy-search/dist"); // creates an absolute path to allow service of static files in the dist folder in the giphy-search/dist frontend folder.

const serveStatic = express.static(pathToDist); // express's built-in method/middleware to serve static files from the pathToDist folder.

app = express(); // initializes Express

const serveGifs = async (req, res, next) => {
	// controller that handles the fetch for the API data, copied directly from the repo.
	const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`; // because the API_KEY is now in the `.env` file, use `process.env.API_KEY` to access it.
	const [data, error] = await fetchData(API_URL);
	if (error) {
		console.log(error.message);
		return res.status(404).send(error);
	}
	res.send(data); // send the data back to the endpoint. The React Component will now fetch to this endpoint instead of directly to the API URL.
};

app.use(serveStatic); // middleware to serve static files in the dist folder of giphy-server
app.get(`/api/gifs`, serveGifs); // GET route controller to the endpoint "/api/gifs" that runs `serveGifs

const port = 8000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
