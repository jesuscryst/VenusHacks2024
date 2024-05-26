from flask import Flask, render_template,request
import sqlite3
import json
import base64

app = Flask(__name__,template_folder='template')

@app.route('/')
def site():
    return render_template('babysitter_new.html')

@app.route('/create-profile', methods = ['POST'])
def create_profile():
    request.get_json().name
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

def profile_fetcher(offset,limit):
    conn = sqlite3.connect('profiles.db')
    cursor = conn.cursor()
    cursor.execute('SELECT name, bio, contact_number, profile_picture FROM profiles LIMIT ? OFFSET ?', (limit, offset))
    profiles = cursor.fetchall()
    conn.close()

    # Convert profile picture bytes data to base64 encoded string

    profiles_with_base64 = []
    for profile in profiles:
        name, bio, contact_number, profile_picture_data = profile
        profile_picture_base64 = base64.b64encode(profile_picture_data).decode('utf-8') if profile_picture_data else None
        profiles_with_base64.append({'name': name, 'bio': bio, 'contact_number': contact_number, 'profile_picture': profile_picture_base64})

    return profiles_with_base64

@app.route('/load-profiles')
def load_profiles():
    page = request.args.get('page',1,type=int)
    per_page = 3
    offset = (page-1)*per_page # what exactly is offset here?
    profiles = profile_fetcher(offset, per_page)
    return json.dumps(profiles)


if __name__ == '__main__':
    app.run(debug=True)