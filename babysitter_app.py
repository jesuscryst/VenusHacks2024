from flask import Flask, render_template,request, redirect, url_for,flash, session
import sqlite3
import json
import base64

app = Flask(__name__,template_folder='template')
app.secret_key = '777'  # Replace with a random secret key

@app.route('/')
def site():
    conn = sqlite3.connect('profiles.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM profiles')
    profiles = cursor.fetchall()
    conn.close()
    return render_template('babysitter_new.html', profiles=profiles)

@app.route('/create-profile', methods = ['POST'])
def create_profile():

    data = request.get_json()
    print(data)
    name = data.get('name')
    bio = data.get('bio')
    contact_number = data.get('contact_number')
    profile_picture: str = data.get('profile_picture')

    if profile_picture != '':
        save_profile_to_database(name, bio, contact_number, profile_picture)
        flash('Profile created successfully!')
        return redirect(url_for('site'))
    else:
        flash('Please upload a profile picture.')
        return redirect(url_for('site'))

def save_profile_to_database(name, bio, contact_number, profile_picture):

    conn = sqlite3.connect('profiles.db')
    cursor = conn.cursor()
    
    # Insert profile data into the database
    cursor.execute('INSERT INTO profiles (name, bio, contact_number, profile_picture) VALUES (?, ?, ?, ?)',
                   (name, bio, contact_number, profile_picture))
    
    conn.commit()
    conn.close()



if __name__ == '__main__':
    app.run(debug=True)


"""


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

"""