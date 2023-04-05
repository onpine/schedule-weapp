
### 目录
- [目录](#目录)
- [数据库 wxlpSchedule](#数据库-wxlpschedule)
  - [日程表 schedule](#日程表-schedule)
  - [用户表 user](#用户表-user)
  - [群组表 group](#群组表-group)
- [后端接口](#后端接口)
  - [获取日程信息 getschedule](#获取日程信息-getschedule)
  - [创建/修改/删除日程 schedule](#创建修改删除日程-schedule)
  - [群组列表 listgroup](#群组列表-listgroup)
  - [创建/修改/删除群组 group](#创建修改删除群组-group)

### 数据库 wxlpSchedule
#### 日程表 schedule

|字段名称|数据类型|数据长度|是否为空|备注|
|:-|:-|:-|:-|:-|
|id|int|4|否|日程 id|
|describe|longtext|1M|否|日程描述|
|date|datetime|255|否|日程日期|
|start_time|datetime|255|否|开始时间|
|finish_time|datetime|255|否|结束时间|
|user_id|int|4|否|创建用户 id|
|group_id|int|4|是|归属群组 id|
|update_time|datetime|255|否|更新时间|

#### 用户表 user

|字段名称|数据类型|数据长度|是否为空|备注|
|:-|:-|:-|:-|:-|
|id|int|4|否|用户 id|
|nickname|varchar|255|否|昵称|
|header|longtext|10M|是|头像|
|wx_id|varchar|255|是|wx id|
|phone|varchar|255|是|手机号|
|qq|varchar|255|是|qq|
|emali|varchar|255|是|电子邮箱|

#### 群组表 group

|字段名称|数据类型|数据长度|是否为空|备注|
|:-|:-|:-|:-|:-|
|id|int|4|否|群组 id|
|name|varchar|255|否|名称|
|user_id|int|4|否|用户 id|
|isadmin|int|4|否|是否是管理员<br>0: 成员<br>1: 管理员|

### 后端接口
#### 获取日程信息 getschedule
**请求**

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|user_id|int|否|用户 id|
|date|date|否|查询指定日期的日程|

```json
{
    "user_id": 1,
    "date": "2023-04-02",
}
```

**返回** 一个列表，列表中存在多个字典，每个字典中的元素如下表

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|schedule_id|int|否|日程 id|
|describe|longtext|否|日程描述|
|date|datetime|否|日程日期|
|start_time|datetime|否|开始时间|
|finish_time|datetime|否|结束时间|
|user_id|int|否|创建用户 id|
|group_id|int|否|归属群组 id|
|update_time|datetime|否|更新时间|

```json
{
    "schedules": [
        {
            "schedule_id": 1,
            "describe": "去牌店打牌",
            "date": "2023-04-02",
            "start_time": "2023-04-02 14:30:00",
            "finish_time": "2023-04-02 18:00:00",
            "user_id": 1,
            "group_id": 1,
            "update_time": "2023-04-02 05:55:17",
        },
        ...
    ],
}
```

#### 创建/修改/删除日程 schedule
**请求**

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|schedule_id|int|是|日程 id|
|date|datetime|是|日程日期|
|describe|longtext|跟随日期|日程描述|
|start_time|datetime|跟随日期|开始时间|
|finish_time|datetime|跟随日期|结束时间|
|user_id|int|跟随日期|创建用户 id|
|group_id|int|是|归属群组 id|

```json
{
    "schedule_id": 1,
    "date": "2023-04-02",
    "describe": "去牌店打牌",
    "start_time": "2023-04-02 14:30:00",
    "finish_time": "2023-04-02 18:00:00",
    "user_id": 1,
    "group_id": 1,
}
```

* 如果请求中只有 `schedule_id` 则会尝试删除对应的日程
* 如果请求中存在 `date` 字段，那么就会尝试修改相应的日程
* 如果请求中不存在 `schedule_id` 字段，那么其他字段必须都有，并创建新的日程信息
* `group_id` 如果为空，那么就为个人日程，如果是修改的话，会删除成员的日程

**返回** 被修改的日程 id

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|schedule_id|int|否|日程 id|

```json
{
    "schedule_id": 1,
}
```

#### 群组列表 listgroup
**请求**

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|user_id|int|否|用户 id|

```json
{
    "user_id": 6,
}
```

**返回** 一个列表，列表中存在多个字典，每个字典中的元素如下表

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|group_id|int|否|归属群组 id|
|name|varchar|否|群组名称|
|isadmin|int|否|是否是管理员<br>0: 成员<br>1: 管理员|

```json
{
    "groups": [
        {
            "group_id": 1,
            "name": "牌",
            "isadmin": 1,
        },
        ...
    ],
}
```

#### 创建/修改/删除群组 group
**请求**

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|group_id|int|是|群组 id|
|user_id|int|是|创建用户 id|
|name|varchar|是|群组名|
|member_id|list[int,]|是|成员用户 id 列表|

```json
{
    "group_id": 1,
    "user_id": 1,
    "name": "牌",
    "member_id": [2, 3, 4, ...],
}
```

* 删除群组：请求中只有 `group_id` 字段和 `user_id` 字段，则删除群组
* 添加群组：请求中只有 `user_id, name` 字段，创建群组
* 修改群组：请求中有 `group_id, user_id, name`，可以修改群组名
* 删除和修改都会验证传入的 `user_id` 是否为管理员
* 添加和修改都可以传入 `member_id` 列表，后端会遍历列表里的元素，依次将里面的用户加入群组，可以传入空列表

**返回** 被修改的群组 id

|参数名|数据类型|是否为空|备注|
|:-|:-|:-|:-|
|group_id|int|是|群组 id|

```json
{
    "group_id": 1,
}
```
