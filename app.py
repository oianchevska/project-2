from flask import Flask, render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import func
import os
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)


db_url=os.environ["DATABASE_URL"]="postgres://lxnczqxnnsixtt:25c4af3fdf10105af3ccf6dcdb156d9b05dfa289a8ac251d505c35ca56355b96@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d21o41cjku2a3l"
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
            'breeds',
            'colors',
            'age',
            'gender',
            'size',
            'coat',
            'status',
            'status_changed_at',
            'state',
            'city',
            'postcode',
            'total',
            'type'
        )
        ordered=True


@app.route("/")
def index():
    return render_template("index.html", name="Hey,Girls!")


@app.route("/pets")
def data_pets():
    pets=Pet.query.limit(2000)
    pet_schema=PetSchema(many=True)
    output=pet_schema.dump(pets)
    return jsonify({"pets":output})


@app.route("/usdata")
def cat_dogs():
    usdata = db.session.query(Pet.state,Pet.type,func.count(Pet.id).label('total')).group_by(Pet.state,Pet.type).all()
    pet_schema = PetSchema(many=True)
    output = pet_schema.dump(usdata)
    return jsonify({"usdata": output})

@app.route("/breeds")
def breeds():
    breeds = db.session.query(Pet.type, Pet.breeds, func.count(Pet.id).label('total')).group_by(Pet.type,                                                                                           Pet.breeds).limit(2000)
    pet_schema = PetSchema(many=True)
    output = pet_schema.dump(breeds)
    return jsonify({"breeds": output})


@app.route("/table")
def table():
    table = db.session.query(Pet.type, Pet.breeds,Pet.age,Pet.gender,Pet.state,Pet.city).limit(2000)
    pet_schema = PetSchema(many=True)
    output = pet_schema.dump(table)
    return jsonify({"table": output})


if __name__ == "__main__":
    app.run(debug=True)


