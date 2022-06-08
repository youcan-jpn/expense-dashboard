import json
import os

from dotenv import load_dotenv
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, update, delete
from flask_restful import Api, Resource
from flask import Flask, make_response, request


# constants
load_dotenv()
dialect = os.getenv("DB_DIALECT")
driver = os.getenv("DB_DRIVER")
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
host = os.getenv("API_HOST", "localhost")
port = os.getenv("API_PORT", 5432)
db = os.getenv("DB_NAME")

DATABASE_URI = f"{dialect}+{driver}://{username}:{password}@{host}:{port}/{db}"  # noqa: E501
engine = create_engine(DATABASE_URI, encoding="utf-8", echo=True)


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["JSON_AS_ASCII"] = False

    api = Api(app)
    route_prefix: str = "/api"

    @api.representation('application/json')
    def output_json(data, code, headers):
        """flask_restfulの戻り値のJSONの文字コードをUTF-8にするミドルウェア"""
        resp = make_response(json.dumps(data, ensure_ascii=False, indent=2),
                             code)
        resp.headers.extend(headers)
        return resp

    @app.route("/")
    def index():
        return "Hello"

    return app


app = create_app()

if __name__ == "__main__":
    app.run()
