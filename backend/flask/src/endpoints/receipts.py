from flask import request
from flask_restful import Resource

import controllers


class Receipts(Resource):
    def get(self):
        ret = controllers.get_receipts()
        return ret

    def post(self):
        raise NotImplementedError
