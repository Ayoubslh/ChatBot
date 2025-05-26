const express =require('express');
const Controller=require('../Controller/promptController')
const deepseek=require('../Controller/deepseek')
const router= express.Router()

router.route('/chat').post(Controller.Generate);
// router.route('/deepseek').post(deepseek.Generate);

module.exports =router;