const express = require("express");

const app = express();
app.use(express.json());
const PORT = 1912;

// Path Logger for logging paths of every routing
let logger = (req, res, next) => {
    console.log("App is logging at " + req.path);
    next();
};

app.use(logger);


// "checkPermission" middleware to add "status : true" for "/libraries" and "/authors" routes.
const checkPermission = (req, res, next) => {
    if (req.params.name == "librarian" || req.params.name == "author" || req.url == "/libraries" || req.url == "/authors") {
        req.status = true;
    } else
        req.status = false;
    next();
};

// Routes -
/*
    "/"          - Home page
    "/books"     - Books route
    "/libraries" - Library route & "/libraries/:name" - Passing a name to base route
    "/authors"   - Author route &  "/authors/:name" - Passing a name to base route
*/
app.get("/", (req, res, next) => {
    res.send("Welcome to Home Page! :))");
});

app.get("/books", (req, res, next) => {
    res.status(200).json({
        route: req.url,
    });
});

app.get("/libraries", checkPermission, (req, res, next) => {
    res.status(200).json({
        route: req.url,
        permission: req.status,
    });
});

app.get("/libraries/:name", checkPermission, (req, res, next) => {
    res.status(200).json({
        route: req.url,
        permission: req.status,
    });
});

app.get("/authors", checkPermission, (req, res, next) => {
    res.status(200).json({
        route: req.url,
        permission: req.status,
    });
});

app.get("/authors/:name", checkPermission, (req, res, next) => {
    res.status(200).json({
        route: req.url,
        permission: req.status,
    });
});

app.listen(PORT, function(err) {
    if(err)
        throw err;
    console.log(`C1 Evaluation App is running on PORT : ${PORT}!`);
})
