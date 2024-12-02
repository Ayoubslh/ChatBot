const express =require('express');
const Controller=require('./../Controller/AllController')
const router= express.Router()

router.route('/chat').post(Controller.Generate);

module.exports =router;