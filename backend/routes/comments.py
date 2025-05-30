from flask import Blueprint, jsonify, request
from db import mysql

comments = Blueprint('comments', __name__)

@comments.route('/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT user, text FROM comments WHERE post_id = %s", (post_id,))
    rows = cur.fetchall()
    cur.close()
    return jsonify([{'user': r[0], 'text': r[1]} for r in rows])

@comments.route('/posts/<int:post_id>/comment', methods=['POST'])
def add_comment(post_id):
    try:
        data = request.get_json()
        print(f"Received data: {data}")  # Log incoming data for debugging

        user = data.get('user')
        text = data.get('text')

        if not user or not text:
            print("Validation error: Missing user or text")  # Log validation errors
            return jsonify({'error': 'User and text are required'}), 400

        cur = mysql.connection.cursor()
        try:
            query = "INSERT INTO comments (post_id, user, text) VALUES (%s, %s, %s)"
            print(f"Executing query: {query} with values ({post_id}, {user}, {text})")
            cur.execute(query, (post_id, user, text))
            mysql.connection.commit()
        except Exception as db_error:
            print(f"Database error: {db_error}")  # Log database-specific errors
            return jsonify({'error': f'Database error: {db_error}'}), 500  # Return detailed error for debugging
        finally:
            cur.close()

        return jsonify({'message': 'Comment added'})
    except Exception as e:
        print(f"Error adding comment: {e}")  # Log unexpected errors
        return jsonify({'error': f'Internal server error: {e}'}), 500  # Return detailed error for debugging
