from flask import request
from flask_restful import Resource

import controllers


class Taxes(Resource):
    def get(self):
        ret = controllers.get_taxes()
        return ret

    def post(self):
        ret = controllers.post_taxes(tax_rate=int(request.json["tax_rate"]))  # TODO: エラー処理
        return ret
