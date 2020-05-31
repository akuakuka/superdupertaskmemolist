
export const getBackEndUrl = () => {
    let backendURL;
    if (process.env.NODE_ENV === "production") {
        backendURL = 'https://superdupertaskmemolist.herokuapp.com'
       
    } else {
        backendURL = "http://localhost:3000"
    } 
    return backendURL
}

