import { backendUrl } from "./Config";

//api call for unauthenticated user

export const makeUnauthenticatedPostRequest=async(route,body)=>{
    const response= await fetch(backendUrl+route,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"  
        },
        body:JSON.stringify(body)
    })
    const formattedResponse=await response.json()
    return formattedResponse;
}

//api call for authenticated user

export const makeAuthenticatedPostRequest=async(route,body)=>{
  const token=getToken()
  const response=await fetch(backendUrl+route,{
    method:'POST',
    headers:{
      "Content-Type":"application/json", 
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(body)
  })
  const formattedResponse = await response.json();
  return formattedResponse;
}
//get request for songs
export const makeAuthenticatedGetRequest=async(route)=>{
  const token=getToken()
  const response=await fetch(backendUrl+route,{
    method:'GET',
    headers:{
      "Content-Type":"application/json", 
      Authorization: `Bearer ${token}`,
    },
  })
  const formattedResponse = await response.json();
  return formattedResponse;
}

const getToken = () => {
  const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
  );
  return accessToken;
};