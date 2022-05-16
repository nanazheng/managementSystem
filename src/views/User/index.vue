<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleOpen">新增</el-button>
      <common-form
        :formLabel="searchFormLabel"
        :form="searchForm"
        :inline="true"
        ref="searchForm"
      >
        <el-button type="primary" @click="getLists(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="userTableData"
      :tableLabel="userTableLabel"
      :config="userTableDataConfig"
      @edit="editUser"
      @del="deleteUser"
      @changePage="getLists()"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTableNew.vue";
import { getUsers } from "../../../api/data.js";
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      isShow: false,
      operateType: "",
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "生日",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {},
      searchFormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      userTableData: [],
      userTableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 380,
        },
      ],
      userTableDataConfig: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    handleOpen() {
      this.isShow = true;
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
      this.operateType = "add";
    },
    handleClose() {
      this.isShow = false;
    },
    handleOk() {
      if (this.operateType === "edit") {
        this.$http.post("/user/updateUser", this.operateForm).then(() => {
          this.isShow = false;
          this.getLists();
        });
      } else {
        this.$http.post("/user/createUser", this.operateForm).then(() => {
          this.isShow = false;
          this.getLists();
        });
      }
    },
    editUser(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = row;
    },
    deleteUser(row) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getLists();
          });
      });
    },
    getLists(name = "") {
      this.userTableDataConfig.loading = true;
      name ? (this.userTableDataConfig.page = 1) : "";
      getUsers({
        page: this.userTableDataConfig.page,
        name,
      }).then((result) => {
        this.userTableData = result.data.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.userTableDataConfig.total = result.data.count;
        this.userTableDataConfig.loading = false;
      });
    },
  },
  created() {
    this.getLists();
  },
};
</script>

<style>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
