from flask import Flask, request, jsonify

app = Flask(__name__)

# Liste fictive des commandes
orders = []

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if "product_id" in data and "quantity" in data:
        order = {
            "id": len(orders) + 1,
            "product_id": data["product_id"],
            "quantity": data["quantity"]
        }
        orders.append(order)
        return jsonify(order), 201
    return jsonify({"error": "Invalid order data"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
