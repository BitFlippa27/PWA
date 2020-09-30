import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';


const Dashboard = ({ auth: { user, loading }}) => {
    //return <div> Welcome {user  && user.name}</div>;
    //dont render UI until user is loaded so loader git in between
    return loading && user === null ? <Loader /> : <Fragment>  
        <h1 className="large text-primary"> Dashboard </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Willkommen {user && user.name}
        </p>
    </Fragment >;
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps =  state => ({
     auth: state.auth 
});


export default connect(mapStateToProps)(Dashboard);