import json
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from flask_restful import Api
from flask import Flask, make_response

import endpoints as ep


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

    api.add_resource(ep.Shops, f"{route_prefix}/shops")
    api.add_resource(ep.ShopsById, f"{route_prefix}/shops/<int:shop_id>")
    return app


app = create_app()

if __name__ == "__main__":
    app.run()