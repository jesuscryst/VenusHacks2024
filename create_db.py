import sqlite3

def create_database():
    conn = sqlite3.connect('profiles.db')
    cursor = conn.cursor()

    # Create a table to store profiles
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        bio TEXT NOT NULL,
        contact_number TEXT NOT NULL,
        profile_picture BLOB NOT NULL
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
    print("Database and table created successfully.")