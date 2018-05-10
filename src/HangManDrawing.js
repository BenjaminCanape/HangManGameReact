import React, { Component } from "react";
import PropTypes from "prop-types";

//the const which will be used to know the part of the hanged man to draw
const HEAD = 1;
const BODY = 2;
const LEFT_ARM = 3;
const RIGHT_ARM = 4;
const LEFT_FOOT = 5;
const RIGHT_FOOT = 6;

/*
 * Component HangedMan: It allows to draw the hanged man in 6 different steps 
 */
class HangManDrawing extends Component {
  static defaultProps = {
    bodyElement: 0,
  };

  static propTypes = {
    bodyElement: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { bodyElement: props.bodyElement };
  }

  /*
     * The Initial state of the drawing will be drawn after the component mount 
     */
  componentDidMount(props) {
    this.drawHangedMan(this.state);
  }

  /*
   * When the component receive props, the next step of the drawing will be drawn
   */
  componentWillReceiveProps(props) {
    this.drawHangedMan(props);
  }

  /*
   * The function which will draw the hanged man
   * props.bodyElement is needed and must be number
   */
  drawHangedMan(props) {
    //configuration of the canvas
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = 5;

    let canvasWidthMiddle = canvas.width / 2;

    context.beginPath();

    //The  drawing will change with every step
    switch (props.bodyElement) {
      case HEAD:
        context.arc(canvasWidthMiddle, 75, 30, 0, 2 * Math.PI, false);
        break;

      case BODY:
        context.moveTo(canvasWidthMiddle, 105);
        context.lineTo(canvasWidthMiddle, 220);
        break;

      case LEFT_FOOT:
        context.moveTo(canvasWidthMiddle, 220);
        context.lineTo(canvasWidthMiddle - 50, 270);
        break;

      case RIGHT_FOOT:
        context.moveTo(canvasWidthMiddle, 220);
        context.lineTo(canvasWidthMiddle + 50, 270);
        break;

      case LEFT_ARM:
        context.moveTo(canvasWidthMiddle, 150);
        context.lineTo(canvasWidthMiddle - 50, 120);
        break;

      case RIGHT_ARM:
        context.moveTo(canvasWidthMiddle, 150);
        context.lineTo(canvasWidthMiddle + 50, 120);
        break;

      default:
        context.moveTo(0, 350);
        context.lineTo(200, 350);
        context.moveTo(20, 0);
        context.lineTo(20, 350);
        context.moveTo(20, 0);
        context.lineTo(canvasWidthMiddle, 0);
        context.moveTo(canvasWidthMiddle, 0);
        context.lineTo(canvasWidthMiddle, 45);
        context.moveTo(20, 55);
        context.lineTo(55, 0);
    }

    context.stroke();
  }

  /*
   * The drawing will be drawn into a canvas 
   */
  render() {
    return <canvas id="myCanvas" width="200" height="350" />;
  }
}

export default HangManDrawing;
