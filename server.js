import express from 'express';
import cors from 'cors';
import helloController
    from "./controllers/hello-controller.js";
import userController   from "./controllers/users-controller.js";
import tuitsController from "./controllers/tuits-controller.js";

const cors_options = {origin : "https://a8--affectionate-kalam-2e2bec.netlify.app/"};

const app = express();
app.use(cors(cors_options));
app.use(express.json());
helloController(app);
userController(app);
tuitsController(app);


app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(process.env.PORT || 4000);