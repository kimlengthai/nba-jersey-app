// const User = require('../models/User');
// const mongoose = require('mongoose');

// const authorizeRole = (allowedRoles) => {
//   return async (req, res, next) => {
//     try {
//       const userId = req.header('x-user-id');
//       console.log("AuthorizeRole middleware: userId:", userId);

//       if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//         console.log("Invalid or missing user ID");
//         return res.status(400).json({ status: 'Error', message: 'Invalid or missing user ID' });
//       }

//       const user = await User.findById(userId);
//       if (!user) {
//         console.log("User not found for id:", userId);
//         return res.status(404).json({ status: 'Error', message: 'User not found' });
//       }

//       console.log("User role is:", user.role);
//       const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
//       if (!rolesArray.includes(user.role)) {
//         console.log("Access denied for role:", user.role);
//         return res.status(403).json({ status: 'Error', message: 'Access denied. Insufficient privileges.' });
//       }

//       req.user = user;
//       next();
//     } catch (err) {
//       console.error('Authorization error:', err);
//       res.status(500).json({ status: 'Error', message: 'Server error', error: err.message });
//     }
//   };
// };

// module.exports = authorizeRole;