import React, { Component } from 'react';
import TableList from '@tableList';
import RoleCheckbox from './roleCheckbox';

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isFirst: true,
      checkedIds: [],
    };
    this.simpleData = {};
    this.checkedArr = {};
    this.fatherArr = {};
    this.forAllData = {};
  }

  componentWillMount() {
    this.simplifySourceData(this.props.dataSource, this.simpleData);
    if (this.props.checkedId) {
      this.setState({
        checkedIds: this.props.checkedId,
      });
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.checkedId !== nextProps.checkedId) {
      this.setState({
        checkedIds: nextProps.checkedId,
      });
    }

    if (this.props.dataSource !== nextProps.dataSource) {
      this.simplifySourceData(nextProps.dataSource, this.simpleData);
    }
  }

  // #region 收缩业务代码功能

  // 简化源数据保留id上下级关系
  simplifySourceData = (obj, resultData) => {
    /* if (this.getJSONLength(obj) > 0) {
      for (const key in obj) {
        this.forAllData[obj[key].id] = obj[key]
        if (obj.hasOwnProperty(key)) {
          resultData[obj[key].id] = {}
          if (obj[key].children) {
            this.simplifySourceData(obj[key].children, resultData[obj[key].id])
          }
        }
      }
    } */
    // 使用object.keys 替代for in语句s
    const objArr = Object.keys(obj);
    if (objArr.length > 0) {
      objArr.map((key) => {
        this.forAllData[obj[key].id] = obj[key];
        resultData[obj[key].id] = {};
        if (obj[key].children) {
          this.simplifySourceData(obj[key].children, resultData[obj[key].id]);
        }
      });
    }
  };

  // 点击是否开通checkbox
  onChecked = (item, ischecked) => {
    let { checkedIds } = this.state;
    if (ischecked && !this.onInArray(item.id, checkedIds)) {
      // 选中
      checkedIds.push(item.id);
      checkedIds = this.setChildsChecked(item.id);
      checkedIds = this.setNewFatherChecked(item.id);
    } else if (!ischecked && this.onInArray(item.id, checkedIds)) {
      // 不选中
      checkedIds = this.removeFromArray(item.id, checkedIds);
      checkedIds = this.setChildsUnChecked(
        this.getChildById(item.id, this.simpleData),
        checkedIds,
      ); // 删除子集
      checkedIds = this.getFatherById(item.parentId);
    }
    this.setState(
      {
        checkedIds: checkedIds,
      },
      () => {
        this.props.onCheckModify(checkedIds);
      },
    );
  };

  // 根据当前id判断父级下是否还有其他被选中的子集，若无，则取消其父级的checkid
  getFatherById(parentId) {
    let { checkedIds } = this.state;
    if (this.forAllData[parentId]) {
      const fatherArr = this.forAllData[parentId].children;
      // 当fatherArr为1时，则标示当前取消的模块无同级元素，则直接取消父级
      if (fatherArr.length === 1) {
        checkedIds = this.removeFromArray(parentId, checkedIds);
        const prevParentId = this.forAllData[parentId].parentId;
        if (prevParentId) {
          this.getFatherById(prevParentId);
        }
      }
      // 当fatherArr大于1时，需要判断当前模块的同级模块是否取消，若有多，这不做其他操作，若没有，再删除父级
      if (fatherArr.length > 1) {
        let i = 0;
        fatherArr.map((child) => {
          // this.onInArray(child.id, checkedIds) ? (i += 1) : null
          if (this.onInArray(child.id, checkedIds)) {
            return (i += 1);
          }
          return null;
        });
        if (i === 0) {
          checkedIds = this.removeFromArray(parentId, checkedIds);
          this.getFatherById(this.forAllData[parentId].parentId);
        }
      }
    }
    return checkedIds;
  }

  // 获取某一节点的子某一节点的子节点
  getChildById = (id, source) => {
    /* for (const key in source) {
      if (source.hasOwnProperty(key) && eval(key) === id) {
        console.log(key)
        this.checkedArr = source[key]
      }
      if (this.getJSONLength(source[key]) > 0) {
        this.getChildById(id, source[key])
      }
    } */
    // 使用object.keys 替代for in语句
    Object.keys(source).map((key) => {
      if (key.toString() === id.toString()) {
        this.checkedArr = source[key];
      }
      if (Object.keys(source[key]).length > 0) {
        this.getChildById(id, source[key]);
      }
    });
    return this.checkedArr;
  };

  // 将子集全部勾选
  setChildsChecked = (id) => {
    const { checkedIds } = this.state;
    const data = this.forAllData[id];
    if (data.children && data.children.length > 0) {
      const dataChildren = data.children;
      dataChildren.map((child) => {
        if (!this.onInArray(child.id, checkedIds)) {
          checkedIds.push(child.id);
          if (child.children && child.children.length > 0) {
            this.setChildsChecked(child.id);
          }
        }
      });
    }
    return checkedIds;
  };

  // 将父级树结构全部勾选
  setNewFatherChecked(id) {
    const { checkedIds } = this.state;
    if (this.forAllData[id]) {
      const { parentId } = this.forAllData[id];
      if (parentId && !this.onInArray(parentId, checkedIds)) {
        checkedIds.push(parentId);
        this.setNewFatherChecked(parentId);
      }
    }
    return checkedIds;
  }

  // 把某一选中元素的子集全部设为不选中
  setChildsUnChecked = (obj, results) => {
    /* for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (this.onInArray(eval(key), results)) {
          results = this.removeFromArray(eval(key), results)
        }
        if (this.getJSONLength(obj[key])) {
          results = this.setChildsUnChecked(obj[key], results)
        }
      }
    }
    return results */
    // 使用object.keys 替代for in语句
    let resultsArr = results;
    Object.keys(obj).map((key) => {
      if (this.onInArray(parseInt(key, 10), resultsArr)) {
        // resultsArr = resultsArr.filter(item => item !== parseInt(key, 10))
        resultsArr = this.removeFromArray(parseInt(key, 10), resultsArr);
      }
      if (Object.keys(obj[key])) {
        resultsArr = this.setChildsUnChecked(obj[key], resultsArr);
      }
    });
    return resultsArr;
  };

  // 从某数组删除某元素
  removeFromArray(item, arr) {
    const array = arr;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === item) {
        array.splice(i, 1);
        return array;
      }
    }
  }

  // 判断某元素是否在某数组中
  onInArray(item, arr) {
    const array = arr || [];
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === item) {
        return true;
      }
    }
    return false;
  }

  // 获取JSON对象长度
  /* getJSONLength(obj) {
    const count = 0
    // for (const key in obj) {
    //   if (obj.hasOwnProperty(key)) {
    //     count += 1
    //   }
    // }
    // return count
    return Object.keys(obj).length
  } */

  columns() {
    const _self = this;
    const { buttonList } = this.props;
    const checkedIds = this.props.checkedId;
    // if (sessionStorage.getItem('roleName') === '0') {
    return [
      {
        title: '功能',
        dataIndex: 'resName',
        key: 'resName',
        width: '30%',
      },
      {
        title: '已选模块',
        dataIndex: 'checkedArr',
        key: 'checkedArr',
        width: '40%',
      },
      {
        title: '操作',
        dataIndex: 'id',
        width: '30%',
        render: function (text, record, index) {
          return (
            // sessionStorage.getItem('roleName') === '0' ?

            <span>
              <span>
                <RoleCheckbox
                  checkItem={record}
                  onChecked={_self.onChecked}
                  defaultChecked={_self.onInArray(record.id, checkedIds)}
                  nowRoleName={_self.props.nowRoleName}
                />
              </span>
              <span className="ant-divider" />
              <a onClick={() => buttonList(record.id, record.parentid)}>按钮权限</a>
            </span>
            // : null
          );
        },
      },
    ];
    // }
    // return (
    //   [{
    //     title: '功能',
    //     dataIndex: 'resName',
    //     key: 'resName',
    //     width: '30%',
    //   }, {
    //     title: '已选模块',
    //     dataIndex: 'checkedArr',
    //     key: 'checkedArr',
    //     width: '40%',
    //   }]
    // )
  }

  // #endregion

  render() {
    const { dataSource } = this.props;
    return (
      <div className="flexcolumn roleModuleList">
        <TableList
          rowKey="id"
          columns={this.columns()}
          dataSource={dataSource}
          scroll={{ y: true }}
          indentSize={30}
        />
      </div>
    );
  }
}
