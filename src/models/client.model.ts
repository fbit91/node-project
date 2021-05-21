import mongoose, { Schema } from "mongoose";

export interface IClient extends mongoose.Document {
  name: string;
  id: string;
  secret: string;
  userId: string;
}

// Schema
const ClientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IClient>("Client", ClientSchema);
