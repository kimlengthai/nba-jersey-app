const User = require('../models/User');

const authorizeRole = (allowedRoles) => 
{
    // Return a middleware function
    return async (req, res, next) => 
        {
            try 
            {
                // Attempt to retrieve user ID from headers, query parameters, or request body
                const userId = req.headers['x-user-id'] || req.query.userId || req.body.userId;

                // If no userId is found, deny access
                if (!userId) 
                {
                    return res.status(401).json({ message: 'User ID required for authorization' });
                }

                // Fetch user from DB using the ID
                const user = await User.findById(userId);

                // If user is not found, return an unauthorized error
                if (!user) 
                {
                    return res.status(401).json({ message: 'User not found' });
                }

                // Check if user's role is allowed in the list of allowed roles
                if (!allowedRoles.includes(user.role)) 
                {
                    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
                }

                // Attach user to request for downstream if needed
                req.user = user;
                // Proceed to the next middleware or route handler
                next();
                } 
                catch (error) 
                {
                    // Handle unexpected errors during the authorization process
                    console.error('Authorization error:', error);
                    res.status(500).json({ message: 'Server error during authorization' });
                }
    };
};

module.exports = authorizeRole;

// Rec: Instead of using x-user-id in headers, consider using JTW tokens for authentication and decoding the user ID from the token
// Always validate user input (e.g., userId) before querying the database