from flask import request
from flask_restful import Resource

import controllers


class TaxesById(Resource):
    def put(self, tax_id: int):
        ret = controllers.put_taxes_by_id(
            tax_id=tax_id,
            new_tax_rate=request.json["tax_rate"])
        return ret
