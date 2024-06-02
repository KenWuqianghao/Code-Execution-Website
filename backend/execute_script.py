
import traceback
try:
    exec('for i in range (10):\n    print("Hello World")')
except Exception as e:
    print('Error:', traceback.format_exc())
