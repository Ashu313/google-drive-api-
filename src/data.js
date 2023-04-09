import React from "react";

import { gapi } from "gapi-script";
import { Drawer } from "antd";
import { useState } from "react";
import FetchData from "./listDocument";
import User from "./userpage/user";
import Front from "./frontpage/front";
//import { gkebackup_v1 } from "googleapis";
 

const CLIENT_ID=process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY=process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


let check=true;
const Data=()=>{
    const[signedInUser,setSignedIn]=useState(false);
    const[isVisible,setVisible]=useState(false);
    const [profile,setProfile]=useState(false);
    const [document,setDocuments]=useState([]);
    const [fetch,SetFetch]=useState(false);
   
    const[isLoading,setIsLoading]=useState(false);


  const FetchFiles=(searchTerm=null)=>{

    gapi.client.drive.files.list({
        pageSize:10,
        fields:'nextPageToken,files(id,name,mimeType,modifiedTime,size)',
       
        q:"mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
    }).then(function(response)
    {
        const res=JSON.parse(response.body);
        setDocuments(res.files);
        console.log(res.files);
    })
  }

const handleAuthClick=(event)=>{
    gapi.auth2.getAuthInstance().signIn()
    document([]);
  //  updateSignIn(isSignedIn);
   // check=true;
}



const updateSignIn=(isSignedIn)=>{
   
       
      
    if(isSignedIn)
    {
        setSignedIn(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile());
        var profile=gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        setProfile(profile);
        FetchFiles();
        check=false;
     
    }
    else
    {
        if(!check)
        {
            console.log("signout");
            handleSignOut();
            console.log("signout");
             check=true;
           
            
        }
        else if(check)
        {
            console.log("signin");

            handleAuthClick();
    
           
       
        
        }
      //  handleAuthClick();
    }
        //console.log(profile);
       // console.log('ID: ' + profile.getId());
       // console.log('Full Name: ' + profile.getName());
        //console.log('Given Name: ' + profile.getGivenName());
        //console.log('Family Name: ' + profile.getFamilyName());
        //console.log('Image URL: ' + profile.getImageUrl());
        //console.log('Email: ' + profile.getEmail());
        
        //console.log("eehhee");
      
      
        //console.log(file);
      
    
     
      
    
       

    
}


const handleSignOut=(event)=>{
    console.log("ahahahhahaha");
    setVisible(false);
    gapi.auth2.getAuthInstance().signOut();
  //  check=false;
  
    setSignedIn(false);
  //  handleAuthClick();
 
 //   updateSignIn(false);
    console.log('logout succesfull');
   
 }

const InitClient=()=>{
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        
    }).then(
        function()
        {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignIn);

            updateSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());

        }
    )
}

const HandleClientLoad=()=>{
    gapi.load('client:auth2',InitClient);
};

return(
    <>
   
 {signedInUser
    ? <FetchData
    visible={isVisible}
      signedInUser={signedInUser}
      onSearch={FetchFiles}
      profile={profile}
      document={document}
      fetch={fetch}
  handleSignOut={handleSignOut}
  />:
  <Front
  HandleClientLoad={HandleClientLoad}
   />
    
 }

    </>
)

}
export default Data;
