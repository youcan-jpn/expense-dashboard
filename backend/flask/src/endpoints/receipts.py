from datetime import datetime, date

from flask import request
from flask_restful import Resource

import controllers
import models


class Receipts(Resource):
    def get(self):
        ret = controllers.get_receipts()
        return {"receipts": ret}

    def post(self):
        shop_id = int(request.json["shop_id"])
        purchase_datetime = datetime.strptime(request.json["purchase_date"], '%Y-%m-%d')
        purchase_date = date(
            year=purchase_datetime.year,
            month=purchase_datetime.month,
            day=purchase_datetime.day)
        discount_price = int(request.json["discount_price"])
        total_price_includes_tax = int(request.json["total_price_includes_tax"])
        products = request.json["product_list"]
        product_list = []
        for product in products:
            product_list.append(models.Product(
                product_id=product["product_id"],
                product_name=product["product_name"],
                price_wo_tax=product["price_wo_tax"],
                tax_id=product["tax_id"]
            ))
        product_list = models.Products(products=product_list)
        ret = controllers.post_receipts(
            shop_id=shop_id,
            purchase_date=purchase_date,
            discount_price=discount_price,
            total_price_includes_tax=total_price_includes_tax,
            product_list=product_list,
        )
        return ret
