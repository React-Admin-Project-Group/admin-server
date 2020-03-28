define({ "api": [
  {
    "type": "delete",
    "url": "/admin/delete",
    "title": "根据id删除管理员",
    "name": "adminDel",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户登录的token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>要删除的用户_id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin",
    "title": "获取管理员列表",
    "name": "adminList",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>管理员列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin",
    "title": "管理员登录",
    "name": "adminLogin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>管理员登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>管理员登录密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "userInfo",
            "description": "<p>登录成功返回的一些信息，包括token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin",
    "title": "添加管理员",
    "name": "adminRegister",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>添加的管理员的名字(唯一)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>管理员注册密码, 不传默认为666666</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "authority",
            "description": "<p>添加的管理员权限, 不传默认为0</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/logout",
    "title": "管理员退出登录",
    "name": "loginOut",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户登录的token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>退出登录的用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/banner",
    "title": "添加广告",
    "name": "bannerAdd",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "banner_id",
            "description": "<p>添加的广告id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner_name",
            "description": "<p>添加的广告名称(唯一的,通过此名字判断是否重复)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner_type",
            "description": "<p>添加的广告类型</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/BannerRouter.js",
    "groupTitle": "Banner"
  },
  {
    "type": "delete",
    "url": "/banner/delete",
    "title": "根据id删除广告",
    "name": "bannerDel",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>要删除的_id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/BannerRouter.js",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/banner",
    "title": "获取广告数据列表",
    "name": "bannerList",
    "group": "Banner",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>广告数据列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/BannerRouter.js",
    "groupTitle": "Banner"
  },
  {
    "type": "put",
    "url": "/banner",
    "title": "修改广告",
    "name": "bannerUpData",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>通过此id来修改那一条</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "banner_id",
            "description": "<p>修改的广告id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner_name",
            "description": "<p>修改的广告名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner_type",
            "description": "<p>修改的广告类型</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息提示</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/BannerRouter.js",
    "groupTitle": "Banner"
  }
] });
