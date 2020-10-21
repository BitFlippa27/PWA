import React, { Fragment } from 'react';
import Proptypes from "prop-types";
import { connect } from "react-redux";


const DataItem = ({data: {_id, username, name, email}}) =>
    <Fragment>
        <tr key={_id}> 
                <th  scope="col">{name}</th>
                <th  scope="col">{username}</th>
                <th  scope="col">{email}</th>
            </tr>
    </Fragment>

                            
   


DataItem.propTypes = { 
    data: Proptypes.object.isRequired
}
export default connect(null, {})(DataItem);