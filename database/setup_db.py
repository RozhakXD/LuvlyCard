import sqlite3

conn = sqlite3.connect('database/quotes.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        category TEXT DEFAULT 'lainnya'
    )
''')

quotes_data = [
    ("I am a slow walker, but I never walk back.", "motivasi"),
    ("The only thing we have to fear is fear itself.", "motivasi"),
    ("You miss 100% of the shots you don't take.", "motivasi"),
    ("It always seems impossible until it's done.", "motivasi"),
]

cursor.executemany("INSERT INTO quotes (text, category) VALUES (?, ?)", quotes_data)

conn.commit()
conn.close()

print("Database setup completed!")