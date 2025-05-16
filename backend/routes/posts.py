from flask import Blueprint, jsonify, request
from db import mysql

posts = Blueprint('posts', __name__)

@posts.route('/posts', methods=['GET'])
def get_all_posts():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, author, content, image, likes FROM posts ORDER BY id DESC")
    rows = cur.fetchall()
    cur.close()

    posts = []
    for row in rows:
        posts.append({
            'id': row[0],
            'author': row[1],
            'content': row[2],
            'image': row[3],
            'likes': row[4],
        })
    
    return jsonify(posts)
