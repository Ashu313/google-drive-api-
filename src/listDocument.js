

import { Button, Input, Tooltip } from "antd";
//import Search from "antd/lib/transfer/search";
import { debounce } from "lodash";
import React from "react";
import { useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";

import "./list.css"



const {Search}=Input;
const link="www.googleapis.com/drive/v2/files/";
const AllFiles=[
        
    {
        title:'Name',
        dataIndex:'name',
        key:'name',
    }, 
  
    {
        title:'Last Modified Time',
        dataIndex:'modifiedTime',
        key:'ModifiedTime',
        
    },
    {
        title: 'Action',
        key: 'status',
        dataIndex: 'status',
        cell: (id) => (
        
          <span>
            <Tooltip title="View Document">
              <Button type="primary" ghost>
                {id}
              </Button>
            </Tooltip>
          </span>
        ),
      },
   

];
const FetchData=({signedInUser,handleSignOut,profile,document=[],onSearch,fetch})=>{
   const search=(value)=>{
    delayQuery(`name contains'${value}'`);
   }

const delayQuery=useCallback(
    debounce((q)=>onSearch(q),500),[]);

    return(
       
        <>

<div class="card">
    <img src={profile.getImageUrl()} ></img>
  <p>{profile.getName()}</p>
  <p>{profile.getEmail()}</p>


  
  <button type='button' onClick={handleSignOut} >signout</button>

</div>
  

<div>
          <Table striped bordered hover variant="dark" responsive="sm">
            <tbody>
                <tr>
                  <th>index</th>
                    <th>Name</th>
                    <th>Last Modified Time</th>
                    <th>preview</th>
                 
                </tr>
                {document.map((item, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td>{item.modifiedTime}</td>

  



                      
  
          <td>
          <a href={`https://drive.google.com/file/d/${item.id}/preview`}target='_blank'><Button type="button">view</Button></a>
            
            
             </td>
      
         
         
                       
                        
                       
                    </tr>
                ))}
            </tbody>
            </Table>
         
 
    </div>
  
    
        </>
    )
}

export default FetchData;