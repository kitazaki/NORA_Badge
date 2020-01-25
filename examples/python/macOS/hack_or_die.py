from __future__ import print_function

import time
import uuid

import Adafruit_BluefruitLE

CHARACTERISTIC_SERVICE_UUID = uuid.UUID('0000fee0-0000-1000-8000-00805f9b34fb')
CHARACTERISTIC_DATA_UUID = uuid.UUID('0000fee1-0000-1000-8000-00805f9b34fb')

provider = Adafruit_BluefruitLE.get_provider()

def main():
    provider.clear_cached_data()
    adapter = provider.get_default_adapter()
    if not adapter.is_powered:
        adapter.power_on()
    print('Searching for device...')
    try:
        adapter.start_scan()
        device = provider.find_device(service_uuids=[CHARACTERISTIC_SERVICE_UUID])
        if device is None:
            raise RuntimeError('Failed to find device!')
        else:
            print(device)
            print('device: {0}'.format(device.name))
            print('id: {0}'.format(device.id))
    finally:
        adapter.stop_scan()
    print('Connecting to device...')
    device.connect()
    try:
        print('Discovering services...')
        device.discover([CHARACTERISTIC_SERVICE_UUID], [CHARACTERISTIC_DATA_UUID])
        service = device.find_service(CHARACTERISTIC_SERVICE_UUID)
        print('service uuid: {0}'.format(service.uuid))
        data = service.find_characteristic(CHARACTERISTIC_DATA_UUID)
        print('characteristic uuid: {0}'.format(data.uuid))
        print('Writing Data..')
        bs = bytes(range(16))
        bs = b'\x77\x61\x6E\x67\x00\x00\x00\x00\x30\x00\x00\x00\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x0b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x00\x00\x00\x00\x00\xE1\x0C\x06\x17\x2D\x23\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x00\xc6\xc6\xc6\xfe\xc6\xc6\xc6\xc6\x00\x00\x00\xfe\xc6\xc6'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\xfe\xc6\xc6\xc6\xc6\x00\x00\x00\xfe\xc6\xc0\xc0\xc6\xc6\xc6\xfe'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x00\x00\xc6\xcc\xd8\xf0\xd8\xcc\xc6\xc6\x00\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x7c\x6c\x6c'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x7c\x00\x00\x00\x00\x00\x00\x00\x6c\x78\x70\x60\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf8\xce\xc6\xc6\xc6\xc6'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\xce\xf8\x00\x00\x00\x30\x30\x30\x30\x30\x30\x30\x30\x00\x00\x00'
        data.write_value(bs)
        time.sleep(0.1)
        bs = b'\xfe\xc0\xc0\xfe\xc0\xc0\xc0\xfe\x00\x00\x00\x00\x00\x00\x00\x00'
        data.write_value(bs)
        time.sleep(3)
        print('Writing done.')
    finally:
        device.disconnect()

provider.initialize()
provider.run_mainloop_with(main)

