import Info from '../models/info.js';

export const getInfo = async (req, res) => {
    try {
        const info = await Info.find();
        res.status(200).send(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

export const updateInfo = async (req, res) => {
    const newData = req.body;

    try {
        const updatedInfo = await Info.findOneAndUpdate({}, newData, { new: true });

        if (!updatedInfo) {
            return res.status(404).json({ message: 'Info not found' });
        }

        res.status(200).json(updatedInfo);
    } catch (error) {
        res.status(500).json({ message: `Error updating info: ${error.message}` });
    }
};

// Controlador para actualizar hobbies
export const updateHobby = async (req, res) => {
    const { hobbies } = req.body;
  
    try {
      const updatedInfo = await Info.findOneAndUpdate({}, { $set: { hobbies } }, { new: true });
  
      if (!updatedInfo) {
        return res.status(404).json({ message: 'Info not found' });
      }
  
      res.status(200).json(updatedInfo);
    } catch (error) {
      res.status(500).json({ message: `Error updating hobbies: ${error.message}` });
    }
  };
  
  // Controlador para actualizar frameworks
  export const updateFramework = async (req, res) => {
    const { frameworks } = req.body;
  
    try {
      const updatedInfo = await Info.findOneAndUpdate({}, { $set: { frameworks } }, { new: true });
  
      if (!updatedInfo) {
        return res.status(404).json({ message: 'Info not found' });
      }
  
      res.status(200).json(updatedInfo);
    } catch (error) {
      res.status(500).json({ message: `Error updating frameworks: ${error.message}` });
    }
  };
  

export const deleteFramework = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedFramework = await Info.findOneAndUpdate(
            { "frameworks._id": _id },
            { $pull: { "frameworks": { _id } } },
            { new: true }
        );

        if (!deletedFramework) {
            return res.status(404).json({ message: 'Framework not found' });
        }

        res.status(200).json(deletedFramework);
    } catch (error) {
        console.error('Error al eliminar el framework:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export const deleteHobby = async (req, res) => {
    const { _id } = req.params;

    try {
        const updatedInfo = await Info.findOneAndUpdate(
            { "hobbies._id": _id },
            { $pull: { "hobbies": { _id } } },
            { new: true }
        );

        if (!updatedInfo) {
            return res.status(404).json({ message: 'Hobby not found' });
        }

        res.status(200).json(updatedInfo);
    } catch (error) {
        res.status(500).json({ message: `Error deleting hobby: ${error.message}` });
    }
};