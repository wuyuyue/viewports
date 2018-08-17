import React from 'react'
import PropTypes from 'prop-types'
import css from './index.styl'

// const list_li = 'list_li';
// const list_li_left = 'list_li_left';
// const list_li_right = 'list_li_right';
// const list_li_arrow = 'list_li_arrow';

const rightArrowBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAABGdBTUEAALGPC/xhBQAAAjpJREFUOBGdlb9LW1EUx81LfFt/QHBIQn4VlwpFiuAk/sBBG+zioMVJOhU7FRzF1cE/wEVcSgfFUhWkomCMhQ5CQbCDUEp+vmQogdJBEuJL/JzQC0l8TW564XB/nPP93u8571xeTzqdHkgmk4l8Ph/q+Y9h1Gq1R+AGy+XyOWRPuuVwCQDgEETHLEvMk9Fo9FqXyJDAcDj8ze12jwP2sE1ks9lnXRFIcDAYvGIac7lct7Ztn4kqHZJ6Co2BUodqtXrK2WPIYpFI5Gujv3V9j0ACLMsKVioVIfFhLyGJy7nTqNeg1REIBLKcjWJp7JDPPN0ao/aOCpSzUCj0lUqlE/ZPKfJcKBTaVz41OypQTp/P98swjAn2l9RlN5PJzCtfV3OxWHyYSqW+YDbpLDaC2ypQgV6v949pmlPs43yZLUjeKJ8WgQT7/f4bGm2G5WdsA5J3ct62iBLQOiAx6ZVPzDHUrGgrUEQUsp/1c9lDYkvva49cLjdIg51wsxfQEo9uQzsFHtgwb+QI4ANske78IDdrEZDzCH1wyM0mfTFPQx0IWEbHFABPkusB4CrxMcBN76KtAhonBugjdkMrv+DJX7BuGv/8CoBnuXmP6N/IHnMCC5MjAeAFfNvItgCPIPu7BDuNewSAXxP4HvuBbAH/dAKqsyYCwG9xbGKX9P4osi0V2HEGvEx/17BzeX0dAX8D6gr4VKsUbJ2cjzwez5S8Pl0C+Sesyc0o2IGkVxvYoKDAzZv8G14xV7oluAM0fOtgkGn6jgAAAABJRU5ErkJggg==';

class Arrow extends React.Component {
  static propTypes = {
    direction: PropTypes.string,
  }
  static defaultProps = {
    direction: 'right'
  }
  render() {
    var transfromValue = 'rotateZ(0)';
    if(this.props.direction === 'up') {
      transfromValue = 'rotateZ(270deg)';
    }else if(this.props.direction === 'down') {
      transfromValue = 'rotateZ(90deg)';
    }else if(this.props.direction === 'left') {
      transfromValue = 'rotateZ(180deg)';
    }
    return (
      <img src={rightArrowBase64} style={{ width: 8, height: 14, verticalAlign: 'top', WebkitTransform: transfromValue}}/>
    )
  }
}

class ExtensiveListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extensive: props.extensive
    }
  }
  static propTypes = {
    style: PropTypes.object,
    extensive: PropTypes.bool,
    header: PropTypes.element,
    headerStyle: PropTypes.object,
    body: PropTypes.element,
    bodyStyle: PropTypes.object
  }
  static defaultProps = {
    style: {

    },
    extensive: false,
    header: null,
    headerStyle: {

    },
    body: null,
    bodyStyle: {

    }
  }
  switch(){
    this.setState({extensive: !this.state.extensive})
  }
  render() {
    return (
      <div className='extensiveListItem list_li' style={this.props.style}>
        <div onClick={this.switch.bind(this)}>
          <div style={this.props.headerStyle}>
            {this.props.header}
          </div>
          <div className='list_li_arrow'>
            <Arrow direction={this.state.extensive? 'up':'down'}/>
          </div>
        </div>
        <div style={{...this.props.bodyStyle, display: this.state.extensive? 'block':'none'}} >
          {this.props.body}
        </div>

      </div>
    )
  }
}
// class GridList extends React.Component {
//   static propTypes = {
//     style: PropTypes.object,
//     columns: PropTypes.number,
//     fillEmpty: PropTypes.bool
//   }
//   static defaultProps = {
//     style: {
//       backgroundColor:'transparent'
//     },
//     columns: 2,
//     fillEmpty: true
//   }

//   render() {
//     if(!this.props.children || this.props.children.length===0) return null;
//     var rows = Math.ceil(this.props.children.length / this.props.columns);
//     var columns = this.props.columns;
//     var children = this.props.children;
//     var childrenArray =  children instanceof Array ? children: [children];

//     if(this.props.fillEmpty){
//       var fillNum = rows * columns - children.length;
//       console.log(fillNum);
//       var lastChild = children[children.length-1];
//       var emptyElement = React.cloneElement(
//         lastChild,
//         lastChild.props,
//         []
//       );
//       for(var i=0;i< fillNum;i++){
//         childrenArray.push(emptyElement);
//       }
//     }
//     return (
//       <div className={prefix+'_gridlist'} style={this.props.style}>
//         {
//           childrenArray.map(function(child,i){
//             var classNames='gridItem';
//             if(i<columns){
//               classNames += ' firstRow';
//             } else {
//               classNames += ' noneFristRow';
//             }
//             if(i % columns === 0 ){
//               classNames += ' firstCol'
//             } else {
//               classNames += ' nontFirstCol'
//             }
//             return (
//               <div key={'gridItem_'+ i } className={classNames} style={{ width: 100/columns + '%'}}>
//                 {child}
//               </div>
//             )
//           })
//         }
//         <style jsx>{`
//             .${prefix+'_gridlist'} {
//             }
//             .gridItem{
//               display: inline-block;
//               vertical-align: top;
//             }
//             .firstRow{
//               margin-top: 0;
//             }
//             .noneFristRow{
//               margin-top: -1px;
//               border-top: 1px solid rgb(246, 246, 246);
//             }
//             .firstCol{
//               margin-left: 0;
//             }
//             .nontFirstCol{
//               margin-left: -1px;
//               border-left: 1px solid rgb(246, 246, 246);
//             }

//           `}</style>
//       </div>
//     )
//   }
// }
// class GridListItem extends React.Component {
//   constructor(props) {
//     super(props);

//   }
//   static propTypes = {
//     style: PropTypes.object
//   }
//   static defaultProps = {
//     style: {

//     }
//   }
//   render() {
//     return (
//       <div className={ list_li } style={this.props.style}>
//         {this.props.children}
//         <style jsx>{`
//           .${list_li}{
//             background-color: white;
//             width: 100%;
//           }
//         `}</style>
//       </div>
//     )
//   }
// }

class DefaultListItem extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    left: PropTypes.element,
    leftStyle: PropTypes.object,
    right: PropTypes.element,
    rightStyle: PropTypes.object,
    onJumpTo: PropTypes.func,
    extensiveContent: PropTypes.element
  }
  static defaultProps = {
    style: {

    },
    left: null,
    leftStyle: {

    },
    right: null,
    rightStyle: {

    },
    onJumpTo: null,
    extensiveContent: null

  }

  render() {

    return (
        <div className='defaultListItem list_li' style={this.props.style}>
          <div onClick={this.props.onJumpTo}>
            <div className='list_li_left' style={this.props.leftStyle}>
              {this.props.left}
            </div>
            <div className='list_li_right' style={this.props.rightStyle}>
              {this.props.right}
            </div>
            {
              this.props.onJumpTo ?
                <div className='list_li_arrow'>
                  <Arrow/>
                </div>
                :
                null
            }
          </div>
        </div>
    )
  }
}
class List extends React.Component {
  static propTypes = {
    style: PropTypes.object
  }
  static defaultProps = {
    style: {
      backgroundColor:'transparent'
    }
  }

  render() {
    return (
      <div className='list' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

export default List;

exports.DefaultListItem = DefaultListItem;
exports.ExtensiveListItem = ExtensiveListItem;

// exports.GridList = GridList;
// exports.GridListItem = GridListItem;
