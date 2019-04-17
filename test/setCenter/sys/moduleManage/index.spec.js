import React from "react";
import Enzyme from "../../../Enzyme.js";
import RoleManage from "../../../../app/pages/set/roleManage/index";
import ModuleManage from "../../../../app/pages/set/moduleManage/index";
import AddModal from "../../../../app/pages/set/moduleManage/modal/moduleAdd";
import fetchTreeList from "../../../../app/mocks/apis/sys/roleManage/fetchTreeList";
import ButtonModal from "../../../../app/pages/set/moduleManage/modal/buttonModal";
jest.mock("../../../../app/pages/set/moduleManage/modal/addButtonModal");

let form;
let moduleManage = Enzyme.mount(<ModuleManage />);
console.log(moduleManage)
moduleManage.setState({ tableDataSource: fetchTreeList.data.list });
jest.mock("../../../../app/configs/ajax");
jest.mock("../../../../app/apis/manage.js");
//页面树
test("tree", () => {
  //进入页面渲染
  expect(moduleManage.find("tbody tr").length).toBe(
    fetchTreeList.data.list.length
  );
  //点击tree效果
  moduleManage
    .find("tbody tr")
    .at(0)
    .find("span")
    .at(1)
    .simulate("click");
  expect(moduleManage.find("tbody tr").length).toBe(
    fetchTreeList.data.list.length + fetchTreeList.data.list[0].children.length
  );
  //状态以上线的类名
  expect(
    moduleManage
      .find(".success")
      .at(0)
      .text()
  ).toBe("已上线");
});
test("cancelButton", () => {
  moduleManage.instance().cancelButton();
  moduleManage.instance().handleCancel();
    moduleManage.setState({ buttonEditState: "add" });
  moduleManage.instance().handleAdd({});

});
//新增模块
test("addButton/editButton", () => {
  moduleManage.find("button").simulate("click");
  //新建按钮点击
  expect(moduleManage.state("Visible")).toBe(true);
  //新建子菜单按钮点击
  moduleManage
    .find("tbody tr")
    .at(0)
    .find("a")
    .at(0)
    .simulate("click");
  expect(moduleManage.state("title")).toBe("新增子菜单");
  //权限按钮点击
  moduleManage
    .find("tbody tr")
    .at(0)
    .find("a")
    .at(3)
    .simulate("click");
  expect(moduleManage.state("buttonVisible")).toBe(true);
});
