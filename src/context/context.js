import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //Requests
  const [requests, setRequests] = useState(0);

  //Errors
  const [error,setError] = useState({show:false, msg:""});

  //Search Users Request
  const searchGithubUser = async(user)=>{
    toggleError(); //So that error message removed when a valid user is search after error

    const response = await axios(`${rootUrl}/users/${user}`)
    .catch(err => console.log(err));

    if(response){
      setGithubUser(response.data);
      const {login} = response.data;

      //Used to solve the issue of delay in fetching the different requests
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${rootUrl}/users/${login}/followers?per_page=100`)
      ])
      .then((results) => {
        const [repos, followers] = results;
        if(repos.status === 'fulfilled'){
          setRepos(repos.value.data);
        }
        if(followers.status === 'fulfilled'){
          setFollowers(followers.value.data);
        }
      })

    }else{
      toggleError(true,"User not found");
    }
  }

  //Check Rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({data})=> {
        let {rate:{remaining}} = data;
        setRequests(remaining);
        if(remaining === 0){
          toggleError(true,"Sorry, you have exceeded your hourly rate limit");
        }
      })
      .catch((err)=> console.log(err));
  }

  //Errors
  function toggleError(show=false,msg=''){
    setError({
      show,
      msg
    })
  }

  useEffect(checkRequests,[])

  return (
    <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGithubUser}}>
      {children}
    </GithubContext.Provider>
  );
}

export {GithubProvider, GithubContext};
