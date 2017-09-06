/*
 * 作者：yuanwei
 * 使用说明：
 * 	tier.alert({message: "",label: "",callback: null})
 * 	tier.confirm({message: "",title: "",confirm: "",cancle: "",callback: null})	
 * 日期：2017/9/6
 */
(function (win, doc) {
	var alertOptions,
		confirmOptions,
		tier;
		
	alertOptions = {
		message: "",
		label: "确定",
		callback: null
	}
	confirmOptions = {
		title: "",
		message: "",
		confirm: "确定",
		cancle: "取消",
		callback: null
	}
	function $$ (v) {
		return doc.querySelector(v);
	}
	
	function Tier() {
		this.alertDom = null;
		this.confirmDom = null;
	}
	Tier.prototype.config = function (opts, oldOpts) {
		for (var key in opts) {
			oldOpts[key] = opts[key];
		}
		return oldOpts
	}
	// alert
	Tier.prototype.createAlertDom = function (opts) {
		doc.body.className = "yui_over_hidden";
		if (this.alertDom !== null) {
			$$("#tier-alert .yui-dialog__bd").innerHTML = opts.message;
			$$("#tier-alert-btn").innerHTML = opts.label;
			this.alertDom.style.display = "block";
			return;
		};
		var oAlert = doc.createElement("div"),
			alertHtml = `
				<div class="yui-mask"></div>
	            <div class="yui-dialog">
	                <div class="yui-dialog__bd">${opts.message}</div>
	                <div class="yui-dialog__ft">
	                    <a href="javascript:;" id="tier-alert-btn" class="yui-dialog__btn">${opts.label}</a>
	                </div>
	           </div>
			`;
		oAlert.id = "tier-alert";
		oAlert.innerHTML = alertHtml;
		doc.body.appendChild(oAlert);
		$$("#tier-alert-btn").addEventListener("click", function () {
			oAlert.style.display = "none";
			doc.body.className = "";
			if (typeof opts.callback === "function") opts.callback();
		})
		return (this.alertDom = oAlert);
	}
	Tier.prototype.alert = function () {
		var argus = arguments[0],
			config = null;
		if (Object.prototype.toString.call(argus).slice(-7, -1) === "Object") {
			config = this.config(argus, alertOptions);
			this.createAlertDom(config);
		}
	}
	// confirm
	Tier.prototype.createConfirmDom = function (opts) {
		doc.body.className = "yui_over_hidden";
		if (this.confirmDom !== null) {
			$$("#tier-confirm .yui-dialog__title").innerHTML = opts.title ? opts.title : "";
			$$("#tier-confirm .yui-dialog__bd").innerHTML = opts.message;
			$$("#tier_confirm_cancle").innerHTML = opts.cancle;
			$$("#tier_confirm_confirm").innerHTML = opts.confirm;
			this.confirmDom.style.display = "block";
			return;
		};
		var oConfirm = doc.createElement("div"),
			confirmHtml = `
				<div class="yui-mask"></div>
	            <div class="yui-dialog">
	                <div class="yui-dialog__hd"><strong class="yui-dialog__title">${opts.title ? opts.title : ""}</strong></div>
	                <div class="yui-dialog__bd">${opts.message}</div>
	                <div class="yui-dialog__ft">
	                    <a href="javascript:;" id="tier_confirm_cancle" class="yui-dialog__btn yui-dialog__btn_default">${opts.cancle}</a>
	                    <a href="javascript:;" id="tier_confirm_confirm" class="yui-dialog__btn yui-dialog__btn_primary">${opts.confirm}</a>
	                </div>
	            </div>
			`;
		oConfirm.id = "tier-confirm";
		oConfirm.innerHTML = confirmHtml;
		doc.body.appendChild(oConfirm);
		$$("#tier_confirm_cancle").addEventListener("click", function () {
			oConfirm.style.display = "none";
			doc.body.className = "";
		})
		$$("#tier_confirm_confirm").addEventListener("click", function () {
			oConfirm.style.display = "none";
			doc.body.className = "";
			opts.callback.call(null, true);
		})
		return (this.confirmDom = oConfirm);
	}
	Tier.prototype.confirm = function () {
		var argus = arguments[0],
			config = null;
		if (Object.prototype.toString.call(argus).slice(-7, -1) === "Object") {
			config = this.config(argus, confirmOptions);
			this.createConfirmDom(config);
		}
	}
	return win.tier = new Tier();
})(window, document);