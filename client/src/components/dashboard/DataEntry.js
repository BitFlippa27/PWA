import React from 'react';
import Proptypes from "prop-types";
import { connect } from "react-redux";

const DataEntry = ({allItems: {_id, name, username, birthdate, email}}) => 
    <div>
       <tr key={_id}> 
            <th  scope="col">{name}</th>
            <th  scope="col">{username}</th>
            <th  scope="col">{email}</th>
        </tr>
    </div>
                            
   


DataEntry.propTypes = { 
    data: Proptypes.object.isRequired
}
export default connect(null, {})(DataEntry);