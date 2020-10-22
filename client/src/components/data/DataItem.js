import React, { Fragment } from 'react';
import Proptypes from "prop-types";
import { connect } from "react-redux";


const DataItem = ({data: {_id, username, name, email}, index}) =>
    <Fragment>
        <tr key={index}> 
                <th  scope="col">{name}</th>
                <th  scope="col">{username}</th>
                <th  scope="col">{email}</th>
                <th  scope="col">
                 
                        <button className="actions"><i className="fas fa-pencil-alt" />{' '}</button>
                        <button className="actions"><i className="fas fa-trash-alt" />{' '}</button>
                        
                
                </th>
            </tr>
    </Fragment>
                    
                   

                            
   


DataItem.propTypes = { 
    data: Proptypes.object.isRequired
}
export default connect(null, {})(DataItem);