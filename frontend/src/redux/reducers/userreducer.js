import { User_Delete_Fail, User_Delete_Request, User_Delete_Success, User_Edit_Fail, User_Edit_Request, User_Edit_Success, User_Fail, User_Load_Fail, User_Load_Request, User_Load_Success, User_LogOut_Fail, User_LogOut_Request, User_LogOut_Success, User_Request, User_SignUp_Fail, User_SignUp_Request, User_SignUp_Success, User_Sign_Fail, User_Sign_Request, User_Sign_Reset, User_Sign_Success, User_Single_Fail, User_Single_Request, User_Single_Success, User_Success } from "../constant/constant";

//sign in with Redux and axios
export const UserSignReducers=(state={users:[]},action)=>{
        switch(action.type){
            //request user
            case User_Sign_Request:
                return {loading:true };
            
            //success user
            case User_Sign_Success:
                return {
                    loading:false,
                    success:action.payload.success,
                    token:action.payload.token,
                    user:action.payload.user,
                    isAuthenticated:true,
                   
                };


            //fail user
            case User_Sign_Fail:
                return {loading:false };

            //reset user
            case User_Sign_Reset:
                return '';

            default:
                return state;
        }
}

//user sign up request with axios

export const UserSignUpReducer =(state={user:[]},action)=>{
    switch(action.type){

        //first sign up request
        case User_SignUp_Request:
            return ({
                loading:true
            });
        
        //sign up request success
        case User_SignUp_Success:
                return ({
                    loading:true,
                    user:action.payload.user
                });
        
        //sign up request error
        case User_SignUp_Fail:
                return ({
                        loading:false,
                        error:action.payload.error
                    });
        
        default :
          return state;
    }
}

//get all user 

export const UserLoadReducer = (state={users:[]},action)=>{
  switch(action.type){
      //user request
      case User_Load_Request:
        return {
            loading:true,
            
        };
    
    //user success 
    case User_Load_Success:
        return {
            loading:false,
            success:action.payload.success,
            totaluser:action.payload.totaluser,
            user:action.payload.users,
            count:action.payload.pageTotal
            
        }

    //user fail
    case User_Load_Fail:
        return {
            loading:true,
            error:action.payload.error
        }

    default :
     return state;
  }

}

//edit user by id
export const UserEditReducer =(state={user:[]},action)=>{
    switch(action.type){

        //first edit request
        case User_Edit_Request:
            return ({
                loading:true
            });
        
        //edit request success
        case User_Edit_Success:
                return ({
                    loading:true,
                    user:action.payload.user
                });
        
        //edit request error
        case User_Edit_Fail:
                return ({
                        loading:false,
                        error:action.payload.error
                    });
        
        default :
          return state;
    }
}

//single user by id
export const UserSingleReducer =(state={user:[]},action)=>{
    switch(action.type){

        //first single user request
        case User_Single_Request:
            return ({
                loading:true
            });
        
        //edit single user success
        case User_Single_Success:
                return ({
                    loading:false,
                    user:action.payload.user
                });
        
        //edit single user error
        case User_Single_Fail:
                return ({
                        loading:false,
                        error:action.payload.error
                    });
        
        default :
          return state;
    }
}


//delete user by id
export const UserDeleteReducer =(state={user:[]},action)=>{
    switch(action.type){

        //delete edit request
        case User_Delete_Request:
            return ({
                loading:true
            });
        
        //delete request success
        case User_Delete_Success:
                return ({
                    loading:true,
                    message:action.payload.message
                });
        
        //delete request error
        case User_Delete_Fail:
                return ({
                        loading:false,
                        error:action.payload.error
                    });
        
        default :
          return state;
    }
}


//user logout state
export const LogOut =(state='',action)=>{
        switch(action.type){

            //log out request
            case User_LogOut_Request:
                return {
                    loading:true,
                    
                };
            
            //log out success
            case User_LogOut_Success:
                return {
                    loading:false,
                    success:action.payload.success,
                    user:action.payload.user
                }

            //log out fail
            case User_LogOut_Fail:
                return {
                    loading:true,
                    error:action.payload.error
                }

            default :
             return state;
        }
}

//user profile 
export const UserProfile =(state='',action)=>{
    switch(action.type){

        //log out request
        case User_Request :
            return {
                loading:true,
                
            };
        
        //log out success
        case User_Success :
            return {
                loading:false,
                user:action.payload.user,
                count:action.payload.count
            }

        //log out fail
        case User_Fail :
            return {
                loading:true,
                error:action.payload.error
            }

        default :
         return state;
    }
}