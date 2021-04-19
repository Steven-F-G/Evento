import React from 'react';
import { isAuthenticated } from '../auth';
import { withRouter } from "react-router-dom";

const Footer = () => (
    <>
        {isAuthenticated() ? (
            <footer className="page-footer font-small blue mt-2" style={{backgroundColor: "#116466", width: "auto"}}>

                <div className="footer-copyright text-center py-3 text-light">© 2021 Copyright:
                    <a href="https://github.com/Steven-F-G/Evento" target="_blank"  rel="noreferrer"> CIP Team 11</a>
                </div>

            </footer>
        )
        :
        (
            <footer className="page-footer font-small blue fixed-bottom mt-2" style={{backgroundColor: "#116466", width: "auto"}}>

                <div className="footer-copyright text-center py-3 text-light">© 2021 Copyright:
                    <a href="https://github.com/Steven-F-G/Evento" target="_blank"  rel="noreferrer"> CIP Team 11</a>
                </div>

            </footer>
        )
        }
            
    </>
);

export default withRouter(Footer);
