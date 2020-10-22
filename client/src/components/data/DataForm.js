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
        if(!formData) return;
        insertData(formData);
        setFormData({username:"", name:"", email:""});

    }

    return (
        <Fragment>
                <tr className="formcells">
                    <th>
                        <form className="form "onSubmit={e => onSubmit(e)}>
                           
                                <input 
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
                        <form className="form "onSubmit={e => onSubmit(e)}>
                           
                                <input 
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
                            <form className="form "onSubmit={e => onSubmit(e)}>
                                
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        name="email"
                                        placeholder="Email" 
                                        value={email}
                                        onChange={e => onChange(e)}
                                    >   
                                    </input>
                               
                            </form>
                        </th>

                        <th>
                        <form className="form "onSubmit={e => onSubmit(e)}>
                            <input type="submit" className="btn btn-primary" value="Submit" />
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
