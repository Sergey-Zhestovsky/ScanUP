let express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  port = process.env.PORT || 3001;

let entryRouter = require("./routes/entry"),
  indexRouter = require("./routes/index"),
  authorizationRouter = require("./routes/authorization"),
  tsTypesRouter = require("./routes/tsTypes"),
  transportSystemRouter = require("./routes/transportSystem"),
  tsReceptionRouter = require("./routes/tsReception"),
  moderatorRouter = require("./routes/moderator"),
  errorRouter = require("./routes/error");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public", express.static(__dirname + `/../public`));

app.all("*", entryRouter);
app.use("/authorization", authorizationRouter);
app.use("/transport-system-type", tsTypesRouter);
app.use("/transport-system", transportSystemRouter);
app.use("/transport-system-reception", tsReceptionRouter);
app.use("/moderator", moderatorRouter);
app.use("/", indexRouter);

app.use(errorRouter.error);
app.use(errorRouter.devError);

app.listen(
  port,
  () => console.log(`Listening on port ${port}\nhttp://localhost:${port}`)
);