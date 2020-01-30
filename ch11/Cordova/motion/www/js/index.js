var app = {
	watchID:0,
	timeoutId: 0,

    init: function() {
		$(document).on('deviceready', app.onDeviceReady);
        $('#motionPanel').hide();
    },
    onDeviceReady: function() {		
		app.listBT();

		$(document).on('tap', '.BTitem', function () {
			var bt = $(this).attr('data-mac');
			app.showMsg("與裝置連線中…");
			bluetoothSerial.connect(bt, app.onConnect, app.onDisconnect);        
		});
	    
		$('#refreshBtn').on('tap', function(e) {
			e.preventDefault();
			
		    app.listBT();
		});
		
		$('#disconnectBtn').on('tap', function(e) {
            e.preventDefault();

			app.showMsg("中斷連線中…");
			bluetoothSerial.disconnect(app.onDisconnect);
		});

        $('#accSW').on('change', function () {
			var data = $(this).val();
			var motionOpt = {frequency:100};
			
			if (data == '1') {
			   app.watchID = navigator.accelerometer.watchAcceleration(app.onMotionSuccess,
                                                      			       app.onMotionError,
                                                                       motionOpt);
			} else {
				navigator.accelerometer.clearWatch(app.watchID);
			}
		});
		
    },
	
	onMotionSuccess: function(acc) {
		var servo = {
			x:Math.floor((acc.x + 10) * 9),
			y:Math.floor((acc.y + 10) * 9)
		};
		
		var str = 'X: ' + acc.x + '<br>' +
		          'Y: ' + acc.y + '<br>' +
				  'Z: ' + acc.z + '<br>' +
				  '時間: ' + acc.timestamp + '<br><br>' + 
				  '轉換值：<br>' +
				  'Servo X: ' + servo.x + '<br>' + 
				  'Servo Y: ' + servo.y;
		
		$('#accData').html(str);
		bluetoothSerial.write(servo.x + ',' + servo.y + '\n');
	},
	
	onMotionError: function() {
		app.showMsg("無法讀取加速度值…");
	},
	
    onConnect: function() {
        $('#btPanel').hide(200);
        $('#motionPanel').show(200);
        app.showMsg("已連線");
    },
    onDisconnect: function() {
        $('#btPanel').show(200);
        $('#motionPanel').hide(200);
        app.showMsg("已斷線");
    },
  
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

app.init();