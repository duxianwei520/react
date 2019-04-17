import React from "react";
import Enzyme from "../../../Enzyme.js";
import RoleManage from "../../../../app/pages/set/roleManage/index";
import fetchRoleList from "../../../../app/mocks/apis/sys/userManage/fetchRoleList";
import fetchModuleListInRole from "../../../../app/mocks/apis/sys/roleManage/fetchModuleListInRole";
import RoleList from "../../../../app/pages/set/roleManage/roleList";
import fetchUserList from "../../../../app/mocks/apis/sys/userManage/fetchUserList";
jest.mock("../../../../app/configs/ajax");
jest.mock("../../../../app/apis/manage.js");
let form;
fetchRoleList.data.list[0].id = null;
const listParam = {
  roles: fetchRoleList.data.list,
  btnRights: {}
};
const roleList = Enzyme.mount(<RoleList {...listParam} />);

Enzyme.mount(<RoleManage wrappedComponentRef={node => (form = node)} />);
let roleManage = Enzyme.mount(
  <RoleManage.WrappedComponent form={form.props.form} />
);

describe("index", () => {
  const eve = {
    target: {
      value: "setpeoples"
    }
  };
  roleManage.instance().changeTab(eve);
  eve.target.value = "stepTree";
  roleManage.instance().changeTab(eve);
  eve.target.value = "setmodules";
  roleManage.instance().changeTab(eve);
  roleManage.setState({ activeTab: "setpeoples" });
  roleManage.instance().getData("init");
  roleManage.instance().returnContent("i");
  
  roleManage.setState({
    btnRights: {
      add: false,
      edit: true,
      deleteRole: true,
      deletePolice: false
    }
  });
  roleManage.instance().renderColumn();
  roleManage.setState({
    btnRights: {
      add: true,
      edit: true,
      deleteRole: true,
      deletePolice: true
    }
  });
  //搜索
  test("search", () => {
    roleManage.instance().handleRoleSearch("123");
  });
  //编辑保存
  test("editsave", () => {
    roleManage.setState({ activeTab: "setpeoples" });
    roleManage
      .find(".left button")
      .at(0)
      .simulate("click");
  });
  //删除
  test("delete", () => {
    roleManage.setState({ activeTab: "setpeoples" });
    roleManage
      .find("tbody tr")
      .at(0)
      .find("a")
      .simulate("click");
    roleManage
      .find("Popconfirm button")
      .at(1)
      .simulate("click");
  });
  //列表搜索
  test("listSearch", () => {
    const event = {
      stopPropagation: function() {}
    };
    roleManage.instance().handleSearch(event);
  });
  //提交
  test("测试提交", () => {
    roleManage.setState({ activeTab: "setpeoples" });

    roleManage.instance().handleOk();
    roleManage.setState({ activeTab: "setmodules" });

    roleManage.instance().handleOk();
  });
  //Modal关闭函数
  test("Modal取消", () => {
    roleManage.instance().handleCancel();
  });
  test("pagenext", () => {
    roleManage.instance().pageChange(2);
    expect(roleManage.state().peopleSearchKey.pageNo).toBe(2);
    roleManage.instance().pageSizeChange({}, 20);
    expect(roleManage.state().peopleSearchKey.pageSize).toBe(20);
  });
});
//roleList模块
describe("roleList", () => {
  roleList.setProps({
    roles: fetchRoleList.data.list,
    handleRoleDelete: roleManage.instance().handleRoleDelete,
    onCurrentIndex: roleManage.instance().handleCurrentIndex,
    btnRights: roleManage.state().btnRights,
    onRoleModify: roleManage.instance().onRoleModify
  });
  roleManage.setState({
    roleListResult: false
  });
  //左侧角色列表查询
  test("fetchUserList", () => {
    expect(roleManage.find(".roleslist li").length).toBe(
      fetchRoleList.data.list.length
    );
  });
//搜索
  test("onSearch", () => {
     roleManage.find('.ant-input-wrapper .ant-input-suffix').simulate('click')
     roleManage.find('.ant-input-wrapper .ant-input-suffix i').simulate('click')
  });
    //编辑

  test("edit", () => {
    roleList
      .find("li")
      .at(0)
      .simulate("mouseover");
    roleList
      .find(".icons")
      .at(0)
      .find("i")
      .at(0)
      .simulate("click");
  });
  //删除
  test("delete", () => {
    roleList
      .find("li")
      .at(0)
      .simulate("mouseover");
    roleList
      .find(".icons")
      .at(0)
      .find("i")
      .at(1)
      .simulate("click");
    roleList
      .find("Popconfirm button")
      .at(1)
      .simulate("click");
  });
  //左侧菜单栏点击事件
  test("nameClick", () => {
    roleManage.setState({ activeTab: "stepTree" });
    roleManage
      .find(".roleslist li")
      .at(0)
      .find(".name")
      .simulate("click");
    roleManage.setState({ activeTab: "setpeoples" });
    roleManage
      .find(".roleslist li")
      .at(0)
      .find(".name")
      .simulate("click");
    roleManage.setState({ activeTab: "setmodules" });
    roleManage
      .find(".roleslist li")
      .at(0)
      .find(".name")
      .simulate("click");
    expect(roleManage.state("currRoleId")).toBe(fetchRoleList.data.list[0].id);
  });
  //添加模板
  test("addModule", () => {
    roleManage.find(".ant-input-group-addon i").simulate("click");
    expect(roleManage.state("title")).toBe("新增角色");
    expect(roleManage.state("type")).toBe("add");
  });
});
//校色树tab
test("UserTreeTab", () => {
  roleManage.setState({
    activeTab: "stepTree",
    treeData: fetchModuleListInRole.data.list
  });
  expect(roleManage.find("tbody tr").length).toBe(
    fetchModuleListInRole.data.list.length
  );
  roleManage
    .find("tbody tr")
    .at(0)
    .find("span")
    .at(1)
    .simulate("click");
  expect(roleManage.find("tbody tr").length).toBe(
    fetchModuleListInRole.data.list.length +
      fetchModuleListInRole.data.list[0].children.length
  );
});
