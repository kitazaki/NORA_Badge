const noble = require('@abandonware/noble');

const serviceUUID = "0000fee000001000800000805f9b34fb";
const dataUUID = "0000fee100001000800000805f9b34fb";
const characteristicUUID = "fee1";

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([serviceUUID], false);
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStart', function() {
    console.log('on -> scanStart');
});
  
noble.on('scanStop', function() {
    console.log('on -> scanStop');
});
 
noble.on('discover', function(peripheral){
    console.log('on -> discover: ' + peripheral);

    noble.stopScanning();

    peripheral.on('connect', function() {
        console.log('on -> connect');
        this.discoverServices();
    });
  
    peripheral.on('disconnect', function() {
        console.log('on -> disconnect');
    });

    peripheral.discoverServices([dataUUID], function(err, services) {
        console.log('on -> Service: ' + services);
        services.forEach(function(service) {
            console.log('found service:', service.uuid);
            service.discoverCharacteristics([], function(err, characteristics) { 
                characteristics.forEach(function(characteristic) {
                    console.log('found characteristic:', characteristic.uuid);
                    if (characteristicUUID == characteristic.uuid) {
                        console.log('writing data..');
                        characteristic.write(new Buffer([0x77, 0x61, 0x6E, 0x67, 0x00, 0x00, 0x00, 0x00, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x0b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xE1, 0x0C, 0x06, 0x17, 0x2D, 0x23, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x00, 0xc6, 0xc6, 0xc6, 0xfe, 0xc6, 0xc6, 0xc6, 0xc6, 0x00, 0x00, 0x00, 0xfe, 0xc6, 0xc6]), true);
                        sleep();
                        characteristic.write(new Buffer([0xfe, 0xc6, 0xc6, 0xc6, 0xc6, 0x00, 0x00, 0x00, 0xfe, 0xc6, 0xc0, 0xc0, 0xc6, 0xc6, 0xc6, 0xfe]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x00, 0x00, 0xc6, 0xcc, 0xd8, 0xf0, 0xd8, 0xcc, 0xc6, 0xc6, 0x00, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x6c, 0x6c]), true);
                        sleep();
                        characteristic.write(new Buffer([0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6c, 0x78, 0x70, 0x60, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf8, 0xce, 0xc6, 0xc6, 0xc6, 0xc6]), true);
                        sleep();
                        characteristic.write(new Buffer([0xce, 0xf8, 0x00, 0x00, 0x00, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x00, 0x00, 0x00]), true);
                        sleep();
                        characteristic.write(new Buffer([0xfe, 0xc0, 0xc0, 0xfe, 0xc0, 0xc0, 0xc0, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), true);
                        sleep();
                        console.log('writing done.');
                    }
                });
            });
        }); 
    }); 

    peripheral.connect(function(err) {
        console.log('connected to peripheral: ' + peripheral.uuid);
    });
});

function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

