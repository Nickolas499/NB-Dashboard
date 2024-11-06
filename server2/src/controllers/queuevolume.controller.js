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


