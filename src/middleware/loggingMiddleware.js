export default function logger({ getState }) {
    return next => action => {
       console.log('action', action);
       const returnVal = next(action);
    //    console.log('state when action is dispatched', getState()); 
       return returnVal;
    }
 }