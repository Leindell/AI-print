from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 25 * 1024 * 1024  # 25MB limit
BOT_API_URL = os.environ.get('BOT_API_URL', 'http://localhost:8000/api/bot/orders')
BOT_SECRET = os.environ.get('BOT_SECRET', 'secret')

# Duplicate of services for API consistency (optional, as frontend uses local data)
SERVICES = [
    {"id": "1", "title": "Подарочный бокс", "price": 490},
    {"id": "2", "title": "Подарочный конверт", "price": 290},
    # ... others can be added if needed for validation
]

@app.route('/api/services', methods=['GET'])
def get_services():
    return jsonify(SERVICES)

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.form.to_dict()
        files = request.files.getlist('files')
        
        saved_files = []
        files_to_send = []

        for file in files:
            if file and file.filename:
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                saved_files.append(filepath)
                
                # Re-open for sending to bot
                files_to_send.append(('files', (filename, open(filepath, 'rb'), file.content_type)))

        # Forward to Bot
        payload = {
            'service_name': data.get('service_name'),
            'service_price': data.get('service_price'),
            'customer_name': data.get('customer_name'),
            'phone': data.get('phone'),
            'telegram_username': data.get('telegram_username'),
            'quantity': data.get('quantity'),
            'comment': data.get('comment'),
        }
        
        headers = {'X-BOT-SECRET': BOT_SECRET}
        
        # Send to bot service
        response = requests.post(BOT_API_URL, data=payload, files=files_to_send, headers=headers)
        
        # Close files
        for _, (name, f, _) in files_to_send:
            f.close()

        if response.status_code != 200:
            return jsonify({'error': 'Failed to send to bot'}), 500

        return jsonify({'status': 'success', 'message': 'Order received'}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
