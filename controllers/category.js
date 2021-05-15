const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const category = await new Category({
            name : req.body.name,
            slug: slugify(req.body.name)
        })
       
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error"); 
    }
}

exports.list = async (req, res) => {
 try {
     const categories = await Category.find().sort({createdAt: -1}).exec();
     res.json(categories)
 } catch (error) {
     console.log(error);
     return res.status(500).send("Server Error");
 }
}

exports.read = async (req, res) => {
try {
    const category = await Category.findOne({slug: req.params.slug});
    if(!category){
        return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category)
} catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
}
}

exports.update = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            {slug: req.params.slug},
            {name : req.body.name,
             slug: slugify(req.body.name)},
             {new: true}
             )
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (error) {
         console.log(error);
         return res.status(500).send("Server Error");
    }

}