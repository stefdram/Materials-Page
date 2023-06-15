import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


const jwtSecret = "Random string";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    const user = { nik: payload.nik };
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
});

passport.use(jwtStrategy);