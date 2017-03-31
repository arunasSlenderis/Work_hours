import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  client: {
    type: String,
    trim: true
  },
  dueDate: {
    type: String,
    required: true,
    default: String(Date.now).substr(0, 10)
  },
  hoursWorked: {
    type: Number,
    required: true,
    default: 0
  }
});

const Project = mongoose.model("project", projectSchema);

export default Project;
