import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from '../auth';
import DefaultProfile from '../images/avatar.png';
import { useMediaQuery } from 'react-responsive';


const isActive = (history, path) => {
    if (history.location.pathname === path)
    {
        return {color: "#000000"}
    }
    else 
    {
        return {color: "#ffffff"}
    }
};

const Menu = ({history}) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1350px)'
    })

    return(
    <div className="row" style={{backgroundColor: "#116466", width: "auto"}}>
            <div className="col-md-1 text-center" style={{}}>
                <div className="btn-group">
                    <Link className="nav-link" to="/" style={isActive(history, "/")} >
                        <i className="fa fa-home fa-2x text-light" style={{paddingTop: '15%', borderRadius:"50%"}}>
                            
                        </i>
                    </Link>   

                </div>
                
            </div>

            <div className="col-md-1 text-center" style={{}}>
                <Link className="nav-link" to="/users" style={isActive(history, "/users")} >
                    <i className="fa fa-users fa-2x text-light" style={{paddingTop: '15%', borderRadius:"50%"}}>
                        
                    </i>    
                </Link>  
            </div>

            {!isAuthenticated() ? (
                <>
                    <div className="col-md-1 text-center" style={{}}>
                        <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}  >
                            <i className="fa fa-sign-in fa-2x text-light" style={{paddingTop: '15%', borderRadius:"50%"}}>
                                
                            </i>
                        </Link>                    
                    </div>

                    <div className="col-md-1 text-center" style={{}}>
                        <Link className="nav-link" to="/signup" style={isActive(history, "/signup")} >
                            <i className="fa fa-plus-circle fa-2x text-light" style={{paddingTop: '15%', borderRadius:"50%"}}>
                                
                            </i>
                        </Link>
                    </div>
                </>
            )
            :
            (
                <>
                    <div className="col-md-1 text-center" style={{}}>
                        <Link className="nav-link" to={`/user/findpeople/${isAuthenticated().user._id}`} style={(isActive(history, `/user/findpeople/${isAuthenticated().user._id}` ))}>
                            <i className="fa fa-user-plus fa-2x text-light" style={{paddingTop: '15%', borderRadius:"50%"}}>
                                
                            </i>
                        </Link>
                    </div>

                    <div className="col-md-1 text-center" style={{}}>
                        <Link className="nav-link" to={`/user/post/new/${isAuthenticated().user._id}`} style={(isActive(history, `/user/post/new/${isAuthenticated().user._id}` ))}>
                            <i className="fa fa-plus-square fa-2x text-light" style={{paddingTop: '15%', borderRadius:"50%"}} />
                        </Link>
                    </div>


                    { isDesktopOrLaptop ? (
                        <>
                            <div className="col-md-6 text-center" style={{}}></div>

                            <div className="col-md-2 text-center" style={{}}>
                                <div className="btn-group text-center" style={{ width:"100%"}}> 
                                    <button className="btn dropdown-toggle" type="button" id="ex2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{}}>
                                        <img 
                                            className="float-left mr-2" 
                                            style={{height: "40px", width: "40px", borderRadius: "50%"}}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}`} 
                                            alt={isAuthenticated().user.name} 
                                            onError={i => (i.target.src = `${DefaultProfile}`)}  
                                        />                        
                                        <label className="lead text-light mt-2">{isAuthenticated().user.name}</label>   
                                    </button>

                                    <div className="dropdown-menu dropdown-menu-left" aria-labelledby="ex2"  style={{ backgroundColor: "#2f7f80",width: "100%"}}>
                                        <Link className="dropdown-item" to={`/user/${isAuthenticated().user._id}`} style={(isActive(history, `/user/${isAuthenticated().user._id}` ))}>
                                            <i className="fa fa-user fa-2x text-dark" style={{borderRadius:"50%"}} >
                                                <label className="lead text-dark ml-2 mb-2" style={{fontSize: "0.75em"}}>
                                                    {"   "}Profile
                                                </label>
                                            </i> 
                                        </Link>

                                        <span className="dropdown-item" style={(isActive(history, "/signin"), {cursor: "pointer", color: "#fff"})} onClick={() => signout(() => history.push("/"))}>
                                            <i className="fa fa-power-off fa-2x text-dark" style={{borderRadius:"50%"}} >
                                                <label className="lead text-dark ml-2 mb-2" style={{fontSize: "0.75em"}}>
                                                    {"   "}Sign Out
                                                </label>
                                            </i> 
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="col-md-5 text-center" style={{}}></div>

                            <div className="col-md-3 text-center" style={{}}>
                                <div className="btn-group text-center" style={{ width:"100%"}}> 
                                    <button className="btn dropdown-toggle" type="button" id="ex2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{}}>
                                        <img 
                                            className="float-left mr-2" 
                                            style={{height: "40px", width: "40px", borderRadius: "50%"}}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}`} 
                                            alt={isAuthenticated().user.name} 
                                            onError={i => (i.target.src = `${DefaultProfile}`)}  
                                        />                        
                                        <label className="lead text-light mt-2">{isAuthenticated().user.name}</label>   
                                    </button>

                                    <div className="dropdown-menu dropdown-menu-left" aria-labelledby="ex2"  style={{backgroundColor: "#2f7f80", width: "100%"}}>
                                        <Link className="dropdown-item" to={`/user/${isAuthenticated().user._id}`} style={(isActive(history, `/user/${isAuthenticated().user._id}` ))}>
                                            <i className="fa fa-user fa-2x text-light" style={{borderRadius:"50%"}} >
                                                <label className="lead text-light ml-2 mb-2" style={{fontSize: "0.75em"}}>
                                                    {"   "}Profile
                                                </label>
                                            </i> 
                                        </Link>

                                        <span className="dropdown-item" style={(isActive(history, "/signin"), {cursor: "pointer", color: "#fff"})} onClick={() => signout(() => history.push("/"))}>
                                            <i className="fa fa-power-off fa-2x text-light" style={{borderRadius:"50%"}} >
                                                <label className="lead text-light ml-2 mb-2" style={{fontSize: "0.75em"}}>
                                                    {"   "}Sign Out
                                                </label>
                                            </i> 
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                    }
                    
                </>
            )
            }

            
        
    </div>
    )
};


// withRouter is a higher order component. It accepts componant as an argument
export default withRouter(Menu);
