
//划拨弹窗
function popupAll(obj){
	//点击手动录单模态框---开始
	/*建立模态框对象*/
	var modalBox = {};
	//		获取勾选的卡号数量
	//		选中卡号iccid的集合
	modalBox.iccidList = [];
	/*获取模态框*/
	modalBox.modal = document.getElementById(obj.id);
	/*获得关闭按钮*/
	modalBox.closeBtn = document.getElementById(obj.id).querySelector(".close");
	modalBox.cancelBtn = document.getElementById(obj.id).querySelector(".cancel");
	/*模态框显示*/
	modalBox.show = function() {
		this.modal.style.display = "block";
	}
	/*模态框关闭*/
	modalBox.close = function() {
		this.modal.style.display = "none";
	}
	/*当用户点击模态框内容之外的区域，模态框也会关闭*/
	modalBox.outsideClick = function() {
		var modal = this.modal;
		window.onclick = function(event) {
			if(event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
	/*模态框初始化*/
	modalBox.init = function() {
		var that = this;
		that.show();
		modalBox.closeBtn.onclick = function() {
			that.close();
		}
		modalBox.cancelBtn.onclick = function() {
			that.close();
		}
		this.outsideClick();
	}
	modalBox.init();
}

//高级搜索
function specialSearch(self) {
	console.log(self)
}

//续费


