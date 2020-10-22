import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import  { loadData } from "../../actions/data";
import DataItem from "./DataItem";
import DataForm from "./DataForm"




const Data = ({ auth: { user, loading }, loadData, data: { allData } }) => {
    useEffect(() => {
        loadData();
    }, [loadData]);
    
    const rows = allData;
    //return <div> Welcome {user  && user.name}</div>;
    //dont render UI until user is loaded so loader git in between
    return (loading && user === null) || (allData.length === 0) ? <Loader /> : 
    <Fragment>  
        <h1 className="large text-primary"> Alle Daten </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Willkommen {user && user.name}
        </p>
        
        <div className="table-responsive"> 
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th key={rows.username} scope="col">Username</th>
                        <th key={rows.name} scope="col">Name</th>
                        <th key={rows.email} scope="col">Email</th>
                        <th key={rows.email} scope="col">Aktion</th>
                    
                    </tr>
                </thead>
                <tbody>
                   {rows.slice(rows.length-5, rows.length).map((row, index) => 
                       <DataItem key={index} index={index} data={row}/>
                   )}
                    
                        <DataForm /> 
                      
                     
                </tbody>
               
                
               
                   
            </table>
            
         
                    
               
            
        </div>
       
                       
                          
                       
                          
                   
                                
                                    
        
    </Fragment >
    

        
}
  



Data.propTypes = {
    auth: PropTypes.object.isRequired,
    loadData:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
     auth: state.auth,
     data: state.data
     
    
     
});


export default connect(mapStateToProps, { loadData })(Data);
 
  
   

    

