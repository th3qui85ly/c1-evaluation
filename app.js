const express = require("express");

const app = express();
const PORT = 1912;

let logger = (req, res, next) => {
    console.log("This is logger for all req");
    let reqPath = req.url;
    let log = `${reqPath}`;
    console.log(log);
    next();
};

app.use(logger);

app.get("/", (req, res, next) => {
    res.send("Welcome to Home Page! :))");
});

app.get("/books", (req, res, next) => {
    res.status(200).json({
        route: "/books"
    });
});

app.get("/libraries", (req, res, next) => {
    res.status(200).json({
        route: "/libraries",
        permission: true
    });
});

app.get("/authors", (req, res, next) => {
    res.status(200).json({
        route: "/authors",
        permission: true
    });
});

app.listen(PORT, function(err) {
    if(err)
        throw err;
    console.log(`C1 Evaluation App is running on PORT : ${PORT}!`);
})
