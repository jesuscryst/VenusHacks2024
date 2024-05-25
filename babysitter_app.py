from flask import Flask, render_template,request
import sqlite3

app = Flask(__name__)

@app.route('/')
def site():
    return render_template('babysitter_new.html')

@app.route('/create-profile', methods = ['POST'])
def create_profile():
    if request.method == 'POST':
        name = request.form['name']
        bio = request.form['bio']
        contact_number = request.form['contact_number']
        profile_picture = request.files['profile_picture']

        # Save profile data to a sqlite database

        save_profile_to_database(name,bio,contact_number,profile_picture)

        return 'Profile created successfully!'

def save_profile_to_database(name, bio, contact_number, profile_picture):

    conn = sqlite3.connect('profiles.db')
    cursor = conn.cursor()
    # Convert profile picture data to bytes
    profile_picture_data = profile_picture.read()
    
    # Insert profile data into the database
    cursor.execute('INSERT INTO profiles (name, bio, contact_number, profile_picture) VALUES (?, ?, ?, ?)',
                   (name, bio, contact_number, profile_picture_data))
    
    conn.commit()
    conn.close()


if __name__ == '__main__':
    app.run(debug=True)