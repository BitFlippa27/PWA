import React from 'react'
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { connect } from 'react-redux';
import { loadUser } from "../../actions/auth";


const Dashboard = ({ auth: { user }}) => {
    useEffect(() => {
        loadUser();
    }, []);
    
    return <div> Welcome {user  && user.name}</div>;
}

Dashboard.propTypes = {
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps =  state => {
    const auth = { auth: state.auth }
    console.log(state)
    return auth;
};
    


export default connect(mapStateToProps, { loadUser })(Dashboard);
