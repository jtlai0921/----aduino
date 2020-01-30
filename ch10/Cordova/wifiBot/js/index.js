var app = {
    nextPage:"",
    host:"",
	port:80,
    splashTime:3000,
    init: function() {
		$(document).on('deviceready', app.onDeviceReady);
    },
    onDeviceReady: function() {  
        $("#ledSw").on("change", function(e){
            var val = $(this).val();
            var swData = {"pin":13, "sw":val};
            // 向第13腳送出開關訊號
            $.ajax({
                url: "http://" + app.host + ":" + app.port + "/sw",
                data: swData,
                success: function( d ) {
                    app.showMsg("收到伺服器回應：" + d );
                }
            });
        });
        
		$('#saveBtn').on('tap', function(){
			app.host = $("#deviceIP").val();
			app.port = $("#devicePort").val();
            localStorage.setItem('deviceIP', app.host);
            localStorage.setItem('devicePort', app.port);
            location.hash = 'ctrlPage';
		});
    },
    timeoutId: 0,
    showMsg: function(msg) {
        if (app.timeoutId) {
            clearTimeout(app.timeoutId);
        }
        $('#msg').text(msg);
        app.timeoutId = setTimeout(function() { $('#msg').text(""); }, 4000);
    },
    splashTimer : function(){
       setTimeout(function() {
           // 進入下一頁
          location.hash = app.nextPage;
       }, app.splashTime);
    }
};

$(document).on("pageshow", "#ctrlPage", pageEvt);
function pageEvt (e) {
  $( "#pwmSlider" ).on( "slidestop", function( e ) {
    var pwm = Math.ceil($(this).val() * 2.55);
    var pwmData = {"pin":9, "pwm":pwm};
    // 向第9腳送出PWM訊號
    $.ajax({
        url: "http://" + app.host + ":" + app.port + "/pwm",
        data: pwmData,
        success: function( d ) {
            app.showMsg("收到伺服器回應：" + d );
        }
    });
  });
  
  $(document).off("pageshow", "#ctrlPage", pageEvt);
}

$(document).on("pageshow", "#splashPage", function( e ) {
    var host = localStorage.getItem('deviceIP');
    if (host === null) {
      app.nextPage = "netPage";
    } else {
      app.host = host;
      app.port = localStorage.getItem('devicePort');
      $("#deviceIP").val(app.host);
      $("#devicePort").val(app.port);
      app.nextPage = "ctrlPage";
    }
    // 啟動計時器
    app.splashTimer();
});

app.init();