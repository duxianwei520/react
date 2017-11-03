/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: duxianwei
 * @Last Modified time: 2017-11-03 11:38:17
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import 'components/kindeditor/themes/defaulst/default.css'
// import 'components/kindeditor/themes/qq/qq.css'


@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class app extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditorLoaded: false,
    }
    this.editor = {}
  }

  componentDidMount() {
    this.loadScript()
  }

  loadScript() {
    const self = this
    if (!this.state.isEditorLoaded) {
      // window.loadAMapPromise = $.Deferred();
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '../../components/kindeditor/kindeditor-all-min.js';
      document.body.appendChild(script);
      script.onload = () => {
        // window.KindEditor.ready((K) => {
          /* K.each({
            'plug-align': {
              name: '对齐方式',
              method: {
                'justifyleft': '左对齐',
                'justifycenter': '居中对齐',
                'justifyright': '右对齐',
              },
            },
            'plug-order': {
              name: '编号',
              method: {
                'insertorderedlist': '数字编号',
                'insertunorderedlist': '项目编号',
              },
            },
            'plug-indent': {
              name: '缩进',
              method: {
                'indent': '向右缩进',
                'outdent': '向左缩进',
              },
            },
          }, function (pluginName, pluginData) {
            const lang = {};
            lang[pluginName] = pluginData.name;
            KindEditor.lang(lang);
            KindEditor.plugin(pluginName, function (K) {
              const self = this;
              self.clickToolbar(pluginName, function () {
                const menu = self.createMenu({
                  name: pluginName,
                  width: pluginData.width || 100,
                });
                K.each(pluginData.method, function (i, v) {
                  menu.addItem({
                    title: v,
                    checked: false,
                    iconClass: pluginName + '-' + i,
                    click: function () {
                      self.exec(i).hideMenu();
                    },
                  });
                })
              });
            });
          }); */

        self.editor = window.KindEditor.create('#editor', {
            // themeType: 'qq',
          uploadJson: $GLOBALCONFIG.$ctx + '/common/apis/image/upload.json',
            // resizeType: 1,
          allowPreviewEmoticons: false,
            // allowImageUpload: true,
          allowImageRemote: false,
          items: [
            'bold', 'italic', 'underline', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'link', 'image',
          ],
        })
          // self.editor.loadPlugin('image', function () {
          //   self.editor.plugin.imageDialog({
          //     showRemote: false,
          //     // imageUrl: K('#url3').val(),
          //     clickFn: function (url, title, width, height, border, align) {
          //       // K('#url3').val(url);
          //       self.editor.hideDialog();
          //     },
          //   });
          // });
          // self.editor.html('<h3>Hello KindEditor</h3>')
        // })
      };
      this.setState({
        isEditorLoaded: true,
      })
    }
  }

  render() {
    return (
      <div className="page">
        <textarea
          name="content"
          id="editor"
          style={{ width: '800px', height: '400px', visibility: 'hidden' }}
        />
      </div>
    )
  }
}
