const char PAGE_INDEX[] PROGMEM = R"=====(
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ESP8266物聯網</title>
    <link href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css">
    <style type="text/css">
    body {
        font-family: "微軟正黑體", "黑體-繁", sans-serif;
    }
    #slider {
    width: 300px;
    margin: 15px;
    }
    </style>
  </head>

  <body>
    <h1>燈光控制器</h1>
    LED亮度：
    <div id="slider"></div>
    LED開關：
    <div id="LED_SW">
        <input type="radio" id="LED_ON" class="SW" value="ON" name="SW"><label for="LED_ON"> 開 </label>
        <input type="radio" id="LED_OFF" class="SW" checked="checked" value="OFF" name="SW"><label for="LED_OFF"> 關 </label>
    </div>
    <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script>
    var light = 127;

    $(function() {
    $( "#LED_SW" ).buttonset();
    $(".SW").change(function(evt) {
        var state = $(this).val();
        $.post("/sw", {led:state});
    });

    $( "#slider" ).slider({
        orientation: "horizontal",
        range: "max",
        max: 255,
        value: 127,
        change: function(){
        var val = $(this).slider("value");
        $.post("/pwm", {led:val});
        }
    });
    });
    </script>
  </body>
</html>
)=====";
