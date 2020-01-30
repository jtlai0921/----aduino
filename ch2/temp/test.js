var str = '{"溫度":22,"濕度":60,"數位腳":' + 
          '{"2":0,"3":1}}';

var obj = JSON.parse(str);
console.log('溫度：' + obj.溫度);
console.log('腳2：' + obj.數位腳[2]);