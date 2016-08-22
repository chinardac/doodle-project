import {Router} from 'express';

const router = new Router();

router.use('/usercollection', (req, res, next) => {
    console.log('user collection call!');

    var user = req.db.collection('usercollection').find();

    console.log(user);
});

module.exports = router;
