const mongoose = require ('mongoose')
const {Schema} = mongoose

const scoreSchema = new Schema({
    player: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    score_easy: Number,
    score_med: Number,
    score_hard: Number,
    score_ext: Number

})

const ScoreModel = mongoose.model ('Score', scoreSchema);

module.exports = ScoreModel;