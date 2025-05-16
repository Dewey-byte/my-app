# Just sample query functions (expand as needed)

def get_all_posts(mysql):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, author, content, image, likes FROM posts ORDER BY created_at DESC")
    posts = cur.fetchall()
    cur.close()
    return posts

def like_post(mysql, post_id):
    cur = mysql.connection.cursor()
    cur.execute("UPDATE posts SET likes = likes + 1 WHERE id = %s", (post_id,))
    mysql.connection.commit()
    cur.close()
