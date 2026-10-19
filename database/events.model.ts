import mongoose, {Schema} from "mongoose";

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String
    },
    organiser: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true});

eventSchema.pre("save", function() {
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\p{L}]+/gu, "-")
        .replace(/^-|-$/g, "");
})

const Event = mongoose.models.Event ?? mongoose.model("Event", eventSchema);

export default Event;