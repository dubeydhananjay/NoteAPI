const noteModel = require("../models/note")

const createNote = async (req, res) => {
    const {title, desc} = req.body
    const newNote = new noteModel(
        {
            title: title,
            desc: desc,
            userId: req.userId
        }
    )

    try {
        await newNote.save()
        res.status(201).json(newNote)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
        
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id
    try {
        const note = await noteModel.findByIdAndDelete(id)
        res.status(202).json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}

const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, desc } = req.body;
    const update = { title, desc };
  
    try {
        const updated = await noteModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

const getNotes = async (req, res) => {

    try {
        const notes = await noteModel.find({userId: req.userId})
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
 
}

module.exports = {createNote, deleteNote, updateNote, getNotes}