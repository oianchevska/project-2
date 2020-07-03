from flask import Flask, render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import func
import os

app = Flask(__name__)

db_url=os.environ["DATABASE_URL"]
# Add url path to DB in db_url ( the url you can find on HEROKU)
app.config["SQLALCHEMY_DATABASE_URI"]=db_url

db=SQLAlchemy(app)
ma = Marshmallow(app)

class Pet(db.Model):
    __tablename__ = 'all_animals'
    id=db.Column(db.Integer, primary_key=True)
    organization_id=db.Column(db.String)
    type=db.Column(db.String)
    breeds=db.Column(db.String)
    colors=db.Column(db.String)
    age=db.Column(db.String)
    gender=db.Column(db.String)
    size=db.Column(db.String)
    coat=db.Column(db.String)
    status=db.Column(db.String)
    status_changed_at=db.Column(db.String)
    city=db.Column(db.String)
    state=db.Column(db.String)
    postcode=db.Column(db.String)

class PetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = (
            'id',
            'organization_id',
            'type',
            'breeds',
            'colors',
            'age',
            'gender',
            'size',
            'coat',
            'status',
            'status_changed_at',
            'city',
            'state',
            'postcode',
            'total',
            'type'
        )

@app.route("/")
def index():
    return render_template("index.html", name="Hey,Girls!")


@app.route("/pets")
def data_pets():
    pets=Pet.query.all()
    pet_schema=PetSchema(many=True)
    output=pet_schema.dump(pets)
    return jsonify({"pets":output})


@app.route("/usdata")
def cat_dogs():
    usdata = db.session.query(Pet.state,Pet.type,func.count(Pet.id).label('total')).group_by(Pet.state,Pet.type).all()
    pet_schema = PetSchema(many=True)
    output = pet_schema.dump(usdata)
    return jsonify({"usdata": output})


if __name__ == "__main__":
    app.run(debug=True)


