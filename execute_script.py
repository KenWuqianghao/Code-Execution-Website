
import traceback
try:
    exec('\nprint("Hello, world!")\n')
except Exception as e:
    print('Error:', traceback.format_exc())
