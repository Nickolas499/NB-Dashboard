
  
    # Estructura del fichero:

src/
    app.js
    config.js
    db.js
    index.js
    test.js
    controllers/
        auth.controller.js
        designed.controller.js
        global.controller.js
        graph.controller.js
        redesigned.controller.js
        registration.controller.js
        scaned.controller.js
        work.controller.js
    libs/
        jwt.js
        processData.js
    middlewares/
        validateToken.js
        validator.middleware.js
    models/
        asignment.model.js
        customersupport.model.js
        dailyproduction.model.js
        design.model.js
        Jobasigment.model.js
        redesign.model.js
        registration.model.js
        safety.model.js
        scaned.model.js
        user.model.js
        workasignment.model.js
    pipeline/
        globalProductivity.pipeline.js
        userProductivity.pipeline.js
    routes/
        auth.routes.js
        designed.routes.js
        global.routes.js
        graph.routes.js
        redesigned.routes.js
        registration.routes.js
        scaned.routes.js
        work.routes.js
    schemas/
        auth.schema.js
        Zod.schema.js

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
import scaned from "./routes/scaned.routes.js";
import designed from "./routes/designed.routes.js";
import redesigned from "./routes/redesigned.routes.js";
import graph from "./routes/graph.routes.js";
import global from "./routes/global.routes.js";
import work from "./routes/work.routes.js";

//============================================================================//
//                      Express Server CONFIG                                 //
//============================================================================//
const app = express();


app.use(cors(
    {
        
        // origin: ["http://10.62.150.33:4000","http://10.62.150.33:3000","http://localhost:4000","http://10.62.150.33:5173","http://localhost:5173"],                
        //como aceptar todas los origenes
        origin: true,
        //como aceptar todas las credenciales 
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
app.use('/api', scaned)
app.use('/api', designed)
app.use('/api', redesigned)
app.use('/api', graph)
app.use('/api', global)
app.use('/api', work)

//============================================================================//
//                                  others                                    //
//============================================================================//

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })


export default app
```
========================[ config.js ]========================
```
export const TOKEN_SECRET = "NB_secret";
// export const IP = "192.168.1.43";
export const IP = "10.62.150.33";
// export const IP = "192.168.1.158";
export const PORT = 5000;
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
import {IP,PORT} from "./config.js";



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
import {TOKEN_SECRET} from "../config.js";


//==============================================================================//
//                                  REGISTER                                    //
//==============================================================================//
export const register = async (req, res) => {
  const { username, fname, lname, email, password, access, color } = req.body;

  try {

    const userFound = await User.findOne({ username });
    if(userFound) {
      return res.status(400).json(["User already exists" ]);
    }
    const emailFound = await User.findOne({ email });
    if(emailFound) {
      return res.status(400).json(["Email already exists"] );
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
    const { username,password } = req.body;
  
    try {
      const userFound = await User.findOne({ username });
      if (!userFound) {
        return res.status(404).json(["User not found" ]);
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

export const logout =  (req, res) => {
  res.cookie("token","",{
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
    return res.status(200).json({id: userFound._id,fname: userFound.fname, lname: userFound.lname, access: userFound.access}); 
}


export const verify =  async (req, res) => {
  
  const {token} = req.cookies;
  
  
  if (!token)return res.status(401).json(['Authorization denied']);

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
    const userFound = await User.find({},'_id fname lname color');
    // console.log(userFound);
    if (!userFound) {
      return res.status(404).json(["Users not found"]);
    }  
      return res.status(200).json(userFound); 
  
}
```
========================[ designed.controller.js ]========================
```
import Designed from "../models/design.model.js";

//==================================================================================//
//                       Get all Designed data                                        //
//==================================================================================//
export const getDesigned = async (req, res) => {
  //const scaneds = await Designed.find();
  const designed = await Designed.find({ USER: req.user.id }).sort({ createdAt: -1 });

  return res.json(designed);
};
//==================================================================================//
//                      create Designed data                                          //
//==================================================================================//
export const createDesigned = async (req, res) => {
  const {
    IBO_DESIGNED,
    CROWN_REST,
    CEMENTE_BRIDGE_REST,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_REST,
    IMPLANT_BRIDGE_REST,
    PRINTED_MODELS,
    DATE,
  } = req.body;
  console.log(req.body);
  const newDesigned = new Designed({
    IBO_DESIGNED,
    CROWN_REST,
    CEMENTE_BRIDGE_REST,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_REST,
    IMPLANT_BRIDGE_REST,
    PRINTED_MODELS,
    DATE,
    USER: req.user.id,
  });
  const DesignedSaved = await newDesigned.save();
  return res.json(DesignedSaved);
};
//==================================================================================//
//                       Get Designed data by ID                                      //
//==================================================================================//
export const getDesignedByID = async (req, res) => {
  const designed = await Designed.findById(req.params.id);
  if (!designed) return res.status(404).json(["Designed not found"]);
  return res.json(designed);
};
//==================================================================================//
//                       Update Designed data by ID                                   //
//==================================================================================//
export const updateDesigned = async (req, res) => {
  const designed = await Designed.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!designed) return res.status(404).json(["Designed not found"]);
  return res.json(designed);
};
//==================================================================================//
//                       Delete Designed data by ID                                   //
//==================================================================================//
export const deleteDesigned = async (req, res) => {
  const designed = await Designed.findByIdAndDelete(req.params.id);
  if (!designed) return res.status(404).json(["Designed not found"]);
  return res.status(204).json();
};

```
========================[ global.controller.js ]========================
```
import Scaned from "../models/scaned.model.js";
import Designed from "../models/design.model.js";
import processData from "../libs/processData.js";


//============================((GLOBAL DATA))=================================================//
// returns all data  from scaned and designed data                                            //
//============================================================================================//
export const GlobalData = async (req, res) => {
  try {
    const ScanedData = await Scaned.find({});
    const DesignedData = await Designed.find({});
    if (!ScanedData || !DesignedData) {
      return res.status(404).json(["Data not found"]);
    }

    return res.json(processData(ScanedData, DesignedData));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }
};


//============================((USER DATA))===================================================//
// returns all data for each user  from scaned and designed data                              //
//============================================================================================//
export const UserData = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const ScanedData = await Scaned.find({ USER: id });
    const DesignedData = await Designed.find({ USER: id });
    if (!ScanedData || !DesignedData) {
      return res.status(404).json(["Data not found"]);
    }
    return res.json(processData(ScanedData, DesignedData));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }
};


//============================((PRODUCTIVITY DATA))===========================================//
// returns the  sum of designed data                                                          //
//============================================================================================//


export const ProductivityData = async (req, res) => {
  try {
    
    const productivity = await Designed.aggregate([
      { $group: {
          _id: '$DATE',
          total: { $sum: '$IBO_DESIGNED' + '$CROWN_REST' + '$CEMENTE_BRIDGE_REST' + '$FULL_ARCH_P' + '$FULL_ARCH_F' + '$IMPLANT_REST' + '$IMPLANT_BRIDGE_REST' + '$PRINTED_MODELS' }
      }}
    ])
    if (!productivity) {
      return res.status(404).json(["Data not found"]);
    }
    return res.json(processData(productivity));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }
}

```
========================[ graph.controller.js ]========================
```
import Scaned from "../models/scaned.model.js";
import {globalProductivity} from "../pipeline/globalProductivity.pipeline.js";
import {userProductivity} from "../pipeline/userProductivity.pipeline.js";


export const getGlobalData = async (req, res) => {   
    const GlobalProData = await Scaned.aggregate(globalProductivity);
    return res.json(GlobalProData);
}

// export const getUserData = async (req, res) => {
//     const UserProData = await Scaned.aggregate(userProductivity);
//     return res.json(UserProData);
// }


export const getUserData = async (req, res) => {     
    try {
        const userprodata = await Scaned.aggregate(userProductivity);
        if (!userprodata || userprodata.length === 0) {
            return res.status(404).json(["User not found"]);
        }        
        return res.json(userprodata);
    } catch (error) {
        return res.status(500).json(["Internal server error"]);
    }
};
```
========================[ redesigned.controller.js ]========================
```
import Redesigned from "../models/redesign.model.js";

//==================================================================================//
//                       Get all Redesigned data                                        //
//==================================================================================//
export const getRedesigned = async (req, res) => {
  //const scaneds = await Redesigned.find();
  const redesigned = await Redesigned.find({ USER: req.user.id }).sort({ createdAt: -1 });

  return res.json(redesigned);
};
//==================================================================================//
//                      create Redesigned data                                          //
//==================================================================================//
export const createRedesigned = async (req, res) => {
  const {
    IBO_DESIGNED,
    CROWN_REST,
    CEMENTE_BRIDGE_REST,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_REST,
    IMPLANT_BRIDGE_REST,    
    DATE,
  } = req.body;
  console.log(req.body);
  const newRedesigned = new Redesigned({
    IBO_DESIGNED,
    CROWN_REST,
    CEMENTE_BRIDGE_REST,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_REST,
    IMPLANT_BRIDGE_REST,    
    DATE,
    USER: req.user.id,
  });
  const RedesignedSaved = await newRedesigned.save();
  return res.json(RedesignedSaved);
};
//==================================================================================//
//                       Get Redesigned data by ID                                      //
//==================================================================================//
export const getRedesignedByID = async (req, res) => {
  const redesigned = await Redesigned.findById(req.params.id);
  if (!redesigned) return res.status(404).json(["Redesigned not found"]);
  return res.json(redesigned);
};
//==================================================================================//
//                       Update Redesigned data by ID                                   //
//==================================================================================//
export const updateRedesigned = async (req, res) => {
  const redesigned = await Redesigned.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!redesigned) return res.status(404).json(["Redesigned not found"]);
  return res.json(redesigned);
};
//==================================================================================//
//                       Delete Redesigned data by ID                                   //
//==================================================================================//
export const deleteRedesigned = async (req, res) => {
  const redesigned = await Redesigned.findByIdAndDelete(req.params.id);
  if (!redesigned) return res.status(404).json(["Redesigned not found"]);
  return res.status(204).json();
};

```
========================[ registration.controller.js ]========================
```
import Registration from "../models/registration.model.js";


//==================================================================================//
//                Get all registrations data                                        //
//==================================================================================//
export const getRegistrations = async (req, res) => {
  //const registrations = await Registration.find();
  const registrations = await Registration.find({ USER: req.user.id }).sort({ createdAt: -1 });

  return res.json(registrations);
};
//==================================================================================//
//               create registrations data                                          //
//==================================================================================//
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
//==================================================================================//
//                Get registrations data by ID                                      //
//==================================================================================//
export const getRegistration = async (req, res) => {
  try{
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json(["Registration not found"]);
    return res.json(registration);
  }catch (error){
    return res.status(404).json(["Registration not found"]);

  }
};
//==================================================================================//
//                Update registrations data by ID                                   //
//==================================================================================//
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
//==================================================================================//
//                Delete registrations data by ID                                   //
//==================================================================================//
export const deleteRegistration = async (req, res) => {
  console.log(req.params.id);
  const registration = await Registration.findByIdAndDelete(req.params.id);
  if (!registration) return res.status(404).json(["Registration not found"]);
  return res.status(204).json();
};

```
========================[ scaned.controller.js ]========================
```
import Scaned from "../models/scaned.model.js";

// //==================================================================================//
// //                       Get all Scaned data for graphics                           //
// //==================================================================================//
// export const getAllScanedData = async (req, res) => {
//   const AllScaned = await Scaned.find({});
//   return res.json(AllScaned);
// };

//==================================================================================//
//                       Get  Scaned data                                           //
//==================================================================================//
export const getScaned = async (req, res) => {
 
  const scaned = await Scaned.find({ USER: req.user.id }).sort({ createdAt: -1 });

  // console.log(graphicsScaned);

  return res.json({scaned });
};
//==================================================================================//
//                      create Scaned data                                          //
//==================================================================================//
export const createScaned = async (req, res) => {
  const { LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH, DATE } = req.body;
  const newScaned = new Scaned({
    LS3,
    ZEISS,
    SHAPE,
    COPY_MILL,
    FULL_ARCH,
    DATE,
    USER: req.user.id,
  });
  const ScanedSaved = await newScaned.save();
  return res.json(ScanedSaved);
};
//==================================================================================//
//                       Get Scaned data by ID                                      //
//==================================================================================//
export const getScanedByID = async (req, res) => {
  const scaned = await Scaned.findById(req.params.id);
  if (!scaned) return res.status(404).json(["Scaned not found"]);
  return res.json(scaned);
};
//==================================================================================//
//                       Update Scaned data by ID                                   //
//==================================================================================//
export const updateScaned = async (req, res) => {
  const scaned = await Scaned.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!scaned) return res.status(404).json(["Scaned not found"]);
  return res.json(scaned);
};
//==================================================================================//
//                       Delete Scaned data by ID                                   //
//==================================================================================//
export const deleteScaned = async (req, res) => {
  const scaned = await Scaned.findByIdAndDelete(req.params.id);
  if (!scaned) return res.status(404).json(["Scaned not found"]);
  return res.status(204).json();
};

```
========================[ work.controller.js ]========================
```
import workasingment from "../models/workasignment.model.js";
import jobasigment from "../models/Jobasigment.model.js";
//=====================================((CREATE WORK CONTROLLER))==============================================//
export const createWork = async (req, res) => {
    const { LS3, ZEISS, SHAPE,IBO_DESIGN, DIGI_ABUT, PHIS_ABUT, FULL_ARCH, DATE } = req.body;
    console.log(req.body);
    const newWork = new workasingment({
      LS3,
      ZEISS,
      SHAPE,
      IBO_DESIGN,
      DIGI_ABUT,
      PHIS_ABUT,
      FULL_ARCH,
      DATE,      
    });
    const WorkSaved = await newWork.save();
    return res.json(WorkSaved);
  };

//=====================================((GET WORK CONTROLLER))==============================================//

export const getWork = async (req, res) => {
  const work = await workasingment.findOne({}, {
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
    return res.json(work);
  
}

//=====================================((UPDATE WORK CONTROLLER))==============================================//
export const updateWork = async (req, res) => {
  const work = await workasingment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!work) return res.status(404).json(["Work not found"]);
  return res.json(work);
}


//=====================================((CREATE JOB ASIGNMENT))==============================================//

export const createJobAssignment = async (req, res) => {
  const { LS3, ZEISS, SHAPE, IBO_DESIGN, DIGI_ABUT, PHIS_ABUT, FULL_ARCH,DAY_OFF, DATE } = req.body;
  console.log(req.body);
  const newJobAsingment = new jobasigment({
    LS3,
    ZEISS,
    SHAPE,
    IBO_DESIGN,
    DIGI_ABUT,
    PHIS_ABUT,
    FULL_ARCH,
    DAY_OFF,
    DATE      
  });
  const WorkSaved = await newJobAsingment.save();
  return res.json(WorkSaved);
}

//=====================================((GET JOB ASIGNMENT))==============================================//
export const getJobAssignment = async (req, res) => {
  const job = await jobasigment.findOne({}, {
    _id: 0, 
    LS3: 1,
    ZEISS: 1,
    SHAPE: 1, 
    IBO_DESIGN: 1,
    DIGI_ABUT: 1,
    PHIS_ABUT: 1,
    FULL_ARCH: 1,    
    DATE: 1
  }).sort({createdAt: -1 });
    return res.json(job);
}

//=====================================((UPDATE JOB ASIGNMENT))==============================================//
export const updateJobAssignment = async (req, res) => {
  const job = await jobasigment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
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
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({message: 'No Token Authorization denied'});
    }
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({message: 'Invalid token'});
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
========================[ asignment.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const AsingmentShema = new mongoose.Schema({
    LS3: {type: Boolean},
    ZEISS: {type: Boolean},
    SHAPE: {type:Boolean},
    IBOS: {type: Boolean},
    DIGI_ABUT: {type: Boolean},
    PHIS_ABUT: {type: Boolean},
    FULL_ARCH: {type: Boolean},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Asingment = mongoose.model("Asingment", AsingmentShema);
export default Asingment
```
========================[ customersupport.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const ProductionSupportShema = new mongoose.Schema({
    SEND_TO_PRO:{type: Number},
    REMAINING_IN_PRO:{type: Number},   
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const ProductionSupport = mongoose.model("ProductionSupport", ProductionSupportShema);
export default ProductionSupport
```
========================[ dailyproduction.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const DailyProductionShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type:Number},
    IBOS: {type: Number},
    DIGI_ABUT: {type: Number},
    PHIS_ABUT: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const DailyProduction = mongoose.model("DailyProduction", DailyProductionShema);
export default DailyProduction
```
========================[ design.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const DesignShema = new mongoose.Schema({
    IBO_DESIGNED: {type: Number},
    CROWN_REST: {type: Number},
    CEMENTE_BRIDGE_REST: {type: Number},
    FULL_ARCH_P: {type: Number},
    FULL_ARCH_F: {type: Number},
    IMPLANT_REST: {type: Number},
    IMPLANT_BRIDGE_REST: {type: Number},
    PRINTED_MODELS: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Designed = mongoose.model("Design", DesignShema);

export default Designed
```
========================[ Jobasigment.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const JobasigmentShema = new mongoose.Schema({
    LS3: {type: Object},
    ZEISS: {type: Object},
    SHAPE: {type:Object},
    IBO_DESIGN: {type: Object},
    DIGI_ABUT: {type: Object},
    PHIS_ABUT: {type: Object},
    FULL_ARCH: {type: Object},
    DAY_OFF: {type: Object},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    
}, {
    versionKey: false,
    timestamps: true
})

const jobasigment = mongoose.model("jobasigment", JobasigmentShema);
export default jobasigment
```
========================[ redesign.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const RedesignShema = new mongoose.Schema({
    IBO_DESIGNED: {type: Number},
    CROWN_REST: {type: Number},
    CEMENTE_BRIDGE_REST: {type: Number},
    FULL_ARCH_P: {type: Number},
    FULL_ARCH_F: {type: Number},
    IMPLANT_REST: {type: Number},
    IMPLANT_BRIDGE_REST: {type: Number},    
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Redesigned = mongoose.model("Redesign", RedesignShema);

export default Redesigned
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
========================[ safety.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const SafetyShema = new mongoose.Schema({
    SAFETY: {type: Number},
    KAMISHIBAI: {type: Number},
    REMAKED: {type: Number},
    DELAYS: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Safety = mongoose.model("Safety", SafetyShema);
export default Safety
```
========================[ scaned.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const ScanedShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type: Number},
    COPY_MILL: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Scaned = mongoose.model("Scaned", ScanedShema);
export default Scaned
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
}, {versionKey: false,
    timestamps: true
});



export default mongoose.model('User', userShema);




```
========================[ workasignment.model.js ]========================
```
import mongoose from "mongoose";
import moment from "moment";

const WorkAsingmentShema = new mongoose.Schema({
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
const workasingment = mongoose.model("workasingment", WorkAsingmentShema);
export default workasingment
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
  getUsers
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";



const routes = Router();

routes.get("/verify", verify);

routes.post("/register", validateSchema(registerSchema), register);

routes.post("/login", validateSchema(loginSchema), login);

routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);

routes.get("/users", authRequired, getUsers);

export default routes;

```
========================[ designed.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getDesigned, createDesigned, getDesignedByID, updateDesigned, deleteDesigned } from "../controllers/designed.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createDesignedSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        create designed Routes                           //
//=============================================================================//
routes.post(
  "/designed",
  authRequired,
  validateSchema(createDesignedSchema),
  createDesigned
);
//=============================================================================//
//                        Get designed Routes                             //
//=============================================================================//
routes.get("/designed", authRequired, getDesigned);
//=============================================================================//
//                      Get designed Routes by ID                          //
//=============================================================================//
routes.get("/designed/:id", authRequired, getDesignedByID);

//=============================================================================//
//                           Delete designed Routes                        //
//=============================================================================//
routes.delete("/designed/:id", authRequired, deleteDesigned);
//=============================================================================//
//                          Update designed Routes                         //
//=============================================================================//
routes.put("/designed/:id", authRequired, updateDesigned);

export default routes;

```
========================[ global.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { GlobalData, UserData, ProductivityData } from "../controllers/global.controller.js";

const routes = Router();

//=======================================================================//
//                            Get Graph Routes                           //
//=======================================================================//
routes.get("/global", authRequired,  GlobalData);


routes.get("/userdata/:id", authRequired, UserData);


routes.get("/productivity", authRequired, ProductivityData);
export default routes;
```
========================[ graph.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getGlobalData, getUserData } from "../controllers/graph.controller.js";

const routes = Router();

//=============================================================================//
//                        Get Graph Routes                             //
//=============================================================================//
routes.get("/globaprodata", authRequired, getGlobalData);

routes.get("/userprodata", authRequired, getUserData);

export default routes;
```
========================[ redesigned.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getRedesigned, createRedesigned, getRedesignedByID, updateRedesigned, deleteRedesigned } from "../controllers/redesigned.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRedesignedSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        create redesigned Routes                           //
//=============================================================================//
routes.post(
  "/redesigned",
  authRequired,
  validateSchema(createRedesignedSchema),
  createRedesigned
);
//=============================================================================//
//                        Get redesigned Routes                             //
//=============================================================================//
routes.get("/redesigned", authRequired, getRedesigned);
//=============================================================================//
//                      Get redesigned Routes by ID                          //
//=============================================================================//
routes.get("/redesigned/:id", authRequired, getRedesignedByID);

//=============================================================================//
//                           Delete redesigned Routes                        //
//=============================================================================//
routes.delete("/redesigned/:id", authRequired, deleteRedesigned);
//=============================================================================//
//                          Update redesigned Routes                         //
//=============================================================================//
routes.put("/redesigned/:id", authRequired, updateRedesigned);

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
import { createRegistrationSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        Get Registrations Routes                             //
//=============================================================================//
routes.get("/registration", authRequired, getRegistrations);
//=============================================================================//
//                      Get Registration Routes by ID                          //
//=============================================================================//
routes.get("/registration/:id", authRequired, getRegistration);
//=============================================================================//
//                        create Registration Routes                           //
//=============================================================================//
routes.post(
  "/registration",
  authRequired,
  validateSchema(createRegistrationSchema),
  createRegistration
);
//=============================================================================//
//                           Delete Registration Routes                        //
//=============================================================================//
routes.delete("/registration/:id", authRequired, deleteRegistration);
//=============================================================================//
//                          Update Registration Routes                         //
//=============================================================================//
routes.put("/registration/:id", authRequired, updateRegistration);

export default routes;

```
========================[ scaned.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  // getAllScanedData,
  getScaned,
  createScaned,
  getScanedByID,
  updateScaned,
  deleteScaned,
} from "../controllers/scaned.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createScanedSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        create scaned Routes                                 //
//=============================================================================//
routes.post(
  "/scaned",
  authRequired,
  validateSchema(createScanedSchema),
  createScaned
);
//=============================================================================//
//                        Get All scaned Data                             //
//=============================================================================//
// routes.get("/scaneds", authRequired, getAllScanedData);
//=============================================================================//
//                        Get scaned Routes                             //
//=============================================================================//
routes.get("/scaned", authRequired, getScaned);
//=============================================================================//
//                      Get scaned Routes by ID                          //
//=============================================================================//
routes.get("/scaned/:id", authRequired, getScanedByID);
//=============================================================================//
//                           Delete scaned Routes                        //
//=============================================================================//
routes.delete("/scaned/:id", authRequired, deleteScaned);
//=============================================================================//
//                          Update scaned Routes                         //
//=============================================================================//
routes.put("/scaned/:id", authRequired, updateScaned);

export default routes;

```
========================[ work.routes.js ]========================
```
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createWork, getWork, updateWork } from "../controllers/work.controller.js";
import { createJobAssignment, getJobAssignment, updateJobAssignment } from "../controllers/work.controller.js";

const routes = Router();

routes.post("/workasignment", authRequired, createWork);
routes.get("/workasignment",authRequired, getWork);
routes.put("/workasignment/:id", authRequired, updateWork);

routes.post("/jobasignment", authRequired, createJobAssignment);
routes.get("/jobasignment",authRequired, getJobAssignment);
routes.put("/jobasignment/:id", authRequired, updateJobAssignment);

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
========================[ Zod.schema.js ]========================
```
import {z} from "zod";

export const createRegistrationSchema = z.object({
    IBO:z.number({required_error: "IBO is required"}),
    ABUT:z.number({required_error: "ABUT is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createScanedSchema = z.object({
    LS3:z.number({required_error: "LS3 is required"}),
    ZEISS:z.number({required_error: "ZEISS is required"}),
    SHAPE:z.number({required_error: "3SHAPE is required"}),
    COPY_MILL:z.number({required_error: "COPY MILL is required"}),
    FULL_ARCH:z.number({required_error: "FULL ARCH is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createDesignedSchema = z.object({
    IBO_DESIGNED:z.number({required_error: "IBO_DESIGNED is required"}),
    CROWN_REST:z.number({required_error: "CROWN_RESTORATION is required"}),
    CEMENTE_BRIDGE_REST:z.number({required_error: "CEMENTE_BRIDGE_RESTORATION is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    IMPLANT_REST:z.number({required_error: "IMPLANT_RESTORATION is required"}),
    IMPLANT_BRIDGE_REST:z.number({required_error: "IMPLANT_BRIDGE_RESTORATION is required"}),
    PRINTED_MODELS:z.number({required_error: "PRINTED_MODELS is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createRedesignedSchema = z.object({
    IBO_DESIGNED:z.number({required_error: "IBO_DESIGNED is required"}),
    CROWN_REST:z.number({required_error: "CROWN_RESTORATION is required"}),
    CEMENTE_BRIDGE_REST:z.number({required_error: "CEMENTE_BRIDGE_RESTORATION is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    IMPLANT_REST:z.number({required_error: "IMPLANT_RESTORATION is required"}),
    IMPLANT_BRIDGE_REST:z.number({required_error: "IMPLANT_BRIDGE_RESTORATION is required"}),    
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})
```
