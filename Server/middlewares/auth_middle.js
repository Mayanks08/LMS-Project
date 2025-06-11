import  jwt  from "jsonwebtoken";
import AppError from "../utilis/error-utile.js";


export const isLoggedIn = async (req, _res , next) =>{
    const {token} =req.cookies;
    
    if(token){
        return next(new AppError("Unauthenticated, Please login again",401))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = userDetails;
    next()
}

export const authorizedRoles = (...roles) =>async (req, _res, next)=>{
    const currentUserRoles = req.user.roles
    if(!roles.includes(currentUserRoles)){
        return next(
            new AppError("You are not authorized to perform this action",401))
    }
    next()
};

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = async (req, _res, next) => {
    // If user is not admin or does not have an active subscription then error else pass
    const user = await User.findByID(req.user.id)
    if (user.role !== "ADMIN" && user.subscription.status !== "active") {
      return next(new AppError("Please subscribe to access this route.", 403));
    }
  
    next();
  };


