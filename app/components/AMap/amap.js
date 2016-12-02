import React, {
  Component,
} from 'react'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapDraw: false,
    }
    this.loadScript = this.loadScript.bind(this)
    this._init = this._init.bind(this)
  }

  loadScript(key, callback) {
    if (!this.state.mapDraw) {
      // window.loadAMapPromise = $.Deferred();
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `http://webapi.amap.com/maps?v=1.3&key=${key}`;
      document.body.appendChild(script);
      script.onload = function () {
        console.log('load AMP API');
        // window.loadAMapPromise.resolve();
        callback();
      };
      this.setState({
        mapDraw: true,
      })
    }
  }

  _init() {
    const self = this;
    // eslint-disable-next-line no-undef
    const map = this._map = new AMap.Map(this.props.id, this.props.options);
    Object.keys(this.props.events).map((event) => {
      map.on(event, self.props.events[event]);
    });
  }

  componentDidMount() {
    this.loadScript('a5ebc730f80db3b1375a691afad00942', this._init)
  }

  render() {
    const self = this
    const styl = this.props.style ? this.props.style : {
      width: '100%',
      height: '400px',
    }
    return (
      <div id={self.props.id} style={styl} />
    )
  }
}
