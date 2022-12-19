const express = require('express');
const bookRoutes = require('./src/knjiga/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use("/api/knjige/", bookRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));