<template>
    <el-scrollbar>
      <el-menu 
        style="width:260px"
        background-color="#324057" 
        text-color="#fff"
        unique-opened
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b"
      >
     
        <el-submenu v-for="item in layerlist" :index = 'item.id' :key= 'item.id'>
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-submenu v-for="layers in item.layers" :index = 'layers.id' :key= 'layers.id'>
            <template slot="title">{{layers.name}}</template>
            <el-menu-item v-for="layer in layers.layer" :index = 'layer.id' :key= 'layer.id' style="padding-left: 40px;height: 40px; line-height: 40px">
              <el-switch v-model="layer.value" active-color="#13ce66" @change="LayerStatusChange(layer)"></el-switch>
              <span style="padding-left: 20px">{{ layer.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
</template>

<script>
export default {
  data: () => {
    return {
      layerstatus: {},
      layerlist:[
        {id: "1", parentId: "0", name: "人员信息", type: "mk", dataId: "155", categoryNo: "RYXX_01",
          layers: [
            {id: "11", parentId: "1", name: "基础数据", type: "mk", dataId: "158", categoryNo: "RYXX_0101",
              layer: [
                {id: "111", parentId: "11", name: "人员分布", value: false, type: "tc", dataId: "174", categoryNo: "RYXX_010101"}
              ]
            },
            {id: "12", parentId: "1", name: "重点人员", type: "mk", dataId: "159", categoryNo: "RYXX_0103",
              layer: [
                {id: "121", parentId: "12", name: "社区矫正", value: false, type: "tc", dataId: "175", categoryNo: "RYXX_010301"},
                {id: "122", parentId: "12", name: "两劳释放", value: false, type: "tc", dataId: "176", categoryNo: "RYXX_010302"},
                {id: "123", parentId: "12", name: "吸毒人员", value: false, type: "tc", dataId: "177", categoryNo: "RYXX_010303"},
                {id: "124", parentId: "12", name: "精神病人", value: false, type: "tc", dataId: "178", categoryNo: "RYXX_010304"},
                {id: "125", parentId: "12", name: "上访人员", value: false, type: "tc", dataId: "179", categoryNo: "RYXX_010305"},
                {id: "126", parentId: "12", name: "境外人员", value: false, type: "tc", dataId: "180", categoryNo: "RYXX_010306"},
                {id: "127", parentId: "12", name: "重点青少年", value: false, type: "tc", dataId: "181", categoryNo: "RYXX_010307"},
                {id: "128", parentId: "12", name: "疫情防控", value: false, type: "tc", dataId: "226", categoryNo: "RYXX_010311"},
              ]
            },
            {id: "13", parentId: "1", name: "服务对象", type: "mk", dataId: "160", categoryNo: "RYXX_0104",
              layer: [
                {id: "131", parentId: "13", name: "低保人员", value: false, type: "tc", dataId: "182", categoryNo: "RYXX_01040101"},
                {id: "132", parentId: "13", name: "特困救助", value: false, type: "tc", dataId: "183", categoryNo: "RYXX_010402"},
                {id: "133", parentId: "13", name: "残疾人员", value: false, type: "tc", dataId: "184", categoryNo: "RYXX_010403"},
                {id: "134", parentId: "13", name: "失业人员", value: false, type: "tc", dataId: "185", categoryNo: "RYXX_010404"},
                {id: "135", parentId: "13", name: "离休干部", value: false, type: "tc", dataId: "186", categoryNo: "RYXX_010405"},
                {id: "136", parentId: "13", name: "中共党员 ", value: false, type: "tc", dataId: "187", categoryNo: "RYXX_010406"},
                {id: "137", parentId: "13", name: "孤寡人员", value: false, type: "tc", dataId: "188", categoryNo: "RYXX_010407"},
                {id: "138", parentId: "13", name: "退休人员", value: false, type: "tc", dataId: "189", categoryNo: "RYXX_010408"},
                {id: "139", parentId: "13", name: "退役军人", value: false, type: "tc", dataId: "190", categoryNo: "RYXX_010409"},
                {id: "140", parentId: "13", name: "慢病患者", value: false, type: "tc", dataId: "191", categoryNo: "RYXX_010410"},
                {id: "141", parentId: "13", name: "志愿人员", value: false, type: "tc", dataId: "192", categoryNo: "RYXX_010411"},
                {id: "142", parentId: "13", name: "贫困户", value: false, type: "tc", dataId: "193", categoryNo: "RYXX_010412"},
                {id: "143", parentId: "13", name: "学生", value: false, type: "tc", dataId: "194", categoryNo: "RYXX_010413"},
                {id: "144", parentId: "13", name: "车主", value: false, type: "tc", dataId: "195", categoryNo: "RYXX_010414"},
              ]
            },
          ]
        },
        {id: "2", parentId: "0", name: "建筑信息", type: "mk", dataId: "156", categoryNo: "JZXX_02",
          layers: [
            {id: "21", parentId: "2", name: "房屋信息", type: "mk", dataId: "161", categoryNo: "", categoryName: null,
              layer: [
                {id: "211", parentId: "21", name: "房屋分布", value: false, type: "tc", dataId: "196", categoryNo: "JZXX_0201"},
              ]
            },
          ]
        },
        {id: "3", parentId: "0", name: "法人信息", type: "mk", dataId: "157", categoryNo: "FRXX_03",
          layers: [
            {id: "31", parentId: "3", name: "基础信息", type: "mk", dataId: "163", categoryNo: "", categoryName: null,
              layer: [
                {id: "311", parentId: "31", name: "法人分布", value: false, type: "tc", dataId: "201", categoryNo: "FRXX_0301"},
              ]
            },
            {id: "32", parentId: "3", name: "服务对象", type: "mk", dataId: "164", categoryNo: "FRXX_0302",
              layer: [
                {id: "321", parentId: "32", name: "规上企业", value: false, type: "tc", dataId: "202", categoryNo: "FRXX_030201"},
                {id: "322", parentId: "32", name: "小微企业", value: false, type: "tc", dataId: "203", categoryNo: "FRXX_030202"},
                {id: "323", parentId: "32", name: "民营企业", value: false, type: "tc", dataId: "204", categoryNo: "FRXX_030203"},
                {id: "324", parentId: "32", name: "国有企业", value: false, type: "tc", dataId: "205", categoryNo: "FRXX_030204"},
                {id: "325", parentId: "32", name: "污染监测", value: false, type: "tc", dataId: "206", categoryNo: "FRXX_030205"},
                {id: "326", parentId: "32", name: "党群机关", value: false, type: "tc", dataId: "207", categoryNo: "FRXX_030206"},
                {id: "327", parentId: "32", name: "事业单位", value: false, type: "tc", dataId: "208", categoryNo: "FRXX_030207"},
                {id: "328", parentId: "32", name: "社会团体", value: false, type: "tc", dataId: "209", categoryNo: "FRXX_030208"},
              ]
            },
          ]
        },
        {id: "4", parentId: "0", name: "基础设施", type: "mk", dataId: "165", categoryNo: "JCSS_04",
          layers: [
            {id: "41", parentId: "4", name: "市政设施", type: "mk", dataId: "170", categoryNo: "JCSS_0401",
              layer: [
                {id: "411", parentId: "41", name: "市政设施分布", value: false, type: "tc", dataId: "210", categoryNo: "JCSS_040101"},
              ]
            },
            {id: "42", parentId: "4", name: "市政设施类型", type: "mk", dataId: "171", categoryNo: "JCSS_040102",
              layer: [
                {id: "421", parentId: "42", name: "路灯", value: false, type: "tc", dataId: "211", categoryNo: "JCSS_04010201"},
                {id: "422", parentId: "42", name: "井盖", value: false, type: "tc", dataId: "212", categoryNo: "JCSS_04010202"},
                {id: "423", parentId: "42", name: "监控系统", value: false, type: "tc", dataId: "213", categoryNo: "JCSS_04010203"},
              ]
            },
            {id: "43", parentId: "4", name: "消防设施", type: "mk", dataId: "175", categoryNo: "JCSS_0402",
              layer: [
                {id: "431", parentId: "43", name: "消防设施分布", value: false, type: "tc", dataId: "214", categoryNo: "JCSS_040201"},
              ]
            },
            {id: "44", parentId: "4", name: "灭火类", type: "mk", dataId: "176", categoryNo: "JCSS_04020201",
              layer: [
                {id: "441", parentId: "44", name: "灭火器", value: false, type: "tc", dataId: "215", categoryNo: "JCSS_0402020101"},
                {id: "442", parentId: "44", name: "消火栓", value: false, type: "tc", dataId: "216", categoryNo: "JCSS_0402020102"},
                {id: "443", parentId: "44", name: "破拆工具", value: false, type: "tc", dataId: "217", categoryNo: "JCSS_0402020103"},
              ]
            },
            {id: "45", parentId: "4", name: "报警类", type: "mk", dataId: "177", categoryNo: "JCSS_04020202",
              layer: [
                {id: "451", parentId: "45", name: "火灾探测器", value: false, type: "tc", dataId: "218", categoryNo: "JCSS_0402020201"},
                {id: "452", parentId: "45", name: "报警按钮", value: false, type: "tc", dataId: "219", categoryNo: "JCSS_0402020202"},
                {id: "453", parentId: "45", name: "报警器", value: false, type: "tc", dataId: "220", categoryNo: "JCSS_0402020203"},
                {id: "454", parentId: "45", name: "火灾报警控制器", value: false, type: "tc", dataId: "221", categoryNo: "JCSS_0402020204"},
              ]
            },

          ]
        },
        {id: "5", parentId: "0", name: "公共服务", type: "mk", dataId: "167", categoryNo: "JCSS_0403",
          layers: [
            
          ]
        },
        {id: "6", parentId: "0", name: "辖区范围", type: "mk", dataId: "178", categoryNo: null, categoryName: null,
          layers: [
            {id: "61", parentId: "6", name: "辖区范围-区", type: "tc", dataId: "222", categoryNo: null},
            {id: "62", parentId: "6", name: "辖区范围-街道", type: "tc", dataId: "223", categoryNo: null},
            {id: "63", parentId: "6", name: "辖区范围-社区", type: "tc", dataId: "224", categoryNo: null},
            {id: "64", parentId: "6", name: "辖区范围-网格", type: "tc", dataId: "225", categoryNo: null},
          ]
        },
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    LayerStatusChange(info){
      this.layerstatus = info
      // 在子组件中需要向父组件传值处使用this.$emit("function",param);
      this.$emit('LayerStatus', this.layerstatus)
    }
  },
};
</script>

<style scoped>
</style>
