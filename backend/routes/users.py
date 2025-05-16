from flask import Blueprint, request, jsonify
from db import mysql
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

users = Blueprint('users', __name__, url_prefix='/auth')


@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Login data received:", data)

    username = data['username']
    password = data['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, password FROM users WHERE username = %s", (username,))
    row = cur.fetchone()
    cur.close()

    if not row or row[1] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=row[0])
    return jsonify({'access_token': access_token}), 200

@users.route('/signup', methods=['POST'])
def signup():
    # Get the data from the request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Perform validation (you can expand this based on your needs)
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    
    # Check if the username already exists
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE username = %s", (username,))
    existing_user = cur.fetchone()
    
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400
    
    # Insert new user into the database
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    mysql.connection.commit()

    # Optionally, generate a JWT token for the user (if needed right after sign-up)
    access_token = create_access_token(identity=username)

    # Return a success message
    return jsonify({'message': 'User registered successfully', 'token': access_token}), 201