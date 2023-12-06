import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    summary: { type: String, required: true },
    frameworks: [
        {
            name: { type: String, required: true },
            level: { type: String, required: true },
            year: { type: Number, required: true }
        }
    ],
    hobbies: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true }
        }
    ]
});

export default mongoose.model("Info",infoSchema);
