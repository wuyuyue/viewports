import React from 'react';
import Layout from '../../components/layout'
import Header from '../../components/header'
import Content from '../../components/content'
import Tabs, { Tab } from '../../components/tab'
import Loading from '../../components/loading'

import Drawer from '../common/drawer/index.jsx'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as appAction from '../appAction'
import css from './index.styl'

import { FormattedMessage } from 'react-intl';

import {generatValidUrl}  from '../../utils/url'


class SelectFromModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      startLoad: false,
      selectData: []
    }

  }
  componentDidMount(){
    var self = this;
    window.addEventListener("message", function(event) {
      // console.log(event.source);
      if (event.source.parent != window)
        return;
      if(event.data.command === 'SELECTION_FROM'){
        self.setState({
          selectData: event.data.data
        })
      }
    });
    window.addEventListener('resize',function(){
      var selectFromIframe = document.querySelector('#selectFromIframe');
      selectFromIframe.style.width = window.innerWidth+'px';
      selectFromIframe.style.height = window.innerHeight+'px';
      selectFromIframe.style.transform = 'scale(' + selectFromIframe.parentNode.clientWidth*2/3/window.innerWidth + ',' + selectFromIframe.parentNode.clientHeight/window.innerHeight + ')';
      selectFromIframe.style.transformOrigin='top left';
    });
  }
  handleChange() {
    // this.setState({
    //   selectFromUrl: this.refs.inputBox.value
    // })
    // this.refs.selectFromIframe
    var self = this;
    this.refs.inputBox.value = generatValidUrl(this.refs.inputBox.value);
    var selectFromUrl = this.refs.inputBox.value;

    // if(1){
      var selectFromIframe = document.querySelector('#selectFromIframe');
      // selectFromIframe.style.visibility='visible';
      // console.log(selectFromIframe.parentNode);
      //
      // console.log(selectFromIframe.parentNode.clientWidth);
      // console.log(selectFromIframe.parentNode.clientHeight);

      self.setState({ startLoad: true })
      selectFromIframe.style.width = window.innerWidth+'px';
      selectFromIframe.style.height = window.innerHeight+'px';
      selectFromIframe.style.transform = 'scale(' + selectFromIframe.parentNode.clientWidth/window.innerWidth + ',' + selectFromIframe.parentNode.clientHeight/window.innerHeight + ')';
      selectFromIframe.style.transformOrigin='top left';
      selectFromIframe.setAttribute('src',selectFromUrl);

      selectFromIframe.onload = function(){
        // alert('onload');
        // selectFromIframe.style.visibility='visible';
        self.setState({ startLoad: false })

      }
      selectFromIframe.onerror = function(){
        // selectFromIframe.style.visibility='visible';
          // alert('onerror');
        self.setState({ startLoad: false })
      }
    // }
  }
  addToConfig(){
    var checkedUrls = document.querySelectorAll('input.candidateUrl:checked');
    var array = [];
    for(var i=0;i<checkedUrls.length;i++){
      var e= checkedUrls[i];
      array.push({
        title: e.getAttribute('data-title'),
        url: 'http:' + e.getAttribute('data-url').replace('http:','').replace('https:','')
      });
    }
    this.props.appAction.batchAddGivenViews(array)
  }
  selectAllSwitch(e){
    var currentValue = e.nativeEvent.target.checked
    document.querySelectorAll('input.candidateUrl').forEach(function(e){
      e.checked=currentValue;
    })
  }
  selectOneSwitch(e){
    // var currentValue = e.nativeEvent.target.checked;
    if(document.querySelectorAll('input.candidateUrl:checked').length===document.querySelectorAll('input.candidateUrl').length){
      document.querySelector('#selectAll').checked=true;
    }else{
      document.querySelector('#selectAll').checked=false;
    }
  }
  render(){
    var self = this;
    const {intl} = this.props;
    var selectAllLabel = intl.formatMessage({id: 'app.config.selectmodal.operation.selectall'});
    var loadLabel = intl.formatMessage({id: 'app.config.selectmodal.operation.load'});
    return (
      <div id='selectFromModal'>
        <div  onClick={(e)=>this.props.appAction.hideModal()} style={{width: 32, height: 32, float:'right', marginBottom: 4 }}>
          <i className='fa fa-2x fa-window-close'/>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">url</span>
          </div>
          <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref="inputBox" onChange={this.handleChange.bind(this)}/>
        </div>

        <div className='row' style={{  height: 600 }}>
          <div className='col-8' style={{ height: '100%', overflow:'hidden', position:'relative', border: '1px solid #eee'}}>
            <iframe sandbox='allow-scripts allow-forms allow-popups allow-same-origin' seamless id='selectFromIframe' frameBorder={0} style={{visibility: 'visible', position:'absolute', top: 0, left: 0 }}/>
            <Loading show={this.state.startLoad}/>
          </div>
          <div className='col-4' style={{ height: '100%', overflow: 'hidden'}}>
            <div className="form-inline">
              <div className="form-group mb-6">
                <input className="form-check-input" defaultChecked={true} type="checkbox" id="selectAll" onChange={this.selectAllSwitch.bind(this)}/>
                <label className="form-check-label" htmlFor="selectAll" >{selectAllLabel}</label>
              </div>
              <button className="btn btn-small mb-6" style={{marginLeft: 10 }} onClick={this.addToConfig.bind(this)}>{loadLabel}</button>
            </div>
            <hr></hr>
            <div style={{ width: '100%', height: 550, overflowY: 'auto',overflowX:'hidden'}}>
              {
                this.state.selectData.map(function(d){
                  if(!d.title||!d.url||!(d.url.startsWith('https://')||d.url.startsWith('https://')||d.url.startsWith('//')))return null;
                  return (

                    <div className="form-check">
                      <input className="form-check-input candidateUrl" type="checkbox" defaultChecked={true}  onChange={self.selectOneSwitch.bind(self)} data-title={d.title} data-url={d.url}/>
                      <label className="form-check-label">
                        {d.title}
                        <br></br>
                        {d.url}
                      </label>
                    </div>
                  )
                })
              }
            </div>

          </div>

        </div>

      </div>
    )
  }
}

class UnLoginTipModal extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className='vhCenter' style={{ height: 100, padding: 10 }}>

        <FormattedMessage
          id='app.config.unlogintipmodal'
          description='app.config.unlogintipmodal'
          defaultMessage='User unlogined cannot visit the ControlPanel'
          />
      </div>
    )
  }
}

class ConfigIndex extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.state = {
      drawerOpen: false
    }
  }
  componentDidMount(){
    // window.document.querySelector('title').innerHTML = 'ViewportGroup-config';
    const {intl} = this.props;
    var title = intl.formatMessage({id: 'app.config.title'});
    document.title = title;
    // console.log(this.props);
    // if(this.props.app.token === null){
    //   alert(1234);
    // }
    // var self = this;
    // setTimeout(function(){
    //   if(self.props.app.views === null) {
    //     self.props.appAction.showModal(ExtensionNotInstallModal, {
    //       // appAction: this.props.appAction
    //       style: {
    //         width: '50%'
    //       }
    //     })
    //   }
    // },5000)
  }
  componentWillReceiveProps(nextProps){
    // if(this.props.app.views!==null || nextProps.app.views!==null){
      if(this.props.app.token!== nextProps.app.token && nextProps.app.token === null){
        // this.props.appAction.toast('未登录用户无法使用配置中心，请先登录',5000);
        // this.props.appAction.showLoading();
        // console.log(this.props.app);
        this.props.appAction.showModal(UnLoginTipModal, {
          style: {
            width: 400
          }
          // appAction: this.props.appAction
        });
        setTimeout(()=>{
          this.props.appAction.drawerOpenSet(true);
        },500)

      }
      if(this.props.app.token === null && nextProps.app.token){
        this.props.appAction.hideModal();
        // alert(this.props.app.licensed);
        // if (this.props.app.licensed === true){
        //   this.props.appAction.drawerOpenSet(false);
        // } else {
        //   this.props.appAction.drawerOpenSet(true);
        // }
      }
      if(this.props.app.appLanguage!==nextProps.app.appLanguage){
        const {intl} = nextProps;
        var title = intl.formatMessage({id: 'app.config.title'});
        document.title = title;
      }
    // }
  }
  renderEditable(cellInfo) {
    var self = this;
    const {intl} = this.props;
    var viewTitlePlaceHolder = intl.formatMessage({id: 'app.config.tabel.row.label.title'});

    return (
      <div className='vhCenter' style={{ width: "100%", height: '100%'}}>
        <div className='operatableItem'
          style={{ backgroundColor: "#fafafa", width: "100%", height: 40, lineHeight: '40px' }}
          contentEditable
          suppressContentEditableWarning
          onKeyUp={e=>{
            var event = e.nativeEvent;
            if (event.keyCode == "13") {
                //回车执行查询
                e.target.blur();
            }
          }}
          onBlur={e => {
            // const data = [...this.state.data];
            // data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            // this.setState({ data });
            var value = e.target.innerText.trim();
            var item = {
              ...cellInfo.original
            };

            item[cellInfo.column.id] = cellInfo.column.id==='title'&&cellInfo.original[cellInfo.column.id]===viewTitlePlaceHolder?"":value;

            if(cellInfo.column.id==='url'){
              item[cellInfo.column.id]=generatValidUrl(value);
            }
            // console.log(item);
            self.props.appAction.updateView(item);
          }}
          dangerouslySetInnerHTML={{
            __html: cellInfo.column.id==='title'&&!cellInfo.original[cellInfo.column.id]?
                    viewTitlePlaceHolder
                    :
                    cellInfo.original[cellInfo.column.id]
          }}
        />
      </div>
    );
  }
  openSelectFromModal(){
    this.props.appAction.showModal(SelectFromModal, {
      appAction: this.props.appAction,
      intl: this.props.intl
    })
  }
  render () {
    const {intl} = this.props;
    var mainLabel = intl.formatMessage({id: 'app.config.tabel.label.main'});
    var titleLabel = intl.formatMessage({id: 'app.config.tabel.label.main.title'});
    var urlLabel = intl.formatMessage({id: 'app.config.tabel.label.main.url'});
    var sizeLabel = intl.formatMessage({id: 'app.config.tabel.label.size'});
    var widthLabel = intl.formatMessage({id: 'app.config.tabel.label.size.width'});
    var heightLabel = intl.formatMessage({id: 'app.config.tabel.label.size.height'});
    var depthLabel = intl.formatMessage({id: 'app.config.tabel.label.size.depth'});
    var positionLabel = intl.formatMessage({id: 'app.config.tabel.label.position'});
    var xLabel = intl.formatMessage({id: 'app.config.tabel.label.position.x'});
    var yLabel = intl.formatMessage({id: 'app.config.tabel.label.position.y'});
    var zLabel = intl.formatMessage({id: 'app.config.tabel.label.position.z'});

    var operationLabel = intl.formatMessage({id: 'app.config.tabel.label.operation'});
    var deleteLabel = intl.formatMessage({id: 'app.config.tabel.label.operation.delete'});

    var previousTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.previousText'});
    var nextTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.nextText'});
    var loadingTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.loadingText'});
    var noDataTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.noDataText'});
    var pageTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.pageText'});
    var ofTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.ofText'});
    var rowsTextLabel = intl.formatMessage({id: 'app.config.tabel.label.option.rowsText'});


    var drawerStyle = {
     width: '20%',
     backgroundColor: 'black'
   }
   // console.log(this.props.app);
   // console.log(this.props.app.drawerOpen,this.props.app.licensed ,'werwerewrewwre');
   var drawer =  <Drawer appAction={this.props.appAction} app={this.props.app}  location={this.props.location}/>
    return (
      <Layout className='configIndex' drawer={drawer} drawerStyle={drawerStyle} drawerOpen={ this.props.app.drawerOpen || !this.props.app.licensed }>
        <div className="vhCenter" style={{ height: 50 }}>
          <h5 className="text-monospace text-capitalize" style={{ margin: '0 auto' }}>
            <FormattedMessage
              id='app.config.table.header'
              description='app.config.table.header'
              defaultMessage='configuration center'
              />
          </h5>
        </div>
        <Content style={{ width: '100%' }}>
          <div className='operationBar'>
            <span className='operatableItem' onClick={e=>this.props.appAction.addView()}>

              <FormattedMessage
                id='app.config.operation.add'
                description='app.config.operation.add'
                defaultMessage='Add View!'
                />
            </span>
            <span className='operatableItem' onClick={e=>this.props.appAction.removeAllView()}>

              <FormattedMessage
                id='app.config.operation.deleteall'
                description='app.config.operation.deleteall'
                defaultMessage='Delete All View!'
                />
            </span>
            <span className='operatableItem' tabIndex={-1} onClick={e=>this.openSelectFromModal()}>

              <FormattedMessage
                id='app.config.operation.select'
                description='app.config.operation.select'
                defaultMessage='Select from!'
                />
            </span>

            {

              //<span className='operatableItem' onClick={e=>this.props.appAction.saveOnRemote(this.props.app.views,this.props.app.token)}>Save on Remote!</span>
              //<span className='operatableItem' onClick={e=>this.props.appAction.loadOnRemote(this.props.app.token)}>Load on Remote!</span>

            }

          </div>
          <ReactTable
            data={ this.props.app.views||[] }
            filterable
            defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
            columns={[
               {
                Header: mainLabel,
                columns: [
                  {
                    Header: titleLabel,
                    accessor: "title",
                    width: global.innerWidth/4,
                    Cell: this.renderEditable
                  },
                  {
                    Header: urlLabel,
                    accessor: "url",
                    width: global.innerWidth/4,
                    Cell: this.renderEditable,
                    filterMethod: (filter, row) => {
                      return String(row[filter.id]).indexOf( filter.value) > -1
                    }
                  }
                ]
              },
              {
                Header: sizeLabel,
                columns: [
                  {
                    Header: widthLabel,
                    filterable: false,
                    accessor: "width",
                    Cell: this.renderEditable
                  },
                  {
                    Header: heightLabel,
                    filterable: false,
                    accessor: "height",
                    Cell: this.renderEditable
                  },
                  {
                    Header: depthLabel,
                    filterable: false,
                    accessor: "depth",
                    Cell: row => (
                      <div className='vhCenter' style={{width: '100%',height:'100%',textAlign:'center'}}>
                       {row.original.depth}
                      </div>
                    )
                  }
                ]
              },
              {
                Header: positionLabel,
                columns: [
                  {
                    Header: xLabel,
                    filterable: false,
                    accessor: "x",
                    Cell: row => (
                      <div className='vhCenter' style={{width: '100%',height:'100%',textAlign:'center'}}>
                       {row.original.x}
                      </div>
                    )
                  },
                  {
                    Header: yLabel,
                    filterable: false,
                    accessor: "y",
                    Cell: row => (
                      <div className='vhCenter' style={{width: '100%',height:'100%',textAlign:'center'}}>
                       {row.original.y}
                      </div>
                    )
                  },
                  {
                    Header: zLabel,
                    filterable: false,
                    accessor: "z",
                    Cell: row => (
                      <div className='vhCenter' style={{width: '100%',height:'100%',textAlign:'center'}}>
                       {row.original.z}
                      </div>
                    )
                  }
                ]
              },
              {
                Header: operationLabel,
                columns: [
                  {
                    Header:deleteLabel,
                    filterable: false,
                    Cell: row => (
                      <div className='vhCenter' style={{width: '100%',height:'100%',textAlign:'center'}}>
                        <span className='operatableItem' onClick={e=>this.props.appAction.removeView(row.original.uuid)}>
                          <FormattedMessage
                            id='app.config.tabel.row.label.delete'
                            description='app.config.tabel.row.label.delete'
                            defaultMessage='[delete]'
                            />
                         </span>
                      </div>
                    )
                  }
                ]

              }
            ]}
            style={{
              height: global.innerHeight - 50 - 40  // This will force the table body to overflow and scroll, since there is not enough room
            }}
            defaultPageSize={10}
            className="-striped -highlight"
            // Text
            previousText={previousTextLabel}
            nextText={nextTextLabel}
            loadingText={loadingTextLabel}
            noDataText={noDataTextLabel}
            pageText={pageTextLabel}
            ofText={ofTextLabel}
            rowsText={rowsTextLabel}
          />
        </Content>
      </Layout>
    )
  }
}
import {injectIntl} from 'react-intl';

export default connect(state => ({ app: state.app }), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(ConfigIndex))
