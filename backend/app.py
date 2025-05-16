from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from db import init_db
from routes.posts    import posts
from routes.comments import comments
from routes.users    import users
import os

app = Flask(__name__)
CORS(app)
init_db(app)

# ─── JWT SETUP ─────────────────────────────────────────────────────────
# Make sure you have set the JWT_SECRET_KEY in your environment,
# or it will fall back to 'dev-secret-key' (only for local dev).
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
jwt = JWTManager(app)
# ─────────────────────────────────────────────────────────────────────

# Register blueprints
app.register_blueprint(posts)
app.register_blueprint(comments)
app.register_blueprint(users)

@app.route('/')
def home():
    return {'status': 'API running'}

if __name__ == '__main__':
    # Bind to 0.0.0.0 so other devices/emulators can reach you
    app.run(host='0.0.0.0', port=5000, debug=True)
