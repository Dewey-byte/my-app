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
    data = request.get_json()
    user = data['user']
    text = data['text']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO comments (post_id, user, text) VALUES (%s, %s, %s)", (post_id, user, text))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Comment added'})
