from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from typing import Union
from pydantic import BaseModel
import docker
from docker.errors import ContainerError, ImageLoadError
client = docker.from_env()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str

@app.post("/execute/")
async def execute_code(code_request: CodeExecutionRequest):
    execution_result = execute_user_code_securely(code_request.code)
    return {"result": execution_result}

def execute_user_code_securely(user_code):
    """
    Executes user-provided Python code securely in an isolated Docker container.
    Args:
        user_code (str): The user's Python code as a string.
        timeout (int): Maximum time in seconds allowed for the code to run.

    Returns:
        str: The output from the code execution, or an error message if something goes wrong.
    """
    try:
        # Prepare the Python script file
        script_content = f"""
import traceback
try:
    exec({repr(user_code)})
except Exception as e:
    print('Error:', traceback.format_exc())
"""
        # Write user code to a temporary Python file
        with open('execute_script.py', 'w') as file:
            file.write(script_content)

        # Build a new Docker image with the script
        image_tag = "backend"
        client.images.build(path=".", tag=image_tag, rm=True)

        # Run the container
        log = client.containers.run(image_tag, auto_remove=True, network_disabled=True, command="python execute_script.py")
        print(log.decode('utf-8'))
        return log.decode('utf-8')

    except (ContainerError, ImageLoadError, Exception) as e:
        return f"Failed to execute code: {str(e)}"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)