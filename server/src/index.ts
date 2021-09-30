import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import passportGoogleOauth from "passport-google-oauth";

import config from "./config";
import { Exercise, User } from "../../shared/models";
import { listExercises } from "./db/db";
import { findOrCreateUser, findUserById } from "./db/users";

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
    cookie: { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: true,
    },
  })
);

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

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
    res.redirect(`${config.clientHost}/workouts`);
  }
);

app.get("/api/exercises", async (_: Request, res: Response<Exercise[]>) => {
  const exercises = await listExercises();
  res.json(exercises);
});


app.listen(port, () => {
  console.log(`server started at ${port}`);
});
