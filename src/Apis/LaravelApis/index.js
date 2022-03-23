import { postDataApi } from "../apis"



export const createNewuser = (data) => dispatch => new Promise((resolve, reject) => {
      data.password =`${data.email}${data.uid}`;
      postDataApi('register',data).then(response=>{
       resolve(response);
    }).catch(error=>reject(error))
})
