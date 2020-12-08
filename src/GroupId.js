import React, { Component } from 'react';
import './App.scss';
import "bootstrap";
import Sidebar from './Sidebar';
import config from "./config/development";



export default class GroupId extends Component{
    constructor(props){
      super(props);
      this.state = {
          data : [],
          isLoading : true,
        
    }; 
 };

 componentDidMount(){
  fetch(config.apiUrl,{
  method : "GET",
})
.then(res => res.json(res))
  .then(res => {
      const newData=[
          ...res._embedded.articles.reduce((acc, item)=>{
              for (let group of item.group){
                  acc.add(group.id);
              }
              return acc;
          },new Set())
      ];
      
      console.log(newData);
     
    this.setState({
        data : newData,
       isLoading : false,
        
       
    })
    
  })
  .catch((err =>{
    console.error(err);
  }));
  
};
    

render(){
  const {isLoading , data} = (this.state);
  return(
          
            <div id="background">
                {isLoading ? (
                  <div className="cssload-tetrominos">
                    <div className="cssload-tetromino cssload-box1"></div>
                    <div className="cssload-tetromino cssload-box2"></div>
                    <div className="cssload-tetromino cssload-box3"></div>
                    <div className="cssload-tetromino cssload-box4"></div>
                  </div>
                  ) :(
                    
            <div className=" bg-dark text-white">   
              <div className ="navbar navbar-expand-lg mt-2 ">
              
              <a className="navbar-brand " href="#">M0n5ter Crawler</a>
              <Sidebar/>
              
</div>
            <div id="bg-dark"> 
           
            {data.map((article)=>(
              
                    <div>
                      hiiiiiiiiiiiiiii
                        <div className ="groups">
                          {article.groups.map((gr)=>(
                            <div id="groups">
                              <div className="badge badge-success">
                                <div key={gr.id} id ="group_Name" className="">{gr.id}
                                
                                  {/* <div id ="group_Id" className=""> ID: {gr.id} aliases:  {gr.aliases}</div> */}
                                  <div id ="group_Aliases" className="card-body"></div>
                                  </div>
                                      {/* <div id ="group_Desc" className="card-body">group description : {gr.description}</div> 
                                      
                                     <div id ="group_Last_Scan" className="card-body">group last scan : {gr.lastScan}</div> */}
                                  
                              </div>
                          </div>        
              ))}
              
              
                        {/* <div className="card">
                            <a href ={"" + article.url} id ="article_Url" target="_blank" rel="noopener noreferrer" className="card link"> website link</a><br/>
                            <a href = {article._links.self.href} id="article_linksHref" target="_blank"  rel="noopener noreferrer" className="card link">  json link</a><br/>
                            <a href = {article._links.article.href} id="article_Href" target="_blank"  rel="noopener noreferrer" className="card link"> db link</a><br/>
                            <a href = {article._links.groups.href} id="article_GroupsHref" target="_blank"  rel="noopener noreferrer" className="card link"> group db link</a>
                        
                        </div> */}
              
              </div>
              </div>
              
              
              ))
            }  
            </div>
            </div>
            
            
            )   
          }
          
        </div>
        

        
        )
  }
}