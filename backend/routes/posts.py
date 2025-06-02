from flask import Blueprint, jsonify, request
from db import mysql

posts = Blueprint('posts', __name__)

@posts.route('/posts', methods=['GET'])
def get_all_posts():
    posts = [
        {
            "id": 1,
            "author": "John Doe",
            "content": "This is a sample post.",
            "image":"http://192.168.254.103:5000/uploads/cool.jpg",
            "likes": 10
        },
        {
            "id": 2,
            "author": "Jane Smith",
            "content": "Another post with an image.",
            "image": "http://192.168.254.103:5000/uploads/cool.jpg",
            "likes": 5
        }
    ]
    return jsonify(posts)
