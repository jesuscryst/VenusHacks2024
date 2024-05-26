import sqlite3

#connect to a sqlite db
conn = sqlite3.connect('profiles.db')

#create a cursor object

cursor = conn.cursor()

# create a table 

cursor.execute('''CREATE TABLE IF NOT EXISTS profiles(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT,
               bio TEXT,
               contact_number TEXT,
               profile_picture TEXT

)''')

conn.commit()
conn.close()