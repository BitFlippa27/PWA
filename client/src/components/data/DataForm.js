import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { insertData } from "../../actions/data";

const DataForm = ({insertData}) => {
    const [formData, setFormData] = useState({
        username:"",
        name:"",
        email:""
    });
    const { username, name, email} = formData;

    const onChange = e => 
        setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();
        insertData(username, name, email);
    }

    return (
        <Fragment>
            
                <tr>
                
                    <th>
                    
                    <form onSubmit={e => onSubmit(e)}>
                        <input onSubmit={e => onSubmit(e)}
                            className="form-control" 
                            type="text" 
                            name="username"
                            placeholder="Username" 
                            value={username}
                            onChange={e => onChange(e)}
                            >   
                        </input>
                        </form>
          
                    
                    </th>
                    <th>
                    
                    <form onSubmit={e => onSubmit(e)}>
                        <input onSubmit={e => onSubmit(e)}
                            className="form-control" 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={name}
                            onChange={e => onChange(e)}
                            >
                        </input>
                        </form>
                 
                    </th>
                    <th>
                
                    <form onSubmit={e => onSubmit(e)}>
                        <input onSubmit={e => onSubmit(e)}
                            className="form-control" 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={email}
                            onChange={e => onChange(e)}
                            >
                        </input>
                        </form>
                      
                
                    </th>
                    
                </tr>
               
                <tr>
                    <th>
                    <form onSubmit={e => onSubmit(e)}>
                        <input  type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                    </th>
                    
                </tr>
               
            
        </Fragment>
        
    )
}

DataForm.propTypes = {
    insertData: PropTypes.func.isRequired

}

export default connect(null, {insertData})(DataForm);
