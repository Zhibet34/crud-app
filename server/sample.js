const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const PlaningSchema = new mongoose.Schema({
    title: String,
    photo: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    body: String,
    address: String,
    favorite: Number
});

const Planing = mongoose.model('DatePlaning', PlaningSchema);

var sampleData = new Planing({
    title: 'sample example title',
    photo: 'https://media.cntraveler.com/photos/675375966ce4439b0881d86f/3:2/w_2560%2Cc_limit/2Z9A8039.jpg',
    author: 'amadou bah',
    body: 'one of the best restaurant in the united states. the store is known for seafood',
    address: '123 main street',
    favorite: 5
})

var sampleData = new Planing({
    title: 'sample example title',
    photo: 'https://media.cntraveler.com/photos/675375966ce4439b0881d86f/3:2/w_2560%2Cc_limit/2Z9A8039.jpg',
    author: 'amadou bah',
    body: 'one of the best restaurant in the united states. the store is known for seafood',
    address: '123 main street',
    favorite: 5
})

var sampleData2 = new Planing({
    title: 'sample example title 2',
    photo: 'https://www.opentable.com/blog/wp-content/uploads/sites/108/2024/03/e8fb3270bc607697c9f26cee7fb48488.webp',
    author: 'jone done',
    body: 'one of the best restaurant in the united states. the store is known for steak',
    address: '452 main street',
    favorite: 4,
})

async function initialize() {
    try {
        await Planing.deleteMany({}).then(()=>{
            console.log('the database is empty')
        })
        await sampleData.save()
        await sampleData2.save().then(()=>{
            console.log('the new information saved')
        })
    } catch (error) {
        console.log(error)
    }
}

initialize()

module.exports = Planing;