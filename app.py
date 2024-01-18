import os
import openai
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
openai.api_key = "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"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lessons')
def lessons():
    return render_template('lesson.html')

@app.route('/interact_with_llm', methods=['POST'])
def interact_with_llm():
    data = request.json
    user_input = data.get('user_input')
    print("Received input:", user_input)  # Debug print
    try:
        response = openai.Completion.create(
          engine="gpt-3.5-turbo-instruct",
          prompt=user_input,
          max_tokens=150
        )
        print("Response from OpenAI:", response.choices[0].text.strip())  # Debug print
        return jsonify({'response': response.choices[0].text.strip()})
    except Exception as e:
        print("Error:", e)  # Debug print
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)