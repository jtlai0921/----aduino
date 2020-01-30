var app = {
    init: function() {
		$(document).on('deviceready', app.onDeviceReady);
        $('#ledPanel').hide();
    },
    onDeviceReady: function() {
		$('#openBtn').on('tap', function(e) {
			e.preventDefault();
		    // 開啟序列埠
			serial.requestPermission(
				function(msg) {
					serial.open(
						{baudRate: 9600},
						// 開啟序列埠成功
						app.onOpen,
						// 無法開啟序列埠
						app.showMsg("無法開啟序列埠：" + msg)
					);
				},
				app.showMsg("無法開啟序列埠：" + msg)
			);
		});
		
		$('#closeBtn').on('tap', function(e) {
            e.preventDefault();

			serial.close(app.onClose, app.showMsg("無法關閉序列埠：" + msg));
		});

        // throttle changes
        $('#ledSW').on('change', function () {
			var data = $(this).val();
			
			serial.write(
               data,
               function(msg) {
                  app.showMsg(msg);
               },
               app.showMsg("資料傳輸錯誤： " + msg)
            );
		});
		
    },
    onOpen: function(msg) {
        $('#serialPanel').hide(200);
        $('#ledPanel').show(200);
        
        var str = '';
        serial.registerReadCallback(
            function (data){
                // 處理輸入資料
                var raw = new Uint8Array(data);
                var total = raw.length;  // 儲存陣列長度
                for(var i=0; i < total; i++) {
                    if(raw[i] != 10) {  // 若非 '\n' 字元編碼……
                        var temp_str = String.fromCharCode(raw[i]);
                        str += temp_str;
                    } else { 
                        $('#A0').text(str);
                        str = '';
                    }
                }
            },
            app.showMsg(msg)
        );
    },
    onClose: function(msg) {
        $('#serialPanel').show(200);
        $('#ledPanel').hide(200);
        app.showMsg(msg);
    },
    timeoutId: 0,
    showMsg: function(msg) {
        if (app.timeoutId) {
            clearTimeout(app.timeoutId);
        }
        $('#msg').text(msg);
        app.timeoutId = setTimeout(function() { $('#msg').text(""); }, 4000);
    }
};