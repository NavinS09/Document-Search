import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
openai_api_base = os.getenv('OPENAI_API_BASE')

client = OpenAI(
    api_key=openai_api_key,
    base_url=openai_api_base,
)

models = client.models.list()
model = models.data[0].id

messages = [{"role": "user", "content": "Who is MS Dhoni and what are his achievements as a captain?"}]
response = client.chat.completions.create(model=model, messages=messages, temperature=0.0)

reasoning_content = response.choices[0].message.reasoning_content
content = response.choices[0].message.content

print("reasoning_content:", reasoning_content)  
print("content:", content)

models = client.models.list()

for model in models.data:
    print(model.id)
