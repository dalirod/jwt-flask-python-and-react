"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os

api = Blueprint('api', __name__)

@api.route('/user', methods = ['POST'])
def add_user():
    if request.method == 'POST':
        body=request.json
        email=body.get('email',None)
        password=body.get('password',None)
        if email is None or password is None:
            return jsonify({'message':"Faltan datos"}),400
        else:
            try:
                user=User(email=email, password=password)  
                db.session.add(user)  
                db.session.commit()
                return jsonify({'message':"Usuario creado"}),201
            except Exception as error:
                return jsonify(error.args[0])    


@api.route('/login', methods = ["POST"])
def add_login():
    if request.method == 'POST':
        body=request.json
        email=body.get('email',None)
        password=body.get('password',None)
        if email is None or password is None:
            return jsonify({'message': "Datos incorrectos"},400)
        else:
            login=User.query.filter_by(email=email, password=password).first()
            if login is None:
                 return jsonify({'message': "Datos incorrectos"}),400
            else:
                token=create_access_token(identity=login.id)
                return jsonify({'token':token})
                    

