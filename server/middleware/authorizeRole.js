const User = require('../models/User');

const authorizeRole = (allowedRoles) => 
{
  return async (req, res, next) => 
    {
        try 
        {
            // You could expect a userId sent via header, query, or body
            const userId = req.headers['x-user-id'] || req.query.userId || req.body.userId;
            if (!userId) 
            {
                return res.status(401).json({ message: 'User ID required for authorization' });
            }

            // Fetch user from DB
            const user = await User.findById(userId);
            if (!user) 
            {
                return res.status(401).json({ message: 'User not found' });
            }

            // Check if user's role is allowed
            if (!allowedRoles.includes(user.role)) 
            {
                return res.status(403).json({ message: 'Access denied: insufficient permissions' });
            }

            // Attach user to request for downstream if needed
            req.user = user;
            next();
            } 
            catch (error) 
            {
                console.error('Authorization error:', error);
                res.status(500).json({ message: 'Server error during authorization' });
            }
  };
};


module.exports = authorizeRole;