from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    incomes = db.Column(db.JSON, default=list)
    finantial_goals = db.Column(db.JSON, default=list)
    achieved_goals = db.Column(db.JSON, default=list)
    monthly_report = db.Column(db.JSON, default=dict)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'incomes': self.incomes,
            'finantial_goals': self.finantial_goals,
            'achieved_goals': self.achieved_goals,
            'monthly_report': self.monthly_report
        }
