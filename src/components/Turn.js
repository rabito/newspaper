import React from "react";
import $ from "jquery";
import PrismaZoom from 'react-prismazoom'

class Turn extends React.Component {
  static defaultProps = {
    style: {},
    className: "",
    options: {}
  };

  constructor (props) {
    super(props)
    this.state = {
      zoom: 4
    }
  }

  onZoomChange = zoom => {
    console.log(zoom);
  }

  onDoubleClickOnCard = event => {
    console.log("Disparando evento");
  }

  onClickOnZoomOut = event => {
    console.log("Quitando zoom");
  }

  onClickOnZoomIn = event => {
    console.log("Hacinedo zoom")
  }

  nextPage = (e) => {
    $(this.el).turn("next");
  }

  prevPage = (e) => {
    $(this.el).turn("previous");
  }

  firstPage = (e) => {
    $(this.el).turn("page", 1);
  }

  lastPage = (e) => {
    $(this.el).turn("page", $(".magazine").turn("pages"));
  }

  componentDidMount() {
    if (this.el) {
      $(this.el).turn(Object.assign({}, this.props.options));
    }
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown = event => {
    if (event.keyCode === 37) {
      $(this.el).turn("previous");
    }
    if (event.keyCode === 39) {
      $(this.el).turn("next");
    }
    if (event.keyCode === 27) {
      const prismaZoom = this.refs.prismaZoom;
      prismaZoom.reset()
    }
  };

  render() {
    return (
      <React.Fragment>
        <PrismaZoom onZoomChange={this.onZoomChange} ref="prismaZoom" maxZoom="3">
        <div
        className={this.props.className}
        style={Object.assign({}, this.props.style)}
        ref={el => (this.el = el)}
        onDoubleClick={this.onDoubleClickOnCard}
        >
        {this.props.children}
        </div>
        </PrismaZoom>

        <div id="footer">
          <div id="navcontainer">
              <ul id="navlist">
                  <li></li>
                  <li className="nav-front"><a onClick = {this.firstPage}></a></li>
                  <li className="nav-prev"><a onClick = {this.prevPage}></a></li>
                  <li id="pageNums">...</li>
                  <li className="nav-next"><a onClick = {this.nextPage}></a></li>
                  <li className="nav-back"><a onClick = {this.lastPage}></a></li><li></li>
              </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Turn;