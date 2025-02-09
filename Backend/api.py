from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Configuración
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de datos (User)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    incomes = db.Column(db.JSON, default=lambda: [])
    finantial_goals = db.Column(db.JSON, default=lambda: [])
    achieved_goals = db.Column(db.JSON, default=lambda: [])
    monthly_report = db.Column(db.JSON, default=lambda: {})

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'incomes': self.incomes,
            'finantial_goals': self.finantial_goals,
            'achieved_goals': self.achieved_goals,
            'monthly_report': self.monthly_report
        }

# Ruta para registrar un nuevo usuario
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    password = data['password']
    user = User(username=data['username'], password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered'}), 201

# Ruta para obtener todos los usuarios
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_data = [user.serialize() for user in users]
    return jsonify(users_data)

# Ruta para eliminar un usuario
@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'})

# Ruta para agregar un ingreso a un usuario
@app.route('/user/<int:user_id>/income', methods=['POST'])
def add_income(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    user.incomes = user.incomes + [data['income']]
    db.session.commit()
    return jsonify({'message': 'Income added'})

# Ruta para eliminar un ingreso de un usuario
@app.route('/user/<int:user_id>/income/<int:income_index>', methods=['DELETE'])
def delete_income(user_id, income_index):
    user = User.query.get(user_id)
    if not user or income_index >= len(user.incomes):
        return jsonify({'error': 'User or income not found'}), 404
    user.incomes.pop(income_index)
    db.session.commit()
    return jsonify({'message': 'Income deleted'})

# Ruta para agregar un gasto a un usuario
@app.route('/user/<int:user_id>/expense', methods=['POST'])
def add_expense(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    if 'expenses' not in user.monthly_report:
        user.monthly_report['expenses'] = []
    user.monthly_report['expenses'] = user.monthly_report['expenses'] + [data['expense']]
    db.session.commit()
    return jsonify({'message': 'Expense added'})

# Ruta para eliminar un gasto de un usuario
@app.route('/user/<int:user_id>/expense/<int:expense_index>', methods=['DELETE'])
def delete_expense(user_id, expense_index):
    user = User.query.get(user_id)
    if not user or 'expenses' not in user.monthly_report or expense_index >= len(user.monthly_report['expenses']):
        return jsonify({'error': 'User or expense not found'}), 404
    user.monthly_report['expenses'].pop(expense_index)
    db.session.commit()
    return jsonify({'message': 'Expense deleted'})

# Ruta para agregar una meta financiera a un usuario
@app.route('/user/<int:user_id>/goal', methods=['POST'])
def add_goal(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    user.finantial_goals = user.finantial_goals + [data['goal']]
    db.session.commit()
    return jsonify({'message': 'Goal added'})

# Ruta para eliminar una meta financiera de un usuario
@app.route('/user/<int:user_id>/goal/<int:goal_index>', methods=['DELETE'])
def delete_goal(user_id, goal_index):
    user = User.query.get(user_id)
    if not user or goal_index >= len(user.finantial_goals):
        return jsonify({'error': 'User or goal not found'}), 404
    user.finantial_goals.pop(goal_index)
    db.session.commit()
    return jsonify({'message': 'Goal deleted'})

if __name__ == '__main__':
    with app.app_context():  # Establece el contexto de la aplicación
        db.create_all()  # Crea las tablas en la base de datos si no existen
    app.run(debug=True)
