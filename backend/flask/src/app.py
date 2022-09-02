import json
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from flask_restful import Api
from flask_cors import CORS
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
    app.config['CORS_HEADERS'] = 'Content-Type'

    api = Api(app)
    route_prefix: str = "/api"

    @api.representation('application/json')
    def output_json(data, code, headers):
        """flask_restfulの戻り値のJSONの文字コードをUTF-8にするミドルウェア"""
        resp = make_response(json.dumps(data, ensure_ascii=False, indent=2),
                             code)
        resp.headers.extend(headers)
        return resp

    api.add_resource(ep.Receipts, f"{route_prefix}/receipts")
    api.add_resource(ep.ReceiptsById, f"{route_prefix}/receipts/<int:receipt_id>")
    api.add_resource(ep.Shops, f"{route_prefix}/shops")
    api.add_resource(ep.ShopsById, f"{route_prefix}/shops/<int:shop_id>")
    api.add_resource(ep.Taxes, f"{route_prefix}/taxes")
    api.add_resource(ep.TaxesById, f"{route_prefix}/taxes/<int:tax_id>")
    return app


app = create_app()
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

if __name__ == "__main__":
    app.run()
