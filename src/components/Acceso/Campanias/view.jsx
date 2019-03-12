import React from "react";
import { Gallery } from "devextreme-react";
import login1 from "../../../images/login1.png";
import login2 from "../../../images/login2.png";

class Campanias extends React.Component {
  render() {
    return (
      <center>
        <div className="zero col-12" style={{ backgroundColor:"#004A52"}}>
            <Gallery
              style={{backgroundColor:"#0C652F"}}
              height="100vh"
              width="100%"
              loop={true}
              slideshowDelay={2000}
              showNavButtons={true}
              showIndicator={true}
              dataSource={[login1,login2
              ]}
              stretchImages={true}
            />
        </div>
      </center>
    );
  }
}

export default Campanias;

