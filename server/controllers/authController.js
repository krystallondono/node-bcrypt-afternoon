module.exports = {
    register: async(req, res) => {
        // destructure what the function needs from the body
        const {username, password, isAdmin} = req.body,
        db = req.app.get('db');

        // use sql file to check database if user already exists 
        // await for the promise to resolve bc function is async
        // followed Matt's example because it was simpler than instructions

        const existingUser = await db.check_existing_user([username]);
            if(existingUser[0]){
                return status(409).send('Username taken');
            }

        // now I'm hashing the password for increased security and inserting their info into db

        const salt = bcrypt.genSaltSync(10),
              hash = bcrypt.hashSync(password, salt);

        // !! bit confused why the directions differ from lecture example, be sure to go back
        // rewatch video jic or get in Q to ask

        const registeredUser = await db.register_user ([isAdmin, username, hash]);
        const user = registeredUser[0];
        req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
        return res.status(201).send(req.session.user);

    },

    login: async(req, res) => {
        // And we destructure
        const {username, password} = req.body;

        // Followed instructions example to see both ways, but really just seems like an extra step
        const foundUser = await req.app.get('db').get_user([username]);
        const user = foundUser[0];
        if (!user) {
          return res.status(401).send('User not found. Please register as a new user before logging in.');
        }

        // bcrypt handles comparing the passwords
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
          return res.status(403).send('Incorrect password');
        }


        req.session.user = { isAdmin: user.is_admin, id: user.id, username: user.username };
        return res.send(req.session.user);
      },
    //   and now for the simplest of all of the handler methods 
      logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
      }

}