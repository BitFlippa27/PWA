import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import  { loadData } from "../../actions/data";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";



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
        <div class="table-responsive"> 
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                    <th scope="col">Geburtstag</th>
                    <th scope="col">Email</th>
                    
                    </tr>
                </thead>
                <tbody>
                   {rows.map(row => {
                       return (
                          
                           <tr key={row.code}>
                               {columns.map(column => {
                                   const value = row[column.id]
                                   return (
                                        <form>
                                            <th key={column.id} align={column.align}>
                                            <div className="form-group">
                                            <input type="text"
                                            class="form-control" 
                                            id="formGroupExampleInput"
                                            placeholder={column.format && typeof value === 'date' ? column.format(value) : value}/>
                                            
                                            </div>
                                                
                                            </th>
                                       </form>
                                   )
                               })}
                           </tr>
                       )
                   })}
                   
                </tbody>
            </table>
        </div>

        
    </Fragment >
    

        
}

const columns = [
    {id:"username", label: "Username", minWidth:130},
    {id:"name", label: "Name", minWidth:130},
    {id:"address", label: "Adresse", minWidth:130},
    {id:"birthdate", label: "Geburtstag", minWidth:130},
    {id:"email", label: "Email", minWidth:130}
];

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

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
