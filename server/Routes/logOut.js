const express = require('express');
const logoutRoute = express.Router();

logoutRoute.post('/', (req,res,next)=>{
    req.logOut((err)=>{
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Logout failed',
                Error: err.message
            });
        }

        req.session.destroy((err) =>{
            if (err){
                console.error('Error destroying session:', err);
                return res.status(500).json({
                    success: false, 
                    message: 'Could not destroy session' 
                })
            }

            res.clearCookie('connect.sid');

            return res.json({
                success: true,
                message: 'Logged out successfully'
            })
        })
    })
});

module.exports = logoutRoute;