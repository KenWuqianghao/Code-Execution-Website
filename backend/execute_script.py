
import traceback
try:
    exec('# Write your Python code here\nprint(\'Hello, world!\')\nfor i in range (10):\n    print("hello world")')
except Exception as e:
    print('Error:', traceback.format_exc())
