import React, { Component } from 'react';
import "./PieChartMonth.scss"
import {Pie,Chart,ctx } from 'react-chartjs-2';
import colorschemes from "chartjs-plugin-colorschemes";
import config from "../config/development"

export default class BarChartMonth extends Component{
    constructor(props){
      super(props);
      this.state = {
          data : [],
          isLoading : true,
         
      }; 
    };

    componentDidMount(){
      fetch(config.apiMonthSort ,{
        method : "GET",
      })
      .then(res => {
        return res.json()})
      .then(res => {
        this.setState({
           data :res.groups,
           isLoading : false,
        })
      })
      .catch((err =>{
        console.error(err);
      }));
      
    };

    
     

render(){
  const {isLoading, data} = (this.state);
  const labels = [];
  const counts = [];
  const len = data.length;
  for (var i=0; i<len; i++){
    labels.push(
           data[i].name
      );
      counts.push(
        data[i].articlesCount
   );
  };
  return(
    
      
      <div>
          <div>
                  <div id="PieChartMonth"><p className ="title"> This Month Top Groups</p>
                     <Pie id="chart"
                     
                        data ={{   
                            datasets : [{   
                            
                                    data : counts,
                                options:{
                                    legend:{
                                        labels:{
                                            fontColor:"black",
                                             plugins:{
                                                colorschemes : {
                                                    sceme : "tableau.Classic20",
                                                    
                                            }
                                    }
                                }
                                }
                                }
                            }],

                            labels : labels ,
                            
                        }
                    }
                        
                        />
                    </div>
                        
                  
              
                </div>
</div>
)
}}
