(function() {
	// 封装方法
	var dog = {
		$: function(selector) {
			return document.querySelector(selector);
		},
		on: function(el, type, handler) {
			if (el.addEventListener) {
				el.addEventListener(type, handler, false);
			} else if (el.attachEvent) {
				el.attachEvent("on" + type, handler);
			}
		}
	};

	function render() {
		var cale = dog.$('calendar'),
        caleTit  = document.createElement('div'),
        caleBody = document.createElement('div');

    // header
    caleTit.className = 'cale-tit';
    caleTit.innerHTML = "<span class='prev-month'></span>" +
                    "<span class='next-month'></span>" +
                    "<span class='cale-tit'></span>";
    cale.appendChild(caleTit);

    // HTML结构渲染
    caleBody.className = 'cale-body';
    var tableHead = "<tr>" +
                      "<th>日</th>" +
                      "<th>一</th>" +
                      "<th>二</th>" +
                      "<th>三</th>" +
                      "<th>四</th>" +
                      "<th>五</th>" +
                      "<th>六</th>" +
                    "<tr>";
    var tableBody = '';

    // 七行六列, 一个月最多就31天.
    for (var i = 0; i < 6; i++) {
      tableBody = "<tr>" +
                      "<th></th>" +
                      "<th></th>" +
                      "<th></th>" +
                      "<th></th>" +
                      "<th></th>" +
                      "<th></th>" +
                      "<th></th>" +
                    "<tr>";
      caleBody.innerHTML = "<table class='cale-table'>" +
                               tableHead + tableBody +
                           "</table>";
      cale.appendChild(caleBody);
    }
  }

  function calendar() {
    var args = arguments[0],
        days = args.zh[0]
        dom  = args.dom;

    this.init();
  }

  calendar.prototype = {
    init : function() {
      this.render();
    },
    now : new Date(),
    // 渲染HTML
    render : function() {
      var that = this,
          el = document.getElementById('calendar');

      if(el) {
        
      }

      var cale = dog.$('calendar'),
          caleTit  = document.createElement('div'),
          caleBody = document.createElement('div');

      // header
      caleTit.className = 'cale-tit';
      caleTit.innerHTML = "<span class='prev-month'></span>" +
                      "<span class='next-month'></span>" +
                      "<span class='cale-tit'></span>";
      cale.appendChild(caleTit);

      for (var i = 0, len = this.days;i < len; i++) {

      }
    },

  };

  function showCalender() {
    // 获取日期
    var time  = new Date(),
        year  = time.getFullYear(),
        week  = time.getDay(),
        day   = time.getDate(),
        month = time.getMonth();

    // 标题日期
    var caleTit = g.$('.cale-tit'),
        titStr  = year + " / " + (month + 1) + " / ";
    caleTit.innerHTML = titStr;

    // 日期 data
    var table = g.$('.cale-table'),
        tds   = document.getElementsByTagName('td');
        startDay = new Date(year, month, 1);   // 当月第一天

     for (var i = 0; i < tds.length; i++) {

     }
  }

  var defaults = {
    days:  ['日','一','二','三','四','五','六'],
    dom: [
          "<tr>" +
            "<th></th>" +
            "<th></th>" +
            "<th></th>" +
            "<th></th>" +
            "<th></th>" +
            "<th></th>" +
            "<th></th>" +
          "<tr>"
        ]
  };

  function init(data){
    new calendar(data);
  }

  init(defaults);

})();