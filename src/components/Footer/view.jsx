import React from "react";
//import { connect } from "react-redux";
import styles from "../../styles/stylesgenerales";

class Footer extends React.Component {

  render() {
    return (
        <footer>
            <div className="footer col-12" style={{textAlign:"center",paddingTop:10}}>
                <span style={styles.footerText}>Asociación Chilena de Seguridad</span>
            </div>
       </footer>
    );
  }
}

export default (Footer);

