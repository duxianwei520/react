## drawde（抽屉组件）
#### props
| 属性名      | 类型                | 默认值    | 是否必填 | 描述                              |
| -------- | ----------------- | ------ | ---- | ------------------------------- |
| visible  | String            | 无      | 是    | 组件是否显示                          |
| title    | String            | '标题'   | 否    | 抽屉标题                            |
| footer   | String\|ReactNode | 无      | 否    | 组件底部内容                          |
| onCancel | Function          | 无      | 是    | 关闭组件的回调方法，将组件设置的visible设置为false |
| size     | String            | 'base' | 否    | 组件的大小，有sm,base,lg共3个值           |

####  调用示例

```javascript
{
  this.state.drawVisible ?
    <Drawer
      visible={this.state.drawVisible}
      title={'测试'}
      footer={this.footer()}
      onCancel={() => this.setState({ drawVisible: false })}
      size="lg"
      >
    	<div>111</div>
    </Drawer>
  : null
}
```
