import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useEffect from "react";

const Dashboard = ({auth: { user }}) => {
    return <div> Welcome {user.name}</div>;
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps =  state => ({
    auth: state.auth,
    user: state.auth.user
});
    


export default connect(mapStateToProps)(Dashboard);
