function ready(fn) {
	// IE模拟DOMContentLoaded
	function IEContentLoaded (fn) {
		var d = window.document;
		var done = false;

		// 只执行一次用户的回调函数init()
		var init = function () {
			if (!done) {
				done = true;
				fn();
			}
		};

		(function() {
			try {
				// DOM树未创建完之前调用doscroll会抛出错误
				d.documentElment.doScroll('left');
			} catch (e) {
				// 延迟再尝试一遍
				setTimeout(arguments.callee, 50);
				return;
			}
			// 没有错误就表示DOM树已经构建完毕,执行用户回调
			init();
		})();

		// 监听ducument的加载状态
		d.onredystatechange = function() {
			// 如果用户是在domReady之后绑定的函数,就立即执行
			if (d.readyState == 'complete') {
				d.onredystatechange = null;
				init();
			}
		};
	}
}