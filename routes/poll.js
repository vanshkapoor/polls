const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '752985',
    key: 'e16f298cc4293c836e8b',
    secret: 'ffacfd57a76f7eedaa35',
    cluster: 'ap2',
    encrypted: true
});


router.get('/',(req,res) =>{
    res.send("POLL");
});

router.post('/',(req,res)=>{

    pusher.trigger('poll', 'os-vote', {
        points:1,
        os:req.body.os
    });

    return res.json({ success: true, message: ' Thank you for voting '});
});


module.exports = router;

