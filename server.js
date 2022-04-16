import express from 'express';
import cors from 'cors';
import helloController
    from "./controllers/hello-controller.js";
import userController   from "./controllers/users-controller.js";
import tuitsController from "./controllers/tuits-controller.js";
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.DB_C_STR
 || 'mongodb://localhost:27017/webdev';
mongoose.connect(CONNECTION_STRING);



const cors_options = {
    origin: function (origin, callback) {
            callback(null, true)
    }
};

const app = express();
app.use(cors(cors_options));
app.use(express.json());
helloController(app);
userController(app);
tuitsController(app);


app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(process.env.PORT || 4000);
