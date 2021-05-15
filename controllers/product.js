const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');



exports.productId = async (req, res, next) => {
  try {
    await Product.findById(req.params.productId).exec((err, product) => {
      if(err || !product){
        return res.status(400).json({msg : 'Product not found'})
      }else{
        req.product = product
        next();
      }
    })
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }


exports.createProduct = (req, res) => {
   try {
       let form = new formidable.IncomingForm()
       form.keepExtensions = true
       form.parse(req, (err, fields, files) => {
        if(err){
            return status(400).json({error:  'Images cannot be uploaded'})
        }
        let product = new Product(fields)
        if(files.photo){
             product.photo.data = fs.readFileSync(files.photo.path);
             product.photo.contentType = files.photo.type;   
        }
        product.save((err, result) => {
            if(err){
                return res
                .status(400)
                .json({error: err.message})
             }
             res.json(result)
        })
       }) 
   } catch (error){
    console.log(error.message)
    return res
    .status(500)
    .send('Server Error')
}
}


exports.read =  (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

      exports.removeProduct = async (req, res) => {
          try{
            let product = req.product;
            product.remove((err, deletedProduct) => {
              if(err){
                return res.status(400).json({msg : err.message})
              }
              res.json({deletedProduct, "message": 'Product deleted successfully'});
            })

          }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
      }

      exports.updateProduct = (req, res) => {
        console.log("req: ", req.params.productId)

          try {
              let form = new formidable.IncomingForm()
              form.keepExtensions = true;

              form.parse(req, (err, fields, files) => {
                if(err){
                    return status(400).json({error:  'Images cannot be uploaded'})
                }

                let product = req.product;
                console.log("PRODUCT: ", product)
                product = _.extend(product, fields)
                if(files.photo){
                    console.log("PATH: ",files.photo)
                    product.photo.data = fs.readFileSync(files.photo.path);
                    product.photo.contentType = files.photo.type;   
               }
               product.save((err, result) => {
                   if(err){
                       return res
                       .status(400)
                       .json({error: err.message})
                    }
                    res.json(result)
               })
              }) 
          } catch (error){
           console.log(error.message)
           return res
           .status(500)
           .send('Server Error')
       }
       }

       exports.allProduct = async (req, res) => {
         try {
           const products = await Product.find().sort({date: -1});
           res.json(products);

         } catch (error){
          console.log(error.message)
          return res
          .status(500)
          .send('Server Error')
      }
       }
       

       