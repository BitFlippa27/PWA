import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import  { loadData } from "../../actions/data";
import DataEntry from './DataEntry';
import data from '../../reducers/data';



const Dashboard = ({ auth: { user, loading }, loadData, data: { allItems } }) => {
    useEffect(() => {
        loadData();
    }, [loadData]);
    

    
    const rows = allItems;
    const columns = [
        {id:"username", label: "Username"},
        {id:"name", label: "Name"},
        {id:"bday", label: "Geburtstag"},
        {id:"email", label: "Email"}
    ];

  
   

    

    //return <div> Welcome {user  && user.name}</div>;
    //dont render UI until user is loaded so loader git in between
    return loading && user === null ? <Loader /> : 
    <Fragment>  
        <h1 className="large text-primary"> Dashboard </h1>
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
                    
                    </tr>
                </thead>
                <tbody>
                   {rows.slice(0,9).map(row => {
                       return (
                        <tr key={row._id}> 
                            <th  scope="col">{row.name}</th>
                            <th  scope="col">{row.username}</th>
                            <th  scope="col">{row.email}</th>
                        </tr>
                          
                       )
                   })}
                </tbody>    
            </table>
        </div>
       
                          
                   
                                
                                    
        
    </Fragment >
    

        
}
  



Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    loadData:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired 
}

const mapStateToProps =  state => ({
     auth: state.auth,
     data: state.data
     
    
     
});


export default connect(mapStateToProps, { loadData })(Dashboard);
