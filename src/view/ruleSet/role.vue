<template>
  <div>
    <Row>
      <div class="title-row">角色组类型</div>
      <Col span="16">
        <Button
          type="primary"
          size="small"
          style="display:block; margin:0 5px 5px auto;"
          @click="edit(0)"
        >新建</Button>
        <Table border :columns="roleGroupColumns" :data="roleGroupList">
          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(0, row)">编辑</Button>
            <Button
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="handleDelete(0, row)"
            >删除</Button>
          </template>
        </Table>
      </Col>
      <Col span="1">
        <dialogBox v-model="roleGroupShow">
          <template slot="title">添加类型</template>
          <template>
            <Form ref="roleGroupForm" :model="roleGroupForm" :rules="roleGroupRules">
              <FormItem prop="groupName">
                <Input type="text" v-model="roleGroupForm.groupName" placeholder="親輸入类型"></Input>
              </FormItem>
              <Button
                type="primary"
                size="small"
                style="display: block; margin: 0 auto"
                @click="submit(0, roleGroupForm)"
              >确定</Button>
            </Form>
          </template>
        </dialogBox>

        <!-- <div v-show="roleGroupShow">
          添加类型
          <div class="fr cp" @click="cancel(0)">x</div>
          <Input type="text" v-model="roleGroupForm.groupName" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="submit(0, roleGroupForm)">确定</Button>
        </div>-->
      </Col>
    </Row>

    <Divider/>

    <Row>
      <div class="title-row">角色类型</div>
      <Col span="16">
        <Button
          type="primary"
          size="small"
          style="display:block; margin:0 5px 5px auto;"
          @click="edit(1)"
        >新建</Button>
        <Table border :columns="roleColumns" :data="roleList">
          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(1, row)">编辑</Button>
            <Button
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="handleDelete(1, row)"
            >删除</Button>
          </template>
        </Table>
      </Col>
      <Col span="12">
        <dialogBox v-model="roleShow">
          <template slot="title">添加类型</template>
          <template>
            <Form ref="roleForm" :model="roleForm" :rules="roleRules">
              <FormItem prop="newRoleGroupId">
                <Select v-model="roleForm.newRoleGroupId">
                  <Option
                    v-for="(item, index) in roleGroupList"
                    :value="item.id"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </FormItem>

              <FormItem prop="roleName">
                <Input type="text" v-model="roleForm.roleName" placeholder="親輸入类型"></Input>
              </FormItem>

              <Button
                type="primary"
                size="small"
                style="display: block; margin: 0 auto"
                @click="submit(1, roleForm)"
              >确定</Button>
            </Form>
          </template>
        </dialogBox>

        <!-- <div v-show="roleShow">
          添加类型
          <div class="fr cp" @click="cancel(1)">x</div>
          <Select v-model="roleForm.newRoleGroupId" style="width:200px">
              <Option v-for="(item, index) in roleGroupList" :value="item.id" :key="index">{{ item.groupName }}</Option>
          </Select>
          <Input type="text" v-model="roleForm.roleName" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="submit(1, roleForm)">确定</Button>
        </div>-->
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  getRoleRulePage,
  getRoleRuleRuleById,
  deleteRoleRule,
  updateRoleRule,
  addRoleRule
} from "@/api/rulesSet/role";
import {
  getRoleGroupRulePage,
  getRoleGroupRuleRuleById,
  deleteRoleGroupRule,
  updateRoleGroupRule,
  addRoleGroupRule
} from "@/api/rulesSet/roleGroup";
import dialogBox from "@/components/dialogBox";

export default {
  components: { dialogBox },
  props: {},
  data() {
    return {
      roleGroupColumns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "组名称",
          key: "groupName",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      roleGroupRules: {
        groupName: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      roleGroupList: [],
      roleGroupForm: {},
      roleGroupShow: false,
      roleColumns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "组名称",
          key: "roleGroupName",
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      roleRules: {
        newRoleGroupId: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        roleName: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      roleList: [],
      roleForm: {},
      roleShow: false,
      roleParentList: {}
    };
  },
  watch: {
    roleList(val) {
      for (const iterator of val) {
        this.roleParentList[iterator.roleGroupId] = iterator.roleGroupName;
      }
    }
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData(0);
      this.getData(1);
    },
    getData(type) {
      // 0： 角色组，1：角色
      type === 0
        ? getRoleGroupRulePage().then(data => {
            // console.log('RoleGroupRulePage:', data);
            this.roleGroupList = data.list;
          })
        : getRoleRulePage().then(data => {
            // console.log('RoleRulePage:', data);
            this.roleList = data.list;
          });
    },
    edit(_type, item) {
      if (_type === 0) {
        this.roleGroupShow = true;
        this.roleGroupForm = {};
        item && (this.roleGroupForm = Object.assign({}, item));
      } else {
        this.roleShow = true;
        this.roleForm = {};
        item &&
          (this.roleForm = Object.assign(
            {
              oldRoleGroupId: item.roleGroupId,
              newRoleGroupId: item.roleGroupId
            },
            item
          ));
      }
    },
    handleDelete(type, item) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          Promise.resolve()
            .then(() => {
              return type === 0
                ? deleteRoleGroupRule(item.id)
                : deleteRoleRule(item);
            })
            .then(data => {
              this.getData(type);
              this.$Message.success("操作成功");
            });
        }
      });
    },
    submit(type, item) {
      // console.log('roleGroupForm:', this.roleGroupForm)
      // console.log('roleForm:', this.roleForm)
      type === 0
        ? this.$refs.roleGroupForm.validate()
        : this.$refs.roleForm
            .validate()
            .then(() => {
              if (item.id || item.roleId) {
                return type === 0
                  ? updateRoleGroupRule(item)
                  : updateRoleRule(item);
              } else {
                return type === 0 ? addRoleGroupRule(item) : addRoleRule(item);
              }
            })
            .then(data => {
              this.getData(type);
              this.$Message.success("操作成功");
              this.cancel(type);
            });
    },
    cancel(type) {
      type === 0 ? (this.roleGroupShow = false) : (this.roleShow = false);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
