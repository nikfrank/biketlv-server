(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{69:function(e,t,n){e.exports=n(84)},74:function(e,t,n){},76:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(57),i=n.n(o),s=(n(74),n(67)),c=n(58),u=n(59),l=n(66),d=n(60),p=n(68),h=(n(76),n(78),n(86)),f=n(88),g=n(87),m=n(39),v=n.n(m),L=function(e){var t=e.lane,n=e.deprecateLane,a=e.updateLaneStatus,o=e.onChange;return r.a.createElement("div",{className:"edit-lane"},r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return n(t.id).then(o)}},"Deprecate")),r.a.createElement("label",null,"status:",r.a.createElement("select",{onChange:function(e){return a(t.id,e.target.value).then(o)},value:t.status},r.a.createElement("option",{value:"bad"},"bad"),r.a.createElement("option",{value:"ok"},"ok"),r.a.createElement("option",{value:"good"},"good"))))};L.hooks={deprecateLane:function(e){return fetch("/lane/deprecate/"+e).then(function(e){return e.json()})},updateLaneStatus:function(e,t){return fetch("/lane/"+e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({payload:{status:t}})})}};var k=v()(L),E={good:"lime",ok:"orange",bad:"red"},b=[{coords:[[32.078,34.7815],[32.082,34.7815]],status:"good",street:"dizengoff",addressStart:100,addressFinish:120},{coords:[[32.074,34.782],[32.078,34.7815]],status:"ok",street:"dizengoff",addressStart:80,addressFinish:99}],y=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={lat:32.08,lng:34.78,zoom:15,currentLane:null,adding:null},n.refreshLanes=function(){n.props.getLanes().then(function(){null!==n.state.currentLane&&(n.props.lanes.find(function(e){return e.id===n.state.currentLane})||n.setState({currentLane:null}))})},n.clickLine=function(e,t){e.originalEvent.view.L.DomEvent.stopPropagation(e),n.setState({currentLane:t})},n.onZoomend=function(e){var t=e.target._zoom;return n.setState({zoom:t})},n.startAddLine=function(){return n.setState({adding:[]})},n.clickMap=function(e){var t=e.latlng,a=t.lat,r=t.lng;return n.state.adding?n.setState(function(e){return{adding:e.adding.concat([[a,r]])}},function(){return 2===n.state.adding.length&&n.props.createLane(n.state.adding).then(function(){return n.setState({adding:null})}).then(function(){return n.props.getLanes()})}):n.setState({currentLane:null})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.getLanes()}},{key:"render",value:function(){var e=this,t=[this.state.lat,this.state.lng],n=this.state,a=n.currentLane,o=n.zoom,i=this.props.lanes,s=void 0===i?[]:i,c=s.find(function(e){return e.id===a});return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"control-panel"},r.a.createElement("div",null,r.a.createElement("button",{onClick:this.startAddLine},"+")),r.a.createElement("div",null,null!==a&&c?r.a.createElement(k,{lane:c,onChange:this.refreshLanes}):null)),r.a.createElement(h.a,{center:t,onZoomend:this.onZoomend,onClick:this.clickMap,zoom:o},r.a.createElement(f.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),s.map(function(t){var n=t.coords,a=t.status,i=t.id;return r.a.createElement(g.a,{key:i,weight:Math.max(3,6*o-83),color:E[a],positions:n,onClick:function(t){return e.clickLine(t,i)}})})))}}]),t}(a.Component);y.hooks={getLanesDEP:function(){return Promise.resolve({lanes:b})},getLanes:function(){return fetch("/lane").then(function(e){return e.json()}).then(function(e){return{lanes:e.map(function(e){return Object(s.a)({},e,{coords:[[e.startLat,e.startLng],[e.endLat,e.endLng]]})})}}).catch(function(e){return{lanes:b}})},createLane:function(e){return fetch("/lane",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payload:{status:"ok",street:"dizengoff",addressStart:80,addressFinish:99,startLat:e[0][0],startLng:e[0][1],endLat:e[1][0],endLng:e[1][1]}})}).then(function(e){return e.json()}).then(function(e){return{}})}};var S=y;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w=v()(S);i.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[69,2,1]]]);
//# sourceMappingURL=main.2dc8eaf7.chunk.js.map