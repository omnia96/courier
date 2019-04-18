// components/D-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size:{
      type:String,
      value:"midsize"
    },
    round:{
      type:Boolean,
      value:false
    },
    value:{
      type:String,
      value:"button"
    },
    border:{
      type:String,
      value:""
    },
    color:{
      type:String,
      value:""
    },
    backGroundColor:{
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap:function(){
      this.triggerEvent('click');
    }
  }
})
