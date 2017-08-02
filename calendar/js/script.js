(function() {
	// Package
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

  function calendar() {
    var args = arguments[0];

    for (var key in args) {
      this[key] = args[key];
    }
    this.init();
  }

  calendar.prototype = {
    init : function() {
      this.render();
    },

    now : new Date(),

    create: function(ele) {
      return document.createElement(ele);
    },

    // Rendering HTML
    render : function() {
      var that = this,
          data = this.zh,
          el = null,
          caleBox = this.create('div'),
          cale = dog.$('#calendar');

      if(el = dog.$('#caleBox')) {
        this.calendar = el;
      } else {
        createCalendar();
        that.fillTitle();
        that.fillWeek();
        that.fillDay();
        that.fillYear();
        that.addPrevMonth();
        that.addNextMonth();
      }
      function createCalendar() {
        caleBox.innerHTML = '<div class="cale-title"></div>' +
                            '<div class="cale-table-box">' +
                              '<table class="cale-table">' +
                                '<thead></thead>' + '<tbody></tbody>' +
                              '</table>'+
                            '</div>';
       caleBox.className = 'cale-box';
       caleBox.id = 'caleBox';
       cale.appendChild(caleBox);
       that.calendar = caleBox;
      }
    },

    // Calendar title
    fillTitle: function() {
      var caleTit = this.calendar.querySelector('.cale-title');

      caleTit.innerHTML = "<span class='prev-month'></span>" +
                      "<label class='cale-tit'></label>" +
                      "<span class='next-month'></span>";
    },

    fillWeek: function() {
      var html = '<tr>',
          n = 0,
          days = this.zh.days;

      // Week
      while (n < days.length) {
        html += '<th>' + days[n++] + '</th>';
      }
      html += '</tr>';
      this.calendar.querySelector('thead').innerHTML += html;
    },

    // Calendar Main body
    fillDay: function(now) {
      var calendar = this.calendar,
          tBody = calendar.querySelector('tbody'),
          time  = now || this.getFullTime(),

          // 第一天是星期几, 'data'一个月的天数
          startDay = (new Date(time.year, time.month - 1, 1)).getDay(),
          data = this.getDaysInMonth(time.year, time.month),
          html = '',
          num = 1,
          tr = null,
          td = null;

      // day
      this.time = time;
      tBody.innerHTML = '';

        // 渲染表格并传入数字
        for (var i = 0;i < 6; i++) {
          tr = tBody.insertRow(i);

          //插入内容
          for (var j = 0; j < 7; j++) {
            td = tr.insertCell(j);
            if (num <= data) {
              td.innerHTML = (startDay-- > 0) ? '' : (td.className = 'day', num++);
            }

            // 遍历到'today', 就添加类名高亮
              if (td.innerHTML == time.day) {
                td.className += ' active';
              }
          }
        }

      tBody.appendChild(tr);
    },

    fillYear: function() {
      var el   = this.calendar.querySelector('.cale-tit'),
          time = this.time;

      el.innerHTML = time.year + '年' + time.month + '月';
    },

    getFullTime : function(now){
        var time  = now || new Date(),
            year  = time.getFullYear(),
            week  = time.getDay(),
            day   = time.getDate(),
            month = time.getMonth();

        this.month = month;
        return {
            date  : time,
            year  : year,
            week  : week,
            day   : day,
            month : month + 1
        };
    },

    // 一个月有多少天, 前面 getFullTime 在返回时"month + 1"
    getDaysInMonth: function (year, month) {
      return new Date(year, parseInt(month), 0).getDate();
    },

    // 翻页
    addNextMonth: function() {
      var next = dog.$('.next-month');
      dog.on(next, 'click', this.nextMonthHandle.bind(this));
    },

    // 这里的函数直接加到监听器中的话会读取不到'time'
    nextMonthHandle: function(e) {
        var date = this.time.date;

        // 重设月份
        date.setMonth(++this.month);
        this.fillDay(this.getFullTime(date));
        this.fillYear();
    },

    addPrevMonth: function() {
      var prev = dog.$('.prev-month');
      dog.on(prev, 'click', this.prevMonthHandle.bind(this));
    },
    prevMonthHandle: function(e) {
        var date = this.time.date;

        // 重设月份
        date.setMonth(--this.month);
        this.fillDay(this.getFullTime(date));
        this.fillYear();
    }
  };

  var defaults = {
    zh: {
      days:  ['日','一','二','三','四','五','六']
    }
  };

  function init(){
    new calendar(defaults);
  }
  init();

})();