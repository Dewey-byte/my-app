# db.py
import pymysql
pymysql.install_as_MySQLdb()      # <-- tells Python to use PyMySQL in place of MySQLdb

from flask_mysqldb import MySQL

mysql = MySQL()

def init_db(app):
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'my_app'
    mysql.init_app(app)
