from flask import Blueprint, jsonify, send_from_directory
import os

posts = Blueprint('posts', __name__)

@posts.route('/posts', methods=['GET'])
def get_all_posts():
    posts = [
        {
            "id": 1,
            "author": "Dewey",
            "content": "Awesome",
            "image": "http://192.168.254.103:5000/uploads/sample.png",
            "likes": 10
        },
        {
            "id": 2,
            "author": "Izumi",
            "content": "Nature",
            "image": "http://192.168.254.103:5000/uploads/cool.jpg",
            "likes": 5
        },
        {
            "id": 3,
            "author": "Jase",
            "content": "GAg",
            "image": "http://192.168.254.103:5000/uploads/cool.jpg",
            "likes": 5
        },
    {
            "id": 4,
            "author": "KM",
            "content": "Horror",
            "image": "http://192.168.254.103:5000/uploads/cool.jpg",
            "likes": 5
        }
    
    ]
    return jsonify(posts)

@posts.route('/uploads/<filename>')
def uploaded_file(filename):
    # Adjust the path to the uploads folder
    uploads_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'uploads'))
    return send_from_directory(uploads_folder, filename)
