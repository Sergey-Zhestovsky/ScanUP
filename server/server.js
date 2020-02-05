let express = require("express"),
  bodyParser = require("body-parser"),
  config = require("./config"),
  cookieParser = require("cookie-parser"),
  morgan = require("morgan"),
  colors = require("colors"),
  port = process.env.PORT || config.port || 3001;

let entryRouter = require("./routes/entry"),
  indexRouter = require("./routes/index"),
  authorizationRouter = require("./routes/authorization"),
  tsTypesRouter = require("./routes/tsTypes"),
  transportSystemRouter = require("./routes/transportSystem"),
  tsReceptionRouter = require("./routes/tsReception"),
  moderatorRouter = require("./routes/moderator"),
  scannerRouter = require("./routes/scanner"),
  baggageRouter = require("./routes/baggage"),
  baggageTransportationStateRouter = require("./routes/baggageTransportationState"),
  complaintRouter = require("./routes/complaint"),
  errorRouter = require("./routes/error");

let app = express();

app.use(morgan(":url".cyan + " :res[content-length] - " + ":response-time ms".brightRed, {
  skip: function (req, res) { return req.method !== "POST" }
}))

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
app.use("/scanner", scannerRouter);
app.use("/baggage", baggageRouter);
app.use("/baggage-transportation-state", baggageTransportationStateRouter);
app.use("/complaint", complaintRouter);
app.use("/", indexRouter);

app.use(errorRouter.error);
app.use(errorRouter.devError);

app.listen(
  port,
  () => console.log(`Listening on port ${port}\nhttp://localhost:${port}`)
);