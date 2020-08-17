import {
  dirname,
  join,
  createError,
  opine,
  json,
  urlencoded,
  serveStatic,
  Response,
  Request,
  NextFunction,
  renderFileToString,
} from "./deps.ts";
import indexRouter from "./routes/index.ts";
import usersRouter from "./routes/users.ts";

const app = opine();

// View engine setup
const __dirname = dirname(import.meta.url);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", renderFileToString);

// Handle different incoming body types
app.use(json());
app.use(urlencoded());

// Serve our static assets
app.use(serveStatic(join(__dirname, "public")));

// Mount our routers
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.setStatus(err.status || 500);
  res.render("error");
});

export default app;
