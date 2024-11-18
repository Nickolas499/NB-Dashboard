
    ### Aqui te presento mi proyecto es un servidor  en nodejs usando la arquitectura MVC con express y mongodb.  
    # Estructura del fichero:

src/
    .env
    app.js
    db.js
    index.js
    test.js
    controllers/
        auth.controller.js
        queuevolume.controller.js
        registration.controller.js
        userjobassigment.controller.js
    libs/
        jwt.js
        processData.js
    middlewares/
        validateToken.js
        validator.middleware.js
    models/
        queuevolume.model.js
        registration.model.js
        user.model.js
        userjobassigment.model.js
    pipeline/
        globalProductivity.pipeline.js
        userProductivity.pipeline.js
    routes/
        auth.routes.js
        queuevolume.routes.js
        registration.routes.js
        userjobassigment.routes.js
    schemas/
        auth.schema.js
        production.schema.js



========================[ app.js ]========================
```
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookie from "cookie-parser";

//============================================================================//
//                              ROUTES IMPORT                                 //
//============================================================================//
import authRoutes from "./routes/auth.routes.js";
import registration from "./routes/registration.routes.js";
import queue from "./routes/queuevolume.routes.js";
import userjobassigment from "./routes/userjobassigment.routes.js";

//============================================================================//
//                      Express Server CONFIG                                 //
//============================================================================//
const app = express();


app.use(cors(
    {               
        //aceptar todas los origenes
        origin: true,
        // aceptar origenes especificos
        // origin: ["http://10.62.150.33:4000","http://10.62.150.33:3000","http://localhost:4000","http://10.62.150.33:5173","http://localhost:5173"],
        
        //aceptar todas las credenciales 
        credentials: true
    }
));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookie());

//============================================================================//
//                                  ROUTES                                    //
//============================================================================//
app.use('/api', authRoutes)
app.use('/api', registration)
app.use('/api', queue)
app.use('/api', userjobassigment)




export default app
```
========================[ db.js ]========================
```
import mongoose from 'mongoose';

export const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/NB_Server');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};
```
========================[ index.js ]========================
```
import app from "./app.js";
import {connectdb} from "./db.js";
export const IP = process.env.IP;
export const PORT =process.env.PORT || 5000;


connectdb();
  app.listen(PORT,IP, () => {
    console.log(`Server running on ${IP}:${PORT}`);
  });
```
========================[ test.js ]========================
```
import Scaned from "./models/scaned.model.js";
import Designed from "./models/design.model.js";
import Registration from "./models/registration.model.js";
import Redesigned from "./models/redesign.model.js";
import processData from './libs/processData.js';
import DailyProduction from "./models/dailyproduction.model.js";
import asignment from "./models/asignment.model.js";



export const data = async () => {
    const ScanedData = await Scaned.find({});
    const DesignedData = await Designed.find({});
    
    //console.log(processData(ScanedData, DesignedData));
}


export const databyid = async (id) => {
    const ScanedData = await Scaned.find({ USER: id });
    const DesignedData = await Designed.find({ USER: id });    
    // console.log(processData(ScanedData, DesignedData));
}

export const ProductivityData = async () => {
    const productivity = await Designed.aggregate([
        { $project: { DATE:1,  total: { $add: ["$IBO_DESIGNED", "$CROWN_REST", "$CEMENTE_BRIDGE_REST", "$FULL_ARCH_P", "$FULL_ARCH_F", "$IMPLANT_REST", "$IMPLANT_BRIDGE_REST", "$PRINTED_MODELS"] } } },
        { $sort: { DATE: 1 } },
        { $group: { _id: "$DATE", total: { $sum: "$total" } } },
        { $project: { _id: 0, DATE: "$_id", total: 1 } }
     ])
    // console.log(productivity);
}

export const CaseReceived = async () => {
    const cases = await Registration.aggregate([
            { $project: { DATE:1,  total: { $add: ["$IBO", "$ABUT", "$FULL_ARCH_P", "$FULL_ARCH_F"] } } },
            { $group: { _id: "$DATE", total: { $sum: "$total" } } },
            { $project: { _id: 0, DATE: "$_id", total: 1 } },
            { $sort: { DATE: 1 } }
    ])
    // console.log(cases);
}

export const RedesignedUnits = async () => {
    const cases = await Redesigned.aggregate([
        { $project: { DATE:1,  total: { $add: ["$IBO_DESIGNED", "$CROWN_REST", "$CEMENTE_BRIDGE_REST", "$FULL_ARCH_P", "$FULL_ARCH_F", "$IMPLANT_REST", "$IMPLANT_BRIDGE_REST"] } } },
        { $group: { _id: "$DATE", total: { $sum: "$total" } } },
        { $project: { _id: 0, DATE: "$_id", total: 1 } },
        { $sort: { DATE: 1 } }
     ])
    // console.log(cases);

}


export const DailyProd = async () => {
    
        
     console.log("Working...");
}




```
========================[ auth.controller.js ]========================
```
import User from "../models/user.model.js";
import bcript from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


//==============================================================================//
//                                  REGISTER                                    //
//==============================================================================//
export const register = async (req, res) => {
  const { username, fname, lname, email, password, access, color } = req.body;

  try {

    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json(["User already exists"]);
    }
    const emailFound = await User.findOne({ email });
    if (emailFound) {
      return res.status(400).json(["Email already exists"]);
    }

    const salt = await bcript.genSalt(10);
    const hashs = await bcript.hash(password, salt);

    const newUser = new User({
      username,
      fname,
      lname,
      email,
      password: hashs,
      access,
      color,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.status(200).json(["User registered successfully"]);

  } catch (error) {
    res.status(500).json([error.message]);
  }
};

//==============================================================================//
//                                  LOGIN                                       //
//==============================================================================//
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.status(404).json(["User not found"]);
    }


    const isMatch = await bcript.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json(["Invalid credentials"]);
    }

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    const data = {
      id: userFound._id,
      fname: userFound.fname,
      lname: userFound.lname,
      access: userFound.access,
      color: userFound.color,
    }
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json([error.message]);
  }
};


//==============================================================================//
//                                  LOGOUT                                      //
//==============================================================================//

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
}


//==============================================================================//
//                                  PROFILE                                     //
//==============================================================================//

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(404).json(["User not found"]);
  }
  return res.status(200).json({ id: userFound._id, fname: userFound.fname, lname: userFound.lname, access: userFound.access });
}


export const verify = async (req, res) => {

  const { token } = req.cookies;


  if (!token) return res.status(401).json(['Authorization denied']);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {

    if (err) return res.status(401).json(['Invalid token']);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(404).json(['User not found']);

    return res.status(200).json({
      id: userFound._id,
      fname: userFound.fname,
      lname: userFound.lname,
      access: userFound.access,
      color: userFound.color,
    });

  });
}


export const getUsers = async (req, res) => {
  const userFound = await User.find({}, '_id fname lname username email color');
  // console.log(userFound);
  if (!userFound) {
    return res.status(401).json(["Users not found"]);
  }
  return res.status(200).json(userFound);

}



export const deleteUser = async (req, res) => {
  const { id } = req.params;  // Suponiendo que el ID del usuario se pasa como parámetro en la URL

  try {
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json(["User not found"]);
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json(["User deleted successfully"]);

  } catch (error) {
    res.status(500).json([error.message]);
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, username, email, color } = req.body;

  try {
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json(["User not found"]);
    }
  }
  catch (error) {
    res.status(500).json([error.message]);
  }
}
```
========================[ queuevolume.controller.js ]========================
```
import QueueVolume from "../models/queuevolume.model.js";

//=====================================((CREATE QUEUE VOLUME CONTROLLER))==============================================//
export const post_queue_volume = async (req, res) => {
    const { LS3, ZEISS, SHAPE,IBO_DESIGN, DIGI_ABUT, PHIS_ABUT, FULL_ARCH, DATE } = req.body;
    console.log(req.body);
    const Queue = new QueueVolume({
      LS3,
      ZEISS,
      SHAPE,
      IBO_DESIGN,
      DIGI_ABUT,
      PHIS_ABUT,
      FULL_ARCH,
      DATE,      
    });
    const QueueSaved = await Queue.save();
    return res.json(QueueSaved);
  };

//=====================================((GET QUEUE VOLUME CONTROLLER))==============================================//

export const get_queue_volume = async (req, res) => {
  const Queue = await QueueVolume.findOne({}, {
    _id: 0, 
    LS3: 1,
    ZEISS: 1,
    SHAPE: 1, 
    IBO_DESIGN: 1,
    DIGI_ABUT: 1,
    PHIS_ABUT: 1,
    FULL_ARCH: 1,
    DATE: 1
  }).sort({ createdAt: -1 });
    return res.json(Queue);
  
}

//=====================================((UPDATE QUEUE VOLUME CONTROLLER))==============================================//
export const update_queue_volume = async (req, res) => {
  const Queue = await QueueVolume.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!Queue) return res.status(404).json(["Work not found"]);
  return res.json(Queue);
}



```
========================[ registration.controller.js ]========================
```
import Registration from "../models/registration.model.js";



//=============[Get all registrations data]================//

export const getRegistrations = async (req, res) => {
  //const registrations = await Registration.find();
  const registrations = await Registration.find({ USER: req.user.id }).sort({ createdAt: -1 });

  return res.json(registrations);
};

//=============[create registrations data ]================//
export const createRegistration = async (req, res) => {
  try {
    const { IBO, ABUT, FULL_ARCH_P, FULL_ARCH_F, DATE } = req.body;
  const newRegistration = new Registration({
    IBO,
    ABUT,
    FULL_ARCH_P,
    FULL_ARCH_F,
    DATE,
    USER: req.user.id,
  });
  const registrationSaved = await newRegistration.save();
  return res.json(registrationSaved);
  } catch (error) {
    return res.status(404).json(["Registration not found"]);
  }
};

//================[Get registrations data by ID]================//
export const getRegistration = async (req, res) => {
  try{
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json(["Registration not found"]);
    return res.json(registration);
  }catch (error){
    return res.status(404).json(["Registration not found"]);

  }
};

//================[Update registrations data by ID]================//
export const updateRegistration = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
 try {
    const registration = await Registration.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    
  );
  if (!registration) return res.status(404).json(["Update not found"]);
  return res.json(registration);
 } catch (error) {
  return res.status(404).json([`Update not found ${error}`]);
 }
};

//================[Delete registrations data by ID]================//
export const deleteRegistration = async (req, res) => {
  console.log(req.params.id);
  const registration = await Registration.findByIdAndDelete(req.params.id);
  if (!registration) return res.status(404).json(["Registration not found"]);
  return res.status(204).json();
};

```
========================[ userjobassigment.controller.js ]========================
```
import UserJobAssigment from "../models/userjobassigment.model.js";

//=====================================((CREATE JOB ASIGNMENT))==============================================//

export const post_userJobAssignment = async (req, res) => {
    const { USER,ASSIGMENTS, DATE } = req.body;
    console.log(req.body);
    const newUserJobAsingment = new UserJobAssigment({
      USER,ASSIGMENTS,DATE  
    });
    const UserSaved = await newUserJobAsingment.save();
    return res.json(UserSaved);
  }
  
  //=====================================((GET JOB ASIGNMENT))==============================================//
  export const get_userJobAssignment = async (req, res) => {
    const job = await UserJobAssigment.find({});
      return res.json(job);
  }
  
  //=====================================((UPDATE JOB ASIGNMENT))==============================================//
  export const update_userJobAssignment = async (req, res) => {
    console.log(req.params.id);
    const job = await UserJobAssigment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      
    );
    console.log(job);
    if (!job) return res.status(404).json(["Job not found"]);
    return res.json(job);
  }
```
========================[ jwt.js ]========================
```
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken"; 

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
        payload,
        TOKEN_SECRET,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
  })
}

```
========================[ processData.js ]========================
```
const  processData = (scannedData, designedData) =>{
    const result = {};
    
    scannedData.forEach(item => {
      const { DATE, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH } = item;
      
      if (!result[DATE]) {
        result[DATE] = {
          _id: DATE,
          LS3: 0,
          ZEISS: 0,
          SHAPE: 0,
          COPY_MILL: 0,
          FULL_ARCH: 0,
          IBO_DESIGNED: 0,
          CROWN_REST: 0,
          CEMENTE_BRIDGE_REST: 0,
          FULL_ARCH_P: 0,
          FULL_ARCH_F: 0,
          IMPLANT_REST: 0,
          IMPLANT_BRIDGE_REST: 0,
          PRINTED_MODELS: 0
        };
      }
      
      result[DATE].LS3 += LS3;
      result[DATE].ZEISS += ZEISS;
      result[DATE].SHAPE += SHAPE;
      result[DATE].COPY_MILL += COPY_MILL;
      result[DATE].FULL_ARCH += FULL_ARCH;
    });
    
    designedData.forEach(item => {
      const { DATE, IBO_DESIGNED, CROWN_REST, CEMENTE_BRIDGE_REST, FULL_ARCH_P, FULL_ARCH_F, IMPLANT_REST, IMPLANT_BRIDGE_REST, PRINTED_MODELS } = item;
      
      if (!result[DATE]) {
        result[DATE] = {
          _id: DATE,
          LS3: 0,
          ZEISS: 0,
          SHAPE: 0,
          COPY_MILL: 0,
          FULL_ARCH: 0,
          IBO_DESIGNED: 0,
          CROWN_REST: 0,
          CEMENTE_BRIDGE_REST: 0,
          FULL_ARCH_P: 0,
          FULL_ARCH_F: 0,
          IMPLANT_REST: 0,
          IMPLANT_BRIDGE_REST: 0,
          PRINTED_MODELS: 0
        };
      }
      
      result[DATE].IBO_DESIGNED += IBO_DESIGNED;
      result[DATE].CROWN_REST += CROWN_REST;
      result[DATE].CEMENTE_BRIDGE_REST += CEMENTE_BRIDGE_REST;
      result[DATE].FULL_ARCH_P += FULL_ARCH_P;
      result[DATE].FULL_ARCH_F += FULL_ARCH_F;
      result[DATE].IMPLANT_REST += IMPLANT_REST;
      result[DATE].IMPLANT_BRIDGE_REST += IMPLANT_BRIDGE_REST;
      result[DATE].PRINTED_MODELS += PRINTED_MODELS;
    });
    
    return Object.values(result);
  }

  export default processData
```
========================[ validateToken.js ]========================
```
import jwt from 'jsonwebtoken';
export const TOKEN_SECRET = process.env.TOKEN_SECRET

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({message: 'No Token Authorization denied'});
    }
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = user
        next();
    })
    
}
```
========================[ validator.middleware.js ]========================
```
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};

```
========================[ queuevolume.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const QueueVolumeShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type:Number},
    IBO_DESIGN: {type: Number},
    DIGI_ABUT: {type: Number},
    PHIS_ABUT: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')}    
}, {
    versionKey: false,
    timestamps: true
})
const QueueVolume = mongoose.model("QueueVolume", QueueVolumeShema);
export default QueueVolume
```
========================[ registration.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const registrationSchema = new mongoose.Schema({
    IBO: {type: Number},
    ABUT: {type: Number},
    FULL_ARCH_P: {type: Number},
    FULL_ARCH_F: {type: Number},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration
```
========================[ user.model.js ]========================
```
import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username: {type: String, required: true, trim: true, unique: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    access: {type: String, required: true},
    color: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('User', userShema);




```
========================[ userjobassigment.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const UserJobAssigmentShema = new mongoose.Schema({    
    USER: {type: String, required: true},
    ASSIGMENTS: {type: Array, default: []},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
}, {
    versionKey: false,
    timestamps: true
})

const UserJobAssigment = mongoose.model("Asingment", UserJobAssigmentShema);
export default UserJobAssigment
```
========================[ globalProductivity.pipeline.js ]========================
```
export const  globalProductivity = [
    {
        "$lookup": {
            "from": "designs",
            "localField": "DATE",
            "foreignField": "DATE",
            "as": "designs"
        }
    }, 
    {
        "$lookup": {
            "from": "redesigns",
            "localField": "DATE",
            "foreignField": "DATE",
            "as": "redesigns"
        }
    }, 
    {
        "$unwind": {
            "path": "$designs"
        }
    }, 
    {
        "$unwind": {
            "path": "$redesigns"
        }
    }, 
    {
        "$group": {
            "_id": "$DATE",
            "LS3": {
                "$sum": "$LS3"
            },
            "ZEISS": {
                "$sum": "$ZEISS"
            },
            "SHAPE": {
                "$sum": "$SHAPE"
            },
            "COPY_MILL": {
                "$sum": "$COPY_MILL"
            },
            "FULL_ARCH": {
                "$sum": "$FULL_ARCH"
            },
            "IBO": {
                "$sum": "$designs.IBO_DESINED"
            },
            "CROWN_R": {
                "$sum": "$designs.CROWN_REST"
            },
            "CBR": {
                "$sum": "$designs.CEMENTE_BRIDGE_REST"
            },
            "FAP": {
                "$sum": "$designs.FULL_ARCH_P"
            },
            "FAF": {
                "$sum": "$designs.FULL_ARCH_F"
            },
            "IMP_R": {
                "$sum": "$designs.IMPLANT_REST"
            },
            "IMP_B_R": {
                "$sum": "$designs.IMPLANT_BRIDGE_REST"
            },
            "PRINT_M": {
                "$sum": "$designs.PRINTED_MODELS"
            },
            "IBO_R": {
                "$sum": "$redesigns.IBO_DESINED"
            },
            "CROWN_R_R": {
                "$sum": "$redesigns.CROWN_REST"
            },
            "CBR_R": {
                "$sum": "$redesigns.CEMENTE_BRIDGE_REST"
            },
            "FAP_R": {
                "$sum": "$redesigns.FULL_ARCH_P"
            },
            "FAF_R": {
                "$sum": "$redesigns.FULL_ARCH_F"
            },
            "IMP_R_R": {
                "$sum": "$redesigns.IMPLANT_REST"
            },
            "IMP_B_R_R": {
                "$sum": "$redesigns.IMPLANT_BRIDGE_REST"
            }
        }
    }, 
    {
        "$project": {
            "_id": 1,
            "LS3": 1,
            "ZEISS": 1,
            "SHAPE": 1,
            "COPY_MILL": 1,
            "FULL_ARCH": 1,
            "IBO": 1,
            "CROWN_R": 1,
            "CBR": 1,
            "FAP": 1,
            "FAF": 1,
            "IMP_R": 1,
            "IMP_B_R": 1,
            "PRINT_M": 1,
            "IBO_R": 1,
            "CROWN_R_R": 1,
            "CBR_R": 1,
            "FAP_R": 1,
            "FAF_R": 1,
            "IMP_R_R": 1,
            "IMP_B_R_R": 1
        }
    },
    {
      $sort:
        {
          "_id": 1
        }
    }
];
```
========================[ userProductivity.pipeline.js ]========================
```
export const userProductivity = [

  {
    $lookup: {
      from: "designs",
      localField: "USER",
      foreignField: "USER",
      as: "designs",
    },
  },
  {
    $lookup: {
      from: "redesigns",
      localField: "USER",
      foreignField: "USER",
      as: "redesigns",
    },
  },
  {
    $unwind: {
      path: "$designs",
    },
  },
  {
    $unwind: {
      path: "$redesigns",
    },
  },
  {
    $group: {
      _id: {
        USER: "$USER",
        DATE: "$DATE",
      },
      LS3: {
        $sum: "$LS3",
      },
      ZEISS: {
        $sum: "$ZEISS",
      },
      SHAPE: {
        $sum: "$SHAPE",
      },
      COPY_MILL: {
        $sum: "$COPY_MILL",
      },
      FULL_ARCH: {
        $sum: "$FULL_ARCH",
      },
      IBO: {
        $sum: "$designs.IBO_DESINED",
      },
      CROWN_R: {
        $sum: "$designs.CROWN_REST",
      },
      CBR: {
        $sum: "$designs.CEMENTE_BRIDGE_REST",
      },
      FAP: {
        $sum: "$designs.FULL_ARCH_P",
      },
      FAF: {
        $sum: "$designs.FULL_ARCH_F",
      },
      IMP_R: {
        $sum: "$designs.IMPLANT_REST",
      },
      IMP_B_R: {
        $sum: "$designs.IMPLANT_BRIDGE_REST",
      },
      PRINT_M: {
        $sum: "$designs.PRINTED_MODELS",
      },
      IBO_R: {
        $sum: "$redesigns.IBO_DESINED",
      },
      CROWN_R_R: {
        $sum: "$redesigns.CROWN_REST",
      },
      CBR_R: {
        $sum: "$redesigns.CEMENTE_BRIDGE_REST",
      },
      FAP_R: {
        $sum: "$redesigns.FULL_ARCH_P",
      },
      FAF_R: {
        $sum: "$redesigns.FULL_ARCH_F",
      },
      IMP_R_R: {
        $sum: "$redesigns.IMPLANT_REST",
      },
      IMP_B_R_R: {
        $sum: "$redesigns.IMPLANT_BRIDGE_REST",
      },
    },
  },
  {
    $project: {
      _id: 1,
      LS3: 1,
      ZEISS: 1,
      SHAPE: 1,
      COPY_MILL: 1,
      FULL_ARCH: 1,
      IBO: 1,
      CROWN_R: 1,
      CBR: 1,
      FAP: 1,
      FAF: 1,
      IMP_R: 1,
      IMP_B_R: 1,
      PRINT_M: 1,
      IBO_R: 1,
      CROWN_R_R: 1,
      CBR_R: 1,
      FAP_R: 1,
      FAF_R: 1,
      IMP_R_R: 1,
      IMP_B_R_R: 1,
    },
  },
  {
    $sort: {
      _id: -1,
    },
  },
];

```
========================[ auth.routes.js ]========================
```
import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verify,
  getUsers,
  deleteUser,
  updateUser
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";



const routes = Router();

routes.get("/verify", verify);

routes.post("/register", validateSchema(registerSchema), register);

routes.delete("/deleteuser/:id",authRequired, deleteUser)

routes.put("/updateuser/:id",authRequired, updateUser)

routes.post("/login", validateSchema(loginSchema), login);

routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);

routes.get("/users", authRequired, getUsers);

export default routes;

```
========================[ queuevolume.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { post_queue_volume, get_queue_volume, update_queue_volume } from "../controllers/queuevolume.controller.js";


const routes = Router();

routes.post("/queuevolume", authRequired, post_queue_volume);
routes.get("/queuevolume",authRequired, get_queue_volume);
routes.put("/queuevolume/:id", authRequired, update_queue_volume);

export default routes;
```
========================[ registration.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getRegistrations,
  createRegistration,
  getRegistration,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registration.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRegistrationSchema } from "../schemas/production.schema.js";


const routes = Router();

//=====================[Get Registrations Routes]============================//
routes.get("/registration", authRequired, getRegistrations);

//=====================[Get Registration Routes by ID]=======================//
routes.get("/registration/:id", authRequired, getRegistration);

//=====================[Create Registration Routes]=========================//
routes.post(
  "/registration",
  authRequired,
  validateSchema(createRegistrationSchema),
  createRegistration
);
//===================[Delete Registration Routes]========================//
routes.delete("/registration/:id", authRequired, deleteRegistration);

//=====================[Update Registration Routes]=========================//
routes.put("/registration/:id", authRequired, updateRegistration);

export default routes;

```
========================[ userjobassigment.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {post_userJobAssignment, get_userJobAssignment, update_userJobAssignment} from "../controllers/userjobassigment.controller.js";


const routes = Router();

routes.post("/userJobAssignment", authRequired, post_userJobAssignment);
routes.get("/userJobAssignment",authRequired, get_userJobAssignment);
routes.put("/userJobAssignment/:id", authRequired, update_userJobAssignment);

export default routes;
```
========================[ auth.schema.js ]========================
```
import {z} from "zod";

export const registerSchema = z.object({
    username: z.string({ required_error: "Username is required" }),
    fname: z.string({ required_error: "First name is required" }),
    lname: z.string({ required_error: "Last name is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
    access: z.string({ required_error: "Access is required" }),
    color: z.string({ required_error: "Color is required" })
    
});


export const loginSchema = z.object({
    username: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" })
});



```
========================[ production.schema.js ]========================
```
import {z} from "zod";

export const createRegistrationSchema = z.object({
    IBO:z.number({required_error: "IBO is required"}),
    ABUT:z.number({required_error: "ABUT is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


```
