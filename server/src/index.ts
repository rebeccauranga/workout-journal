require("module-alias/register");

import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "passport";
import passportGoogleOauth from "passport-google-oauth";
import connectPg from "connect-pg-simple";
const postgresSession = connectPg(session);

import pool from "server/db/config";
import config from "server/config";
import {
  Exercise,
  User,
  CreateWorkoutRequest,
  Workout,
  WorkoutDetail,
  WorkoutSession,
  WorkoutSessionDetailsResponse,
} from "shared/models";

import { listExercises } from "server/db/db";
import { findOrCreateUser, findUserById } from "server/db/users";
import {
  createWorkout,
  findWorkoutById,
  findWorkoutDetailById,
  listWorkouts,
  listWorkoutExercises,
} from "server/db/workouts";
import {
  createWorkoutSession,
  completeWorkoutSession,
  getActiveWorkoutSession,
  getWorkoutSessionById,
  getWorkoutSessionExercises,
  toggleCompleteSessionExercise,
} from "server/db/workoutSession";
import { InvalidArgumentError } from "server/errors";

const app = express();
const port = 3000;
const GoogleStrategy = passportGoogleOauth.OAuth2Strategy;
const sessionCookieName = "workoutsession.sid";

app.use(
  session({
    name: sessionCookieName,
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    store: new postgresSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      maxAge: 60 * 1000 * 60 * 72,
    },
  })
);

function logger(req: Request, _: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "development") {
    const user: User | undefined = req.user as User;
    console.log(`[${req.method}] ${req.url} ${user?.email || ""}`);
  }
  next();
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.redirect("/signin");
    return;
  } else {
    next();
  }
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use("/api", requireAuth);

passport.serializeUser(function (user, done) {
  done(null, (user as User).id);
});

passport.deserializeUser(async function (id: string, done) {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (e) {
    console.error("[deserialize user]: ", e);
    done(e, null);
  }
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: `${config.host}/auth/google/callback`,
    },
    async function (_: string, __: string, profile: passport.Profile, done) {
      const emails = profile.emails || [];
      const email = emails.length ? emails[0].value : undefined;
      const photoUrls = profile.photos || [];
      const photoUrl = photoUrls.length ? photoUrls[0].value : undefined;

      if (!email) {
        done(new Error("no email retrieve"), null);
      }

      try {
        const user = await findOrCreateUser(
          email as string,
          photoUrl as string
        );
        done(null, user);
      } catch (e) {
        console.error("[verify callback error]: ", e);
        done(e, null);
      }
    }
  )
);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${config.clientHost}/login-failure`,
    failWithError: true,
    session: true,
  }),
  function (_: Request, res: Response) {
    res.redirect(`${config.clientHost}/`);
  }
);

app.get("/api/user", (req, res) => {
  const user = req.user;
  res.json(user);
});

app.get("/api/user/logout", (req, res) => {
  req.logOut();
  res.send();
});

app.get("/api/exercises", async (_: Request, res: Response<Exercise[]>) => {
  const exercises = await listExercises();
  res.json(exercises);
});

app.post(
  "/api/workouts",
  async (req: Request<CreateWorkoutRequest>, res: Response) => {
    const workout: CreateWorkoutRequest = req.body;
    const user: User = req.user as User;
    try {
      await createWorkout(workout, user.id);
      res.json({ message: `Successfully created ${workout.name}` });
    } catch (e) {
      if (e instanceof InvalidArgumentError) {
        res.status(400).json({ message: e.message });
      } else {
        console.error(e);
        res.status(500).send();
      }
    }
  }
);

app.get("/api/workouts", async (req: Request, res: Response<Workout[]>) => {
  const user: User = req.user as User;
  try {
    const workouts = await listWorkouts(user.id);
    res.json(workouts);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

app.post(
  "/api/workouts/session",
  async (
    req: Request<{ workoutId: string }>,
    res: Response<{ sessionId: string } | { message: string }>
  ) => {
    const workoutId = req.body.workoutId;
    const user: User = req.user as User;
    try {
      const workoutSessionId = await createWorkoutSession(workoutId, user.id);
      res.status(201).json({ sessionId: workoutSessionId });
    } catch (e) {
      if (e instanceof InvalidArgumentError) {
        res.status(400).json({ message: e.message });
      }
      console.error(e);
      res.status(500).send();
    }
  }
);

app.get(
  "/api/workouts/session",
  async (req: Request, res: Response<WorkoutSession | null>) => {
    const user = req.user as User;
    const activeSession = await getActiveWorkoutSession(user.id);
    if (!activeSession) {
      return res.status(404).json(null);
    }
    return res.json(activeSession);
  }
);

app.get(
  "/api/workouts/session/:id/details",
  async (req: Request, res: Response<WorkoutSessionDetailsResponse>) => {
    const sessionId = req.params.id;
    const workoutSession = await getWorkoutSessionById(sessionId);
    if (!workoutSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    const workout = await findWorkoutById(workoutSession?.workout_id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const workoutExercises = await listWorkoutExercises(workout.id);
    const exerciseStatuses = await getWorkoutSessionExercises(sessionId);
    const body: WorkoutSessionDetailsResponse = {
      data: {
        session: workoutSession,
        workout: workout,
        exerciseConfigs: workoutExercises,
        exerciseStatuses,
      },
    };

    return res.json(body);
  }
);

app.patch(
  "/api/workouts/session/:id/completed",
  async (req: Request, res: Response<WorkoutSession>) => {
    const sessionId = req.params.id;
    const updatedWorkoutSession = await completeWorkoutSession(sessionId);
    return res.json(updatedWorkoutSession);
  }
);

app.patch(
  "/api/workouts/session/:sessionId/exercise/:exerciseId/toggle-complete",
  async (req: Request, res: Response<{ completed_at: Date }>) => {
    const { sessionId, exerciseId } = req.params;
    const result = await toggleCompleteSessionExercise(sessionId, exerciseId);
    return res.json(result);
  }
);

app.get(
  "/api/workouts/:id",
  async (req: Request<{ id: string }>, res: Response<WorkoutDetail>) => {
    const workoutId = req.params.id;
    try {
      const workoutDetail = await findWorkoutDetailById(workoutId);
      res.json(workoutDetail);
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
