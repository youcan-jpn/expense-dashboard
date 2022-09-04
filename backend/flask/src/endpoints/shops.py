from flask import request
from flask_restful import Resource

import controllers


class Shops(Resource):
    def get(self):
        ret = controllers.get_shops()
        return {"shops": ret}

    def post(self):
        ret = controllers.post_shops(request.json["shop_name"])
        return ret
