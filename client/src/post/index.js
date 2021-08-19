const axios = require("axios")

export const post = (data) =>{
    console.log({data})
    return  axios.post("http://localhost:3001/activity",{...data})
            .then(res=> console.log(res))
            .catch((err)=> console.error(err))
}