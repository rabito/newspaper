//import React, { useRef, useEffect} from "react";
import React from "react";
import $ from "jquery";

class Footer extends React.Component {
    
    render() {
        return (
        <div id="footer">
            <div id="navcontainer">
                <ul id="navlist">
                    <li></li>
                    <li class="nav-front"><a onClick={this.handleSubmit}></a></li>
                    <li class="nav-prev"><a href=""></a></li>
                    <li id="pageNums">...</li>
                    <li class="nav-next"><a href=""></a></li>
                    <li class="nav-back"><a href=""></a></li><li></li>
                </ul>
            </div>
        </div>
        );
    }
};

export default Footer;