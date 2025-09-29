from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/wish', methods=['POST'])
def wish():
    name = request.form.get('name')
    if name:
        return f"<h1>Thank you, {name}! Your birthday wish has been sent! 🎉</h1>"
    else:
        return "<h1>Please enter your name!</h1>"

if __name__ == "main":
    app.run(debug=True, host='0.0.0.0', port=5000)