from flask import request
from flask_restful import Resource

import controllers


class ShopsById(Resource):
    def patch(self, shop_id):
        ret = controllers.patch_shops_by_id(
            shop_id=shop_id,
            new_shop_name=request.json["shop_name"])
        return ret
