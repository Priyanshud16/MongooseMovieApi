const express =require("express")
const MoviesModel = require("./movies.scema")

const moviesRouter=express.Router()



moviesRouter.get('/',async(req,res)=>{
    try {
        const movies= await MoviesModel.find()
        res.send(movies)
    } catch (error) {
        console.log(err)
    }
})

moviesRouter.post('/',async(req,res)=>{
    const {title,poster}=req.body
    try {
        const movies=new MoviesModel({title,poster})
        await movies.save()
        res.status(201).send("Movies is Created successfully")
    } catch (error) {
        
    }
})

moviesRouter.patch('/:id', async (req, res) => {
    const { title } = req.body;
    try {
        await MoviesModel.findByIdAndUpdate(req.params.id, { title });
        res.status(201).send("Movie updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating movie");
    }
});

moviesRouter.delete('/:id', async (req, res) => {
    const { title } = req.body;
    try {
        await MoviesModel.findByIdAndDelete(req.params.id, { title });
        res.status(201).send("Movie updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating movie");
    }
});


moviesRouter.get('/',async(req,res)=>{
    try {
        let query={}

        if(req.query.title){
            query.title={$regex: new RegExp(req.query.title,'i')}
        }
        

        if (req.query.q) {
            const searchRegex = new RegExp(req.query.q, 'i');
            query.$or = [{ title: { $regex: searchRegex } }];
        }

        const movies = await MoviesModel.find(query);
        res.send(movies);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=moviesRouter