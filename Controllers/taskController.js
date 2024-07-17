const tasks = require('../Models/taskSchema')

exports.addTask = async (req, res) => {
    const { title, startDate, dueDate, description } = req.body;

    try {
        
        if (!title || !startDate || !dueDate || !description) {
            return res.status(400).json({ message: "Please fill the form completely" });
        }

        
        const newTask = new tasks({
            title,
            startDate,
            dueDate,
            description
        });

        
        await newTask.save();

       
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Failed to add task. Please try again later." });
    }
};


exports.getAllTask = async (req, res) => {

    try {
        const allTask = await tasks.find();
        res.status(200).json(allTask)

    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}



exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await tasks.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await tasks.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Delete operation failed', error });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, startDate, dueDate, description } = req.body;
    try {
        const updatedTask = await tasks.findByIdAndUpdate(
            id,
            { title, startDate, dueDate, description },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
