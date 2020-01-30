var app = {
    init: function() {
		$(document).on('deviceready', app.onDeviceReady);
        $('#ledPanel').hide();
    },
    onDeviceReady: function() {		
		app.listBT();

		$(document).on('tap', '.BTitem', function () {
			var bt = $(this).attr('data-mac');
			// 設定在msgDiv顯示4秒鐘文字
			app.showMsg("與裝置連線中…");
			bluetoothSerial.connect(bt, app.onConnect, app.onDisconnect);        
		});
	    
		// 建立所有按鈕的事件處理程式：
		// 連接藍牙裝置
		// 「重新整理」鈕
		// 「中斷藍芽連線」鈕
		// 「LED開關」	
		$('#refreshBtn').on('tap', function(e) {
			e.preventDefault();
			
		    app.listBT();
		});
		
		$('#disconnectBtn').on('tap', function(e) {
            e.preventDefault();

			// // 設定在msgDiv顯示4秒鐘文字
			app.showMsg("中斷連線中…");
			bluetoothSerial.disconnect(app.onDisconnect);
		});

        $('#ledSW').on('change', function () {
			var data = $(this).val();
			bluetoothSerial.write(data);
			app.showMsg("送出資料： " + data);
		});
		
    },
    onConnect: function() {
        $('#btPanel').hide(200);
        $('#ledPanel').show(200);
        app.showMsg("已連線");
    },
    onDisconnect: function() {
        $('#btPanel').show(200);
        $('#ledPanel').hide(200);
        app.showMsg("已斷線");
    },
    timeoutId: 0,
    showMsg: function(msg) {
        if (app.timeoutId) {
            clearTimeout(app.timeoutId);
        }
        $('#msg').text(msg);
        app.timeoutId = setTimeout(function() { $('#msg').text(""); }, 4000);
    },
	
	listBT: function() {
		// 設定在msgDiv顯示4秒鐘文字
		app.showMsg("探尋藍牙裝置…");
				
		bluetoothSerial.list(app.onListBT, function() {
			app.showMsg("探尋藍牙裝置時出現問題…");
		});
	},
	
    onListBT: function(devices) {
        var listItem, mac;

        $('#btList').html('<li data-role="list-divider">藍牙裝置</li>');
        app.showMsg("");
        
        devices.forEach(function(bt) {
            if (bt.hasOwnProperty("address")) {
                mac = bt.address;
            } else {
                mac = "出錯了：" + JSON.stringify(bt);
            }
            // 標準設置標籤屬性的語法
			listItem = $('<li class="BTitem"></li>')
                        .attr({ 'data-mac' : mac })
                		.html('<a href="#"><img src="img/bluetooth.png" class="ui-li-icon">'
						        + bt.name + "<br/><i>" + mac + "</i></a>");
            $('#btList').append(listItem);
        });
		$("#btList").listview("refresh");

        if (devices.length === 0) {
           app.showMsg("請先配對好藍牙裝置。");
        } else {
            app.showMsg("找到 " + devices.length + " 個藍牙裝置。");
        }
    }
};