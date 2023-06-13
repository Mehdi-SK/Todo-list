import mongoose from "mongoose";



const TodoSchema = new mongoose.Schema({
    text:{
        // Todo body
        type:String,
        required: true,

    },
    complete:{
        // Completion state
        type:Boolean,
        default: false,
    },
    timestamp:{
        // Creation time
        type: String,
        default: Date.now()
    }
});

// create the model from the schema
const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;