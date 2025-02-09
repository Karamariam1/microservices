from flask import Flask, request, jsonify

app = Flask(__name__)

# Liste fictive des paiements
payments = []

@app.route('/pay', methods=['POST'])
def process_payment():
    data = request.get_json()
    
    if "order_id" not in data or "amount" not in data:
        return jsonify({"error": "Invalid payment data"}), 400
    
    # Simulation : Si le montant est inférieur à 10€, paiement échoué
    if data["amount"] < 10:
        return jsonify({"status": "failed", "message": "Payment declined"}), 400

    payment = {
        "payment_id": len(payments) + 1,
        "order_id": data["order_id"],
        "amount": data["amount"],
        "status": "success"
    }
    payments.append(payment)
    return jsonify(payment), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
