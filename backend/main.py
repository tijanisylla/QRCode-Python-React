import qrcode # pip install qrcode
from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin 
from io import BytesIO
from base64 import b64encode



app = Flask(__name__)
CORS(app,  resources={r"/qrcode": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/qrcode', methods=['POST']) # Route : http://localhost:1000/qrcode
@cross_origin(origin='*', headers=['Content-Type','Authorization'])

def generateQRCode():
    data = request.get_json(force=True)
    linkQR = data['linkQR']
    memory = BytesIO()
    img = qrcode.make(linkQR)
    img.save(memory)
    memory.seek(0)
    
    base64_img = "data:image/png;base64," + b64encode(memory.read()).decode('ascii')
    
    return jsonify({
        'linkQR': linkQR,
        'img' : base64_img
        })
    
    
if __name__ == '__main__':
    app.run('0.0.0.0',debug=True, port=1000)