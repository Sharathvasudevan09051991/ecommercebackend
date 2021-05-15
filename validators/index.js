const { check, validationResult } = require('express-validator');

exports.userSignUpValidator = 
        [
            check('name', "Name is required").not().isEmpty(),
            check('email', "Please enter valid email ID").isEmail(),
            check('password','Password is required' ).not().isEmpty().isLength({min: 6}).withMessage("Must be 6 Digit")
        ];

        exports.authValidator = 
        [
            check('email', "Please enter valid email ID").isEmail(),
            check('password','Password is required' ).not().isEmpty()
        ];

        exports.categoryValidator = [
            check('category', "Please enter the category").not().isEmpty()
        ]
      