# 基于vue的一款进度条组件

## 文档

### 举例

> 这里主要以第一个默认组件为例子 来举例如何调用使用 组件名为 NormalBar.vue

> 具体组件API查看下面文档

### 一 使用方法
- 安装组件

	``` npm
	npm i vue-progressbar -S
	```
- 注册组件 在vue文件中引用组件
		
	``` example 
	import NormalBar from 'vue-progressbar/src/components/normalBar'
	components = {
		NormalBar
	}
	```

### 二 通用初始化步骤

- 初始化组件

	``` example
	data () {
	  return {
	    normalBar: NormalBar.empty()
	  }
	}
	```

- 绑定data对象

	``` example
	<NormalBar :value="normalBar" @change="changeNormalBar"/>
	```

- 监听组件变更 change

	``` example
	changeNormalBar (value) {
		this.normalBar = NormalBar.empty(NormalBar.Logic.setCurrentTime(value))   
	}
	```
	
### 三 组件相关API

- #### NormalBar.vue
	
	##### props
	
	| Options | Type | Description | Default |
	| :------ | :------:| :------:| :------: |
	| width | Number | 进度条宽度 | 605 |
	| height | Number | 进度条高度 | 16 |
	| totalTime | Number | 总秒数 | 10 |
	| currentTime | Number | 当前剩余秒数 | 10 |
	| barDefaultColor | String | 进度条默认底色 | '#E9E9E9' |
	| barColor | String | 进度条进度底色 | '#FFB936' |
	| showInfo | Boolean | 是否显示倒计时 | true |
	| testStyle | Object | 进度条倒计时样式 | 样式对象 |
		
	##### methods
	
	##### empty 
	
	> 初始化props 用法如下
	
	``` example
	NormalBar.empty({
	    totalTime: 15,
	    showInfo: false
	})
	```
	
	##### Logic
	
	| Options | Type | Description | Default |
	| :------ | :------:| :------:| :------: |
	| setCurrentTime | Function | 设置当前秒数 | props |
	| setHidden | Function | 设置隐藏倒计时 | props |
	
	> 用法如下
	
	``` example
	NormalBar.Logic.setCurrentTime(Number) // 更新切换状态
	```	
	``` example
	NormalBar.Logic.setHidden() // 更新切换状态
	```	

