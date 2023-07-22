import {createStore,applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { AddJobReducers, AppliedJobReducers, DeleteJobReducers, EditJobReducers, JobByUserIdReducers, JobSingleReducers, loadJobReducers } from './reducers/jobreducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { AddJobTypeReducers, DeleteJobTypeReducers, EditJobTypeReducers, JobTypeSingleReducers, loadJobTypeReducers } from './reducers/jobtypereducer';
import { LogOut, UserDeleteReducer, UserEditReducer, UserLoadReducer, UserProfile, UserSignReducers, UserSignUpReducer, UserSingleReducer } from './reducers/userreducer';
//combining reducer
const reducer= combineReducers({
    loadJobTypeReducers:loadJobTypeReducers,
    loadJobByPostUserIdReducers:JobByUserIdReducers,
    jobTypeReducers:AddJobTypeReducers,
    jobTypeSingleReducers:JobTypeSingleReducers,
    editJobTypeReducers:EditJobTypeReducers,
    jobTypeDeleteReducers:DeleteJobTypeReducers,
    loadJobReucers:loadJobReducers,
    addJobReducers:AddJobReducers,
    editJobReducers:EditJobReducers,
    jobSingleReducers:JobSingleReducers,
    deleteJobReducers:DeleteJobReducers,
    userReducers:UserSignReducers,
    userLoadReducers:UserLoadReducer,
    userSignUpReducers:UserSignUpReducer,
    userEditReducers:UserEditReducer,
    userSingleReducers:UserSingleReducer,
    userDeleteReducers:UserDeleteReducer,
    logOut:LogOut,
    userProfile:UserProfile,
    appliedJobReducers:AppliedJobReducers
    
});

//initial state
const initialState={}

const middleware= [thunk];
const store= createStore(
    reducer,
    initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store



