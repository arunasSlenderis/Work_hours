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
    type: Date,
    required: true,
    default: Date.now
  },
  hoursWorked: {
    type: Number,
    required: true
  }
});

const Project = mongoose.model("project", projectSchema);

export default Project;
