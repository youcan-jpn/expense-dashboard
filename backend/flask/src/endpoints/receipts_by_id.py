from flask_restful import Resource

import controllers


class ReceiptsById(Resource):
    def delete(self, receipt_id):
        ret = controllers.delete_receipts_by_id(receipt_id=receipt_id)
        if ret:
            return "The resource was deleted successefully.", 200
        return ""
