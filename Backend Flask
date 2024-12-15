from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
import os

# Initialize Flask, Bcrypt for password hashing, and JWT for authentication
app = Flask(__name__)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Flask JWT secret key configuration
app.config["JWT_SECRET_KEY"] = "supersecretkey"  # Don't hardcode this in production

# MySQL database connection configuration
db_config = {
    'user': 'root', 
    'password': 'password', 
    'host': 'localhost', 
    'database': 'votes'
}

# User registration route (signup)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Check if the user already exists
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"error": "Username already exists"}), 400
    
    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # Insert the new user into the database
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "User created successfully"}), 201

# User deletion route (delete account)
@app.route('/delete-user', methods=['DELETE'])
@jwt_required()  # Ensure the user is authenticated with a valid JWT token
def delete_user():
    current_user = get_jwt_identity()
    
    # Delete the user from the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id = %s", (current_user['id'],))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "User deleted successfully"}), 200

# Login route (authentication)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Check user credentials
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    
    if user and bcrypt.check_password_hash(user[2], password):  # user[2] is the password hash
        # Generate JWT token on successful login
        access_token = create_access_token(identity={'id': user[0], 'username': user[1]})
        return jsonify({"access_token": access_token}), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

# Route to submit a vote
@app.route('/submit-vote', methods=['POST'])
@jwt_required()  # Ensure the user is authenticated
def submit_vote():
    current_user = get_jwt_identity()
    data = request.get_json()
    location = data.get('location')
    criteria = data.get('criteria')

    if not location or len(criteria) != 5:
        return jsonify({'error': 'Invalid data'}), 400
    
    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    # Insert the vote into the database
    cursor.execute("""
        INSERT INTO votes (user_id, location, criteria1, criteria2, criteria3, criteria4, criteria5) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (current_user['id'], location, *criteria))
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'Vote submitted successfully!'}), 200

# Route to get the user's scores (votes)
@app.route('/get-scores', methods=['GET'])
@jwt_required()  # Ensure the user is authenticated
def get_scores():
    current_user = get_jwt_identity()
    
    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    # Retrieve the user's votes from the database
    cursor.execute("SELECT * FROM votes WHERE user_id = %s", (current_user['id'],))
    votes = cursor.fetchall()
    
    cursor.close()
    conn.close()

    # Format the results
    result = []
    for vote in votes:
        result.append({
            'location': vote[2],
            'criteria1': vote[3],
            'criteria2': vote[4],
            'criteria3': vote[5],
            'criteria4': vote[6],
            'criteria5': vote[7],
            'created_at': vote[8]
        })

    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True)
