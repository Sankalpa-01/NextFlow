import mongoose, { Schema, model, models } from "mongoose";

const WorkflowSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the workflow"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    userId: {
      type: String, // This will store the Clerk User ID
      required: true,
      index: true,
    },
    // The "nodes" and "edges" are saved exactly as React Flow generates them
    nodes: {
      type: Array,
      default: [],
    },
    edges: {
      type: Array,
      default: [],
    },
    viewport: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      zoom: { type: Number, default: 1 },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// This ensures we don't redefine the model if it already exists
const Workflow = models.Workflow || model("Workflow", WorkflowSchema);

export default Workflow;