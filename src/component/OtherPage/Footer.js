import React from "react";
import "../../css/OtherPage/Footer.css"

function Footer(){
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-con">
                    <div className="footer-option">
                        <p>ABOUT</p>
                        <div className="option-info">
                            <p>about us</p>
                            <p>our charter</p>
                            <p>stats</p>
                            <p>press</p>
                            <p>jobs</p>
                        </div>
                    </div>
                    <div className="footer-option">
                        <p>SUPPORT</p>
                        <div className="option-info">
                            <p>help center</p>
                            <p>our rule</p>
                            <p>creator resources</p>
                            <p>forward funds</p>
                            <p>brand assets</p>
                        </div>
                    </div>
                    <div className="footer-option">
                        <p>MORE FROM KICKSTARTER</p>
                        <div className="option-info">
                            <p>newsletter</p>
                            <p>kickstarter project updates</p>
                            <p>The Creative Independent</p>
                            
                        </div>
                    </div>
                </div>
                <div className="version-show">
                    <p>Kickstarter,PBC@2023</p>
                </div>
            </div>
        </div>
    )
}

export default Footer

