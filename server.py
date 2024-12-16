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
    'password': '', 
    'host': 'localhost', 
    'database': 'fasanicebox-stud',
    'port': '3306'
}

# allow cross-origin requests
@app.after_request

def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173') #localhost 5173 is the React front-end
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,DELETE')
    return response

# User registration route (signup)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email, password)

    if not email or not password:
        print("email and password are required")
        return jsonify({"error": "email and password are required"}), 400
    
    # Check if the user already exists
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TLS_COK_DLA_users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"error": "email already exists"}), 400
    
    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # Insert the new user into the database
    cursor.execute("INSERT INTO TLS_COK_DLA_users (email, password) VALUES (%s, %s)", (email, hashed_password))
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "User created successfully"}), 201

# route to get all campuses
@app.route('/get-campuses', methods=['GET'])
def get_campuses():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TLS_COK_DLA_campuses")
    campuses = cursor.fetchall()
    cursor.close()
    conn.close()

    result = []
    for campus in campuses:
        result.append({
            'id': campus[0],
            'name': campus[1],
        })

    return jsonify(result), 200

# User deletion route (delete account)
@app.route('/delete-user', methods=['DELETE'])
@jwt_required()  # Ensure the user is authenticated with a valid JWT token
def delete_user():
    current_user = get_jwt_identity()
    
    # Delete the user from the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM TLS_COK_DLA_users WHERE id = %s", (current_user['id'],))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "User deleted successfully"}), 200

# Login route (authentication)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400
    
    # Check user credentials
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TLS_COK_DLA_users WHERE email = %s", (email,))
    user = cursor.fetchone()
    
    if user and bcrypt.check_password_hash(user[2], password):  # user[2] is the password hash
        # Generate JWT token on successful login
        access_token = create_access_token(identity={'id': user[0], 'email': user[1]})
        return jsonify({"access_token": access_token}), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

# Route to submit a vote
@app.route('/submit-vote', methods=['POST'])
@jwt_required()  # Ensure the user is authenticated
def submit_vote():
    current_user = get_jwt_identity()
    data = request.get_json()
    campus = data.get('campus')
    criterion = data.get('criterion')

    # votes has field user_id, campus_id, criterion_id, from tabels TLS_COK_DLA_users, TLS_COK_DLA_campuses, TLS_COK_DLA_criteria

    if not campus or not criterion:
        return jsonify({"error": "campus and criterion are required"}), 400
    
    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Retrieve the user's TLS_COK_DLA_votes from the database
    cursor.execute("SELECT * FROM TLS_COK_DLA_votes WHERE user_id = %s", (current_user['id'],))
    votes = cursor.fetchall()

    # Check if the user has already voted for the campus
    for vote in votes:
        if vote[2] == campus:
            return jsonify({"error": "You have already voted for this campus"}), 400
        
    # Insert the vote into the database

    cursor.execute("INSERT INTO TLS_COK_DLA_votes (user_id, campus_id, criterion_id) VALUES (%s, %s, %s)", (current_user['id'], campus, criterion))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Vote submitted successfully"}), 201

# Route to get the user's scores (TLS_COK_DLA_votes)
@app.route('/get-scores', methods=['GET'])
@jwt_required()  # Ensure the user is authenticated
def get_scores():
    current_user = get_jwt_identity()
    
    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    # Retrieve the user's TLS_COK_DLA_votes from the database
    cursor.execute("SELECT * FROM TLS_COK_DLA_votes WHERE user_id = %s", (current_user['id'],))
    votes = cursor.fetchall()
    
    cursor.close()
    conn.close()

    # Format the results
    result = []
    for vote in votes:
        result.append({
            'campus': vote[2],
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
