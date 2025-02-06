from flask import Flask, request, jsonify
from config import Config
from models import db, User
import bcrypt

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    try:
        user = User(username=data['username'], password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered'}), 201
    except:
        return jsonify({'error': 'Username already exists'}), 400

@app.route('/users', methods=['GET'])
def get_users():
    # Obtener todos los usuarios
    users = User.query.all()
    # Serializar todos los usuarios
    users_data = [user.serialize() for user in users]
    return jsonify(users_data)

@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'})

@app.route('/user/<int:user_id>/income', methods=['POST'])
def add_income(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    user.incomes.append(data['income'])
    db.session.commit()
    return jsonify({'message': 'Income added'})

@app.route('/user/<int:user_id>/income/<int:income_index>', methods=['DELETE'])
def delete_income(user_id, income_index):
    user = User.query.get(user_id)
    if not user or income_index >= len(user.incomes):
        return jsonify({'error': 'User or income not found'}), 404
    user.incomes.pop(income_index)
    db.session.commit()
    return jsonify({'message': 'Income deleted'})

@app.route('/user/<int:user_id>/expense', methods=['POST'])
def add_expense(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    if 'expenses' not in user.monthly_report:
        user.monthly_report['expenses'] = []
    user.monthly_report['expenses'].append(data['expense'])
    db.session.commit()
    return jsonify({'message': 'Expense added'})

@app.route('/user/<int:user_id>/expense/<int:expense_index>', methods=['DELETE'])
def delete_expense(user_id, expense_index):
    user = User.query.get(user_id)
    if not user or 'expenses' not in user.monthly_report or expense_index >= len(user.monthly_report['expenses']):
        return jsonify({'error': 'User or expense not found'}), 404
    user.monthly_report['expenses'].pop(expense_index)
    db.session.commit()
    return jsonify({'message': 'Expense deleted'})

@app.route('/user/<int:user_id>/goal', methods=['POST'])
def add_goal(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    user.finantial_goals.append(data['goal'])
    db.session.commit()
    return jsonify({'message': 'Goal added'})

@app.route('/user/<int:user_id>/goal/<int:goal_index>', methods=['DELETE'])
def delete_goal(user_id, goal_index):
    user = User.query.get(user_id)
    if not user or goal_index >= len(user.finantial_goals):
        return jsonify({'error': 'User or goal not found'}), 404
    user.finantial_goals.pop(goal_index)
    db.session.commit()
    return jsonify({'message': 'Goal deleted'})

if __name__ == '__main__':
    app.run(debug=True)