from flask import Flask, request, jsonify
from flask_cors import CORS
import string
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# in-memory storage for password history (resets when server restarts)
password_history = []

# generates a random password based on criteria
def generate_random_password(length, include_uppercase, include_lowercase, include_digits, include_symbols):
    characters = ""
    
    # determines which characters to include
    if include_uppercase:
        characters += string.ascii_uppercase
    if include_lowercase:
        characters += string.ascii_lowercase
    if include_digits:
        characters += string.digits
    if include_symbols:
        characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if not characters:
        return None
    
    password = "".join(random.choice(characters) for _ in range(length))
    return password

# calculate strength score
def calculate_strength(password):
    score = 0

    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if len(password) >= 16:
        score += 1
    
    # checks to see if there is character variety
    if any(c.isupper() for c in password):
        score += 1
    if any(c.islower() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        score += 1
    
    # determine strength
    if score <= 3:
        return "weak"
    elif score <= 5:
        return "medium"
    else:
        return "strong"

@app.route("/api/generate", methods=["POST"])
# generates a new password based on selected settings
def generate_password():
    try:
        data = request.json
        # get parameters from react
        length = int(data.get("length"))
        include_uppercase = data.get("uppercase")
        include_lowercase = data.get("lowercase")
        include_digits = data.get("digits")
        include_symbols = data.get("symbols")
        
        # validate length
        if length < 4 or length > 64:
            return jsonify({"error": "Length must be between 4 and 64"}), 400
        
        # checks to see if at least one character type is selected
        if not any([include_uppercase, include_lowercase, include_digits, include_symbols]):
            return jsonify({"error": "Select at least one character type"}), 400
        
        # generate password
        password = generate_random_password(length, include_uppercase, include_lowercase, include_digits, include_symbols)
        
        if not password:
            return jsonify({"error": "Failed to generate password"}), 500
        
        # calculate strength
        strength = calculate_strength(password)
        
        # add to password history
        history_entry = {
            "password": password,
            "strength": strength,
            "timestamp": datetime.now().isoformat(),
            "length": length
        }
        password_history.insert(0, history_entry)
        
        # keep only last 20 generated passwords
        if len(password_history) > 20:
            password_history.pop()
        
        return jsonify({
            "password": password,
            "strength": strength,
            "length": length
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/history", methods=["GET"])
def get_history():
    # get password generated history
    return jsonify(password_history), 200

@app.route("/api/history", methods=["DELETE"])
def clear_history():
    # clear password history
    global password_history
    password_history = []
    return jsonify({"message": "History cleared"}), 200

@app.route("/api/health", methods=["GET"])
def health_check():
    # health check endpoint
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    print("Password Generator API Server")
    print("Server running on: http://localhost:5000")
    print("API Endpoints:")
    print("POST /api/generate Generate password")
    print("GET /api/history Get password history")
    print("DELETE /api/history Clear history")
    print("GET /api/health Health check")
    app.run(debug=False, port=5000)