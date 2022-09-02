from datetime import date
import os

from dotenv import load_dotenv
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import models
import tables

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


def post_receipts(
        shop_id: int,
        purchase_date: date,
        discount_price: int,
        total_price_includes_tax: int,
        product_list: models.Products):
    """post a new receipt"""
    with Session(engine) as session:
        new_receipt_item = tables.ReceiptList(
                                shop_id=shop_id,
                                purchase_date=purchase_date,
                                discount=discount_price,
                                total_price_with_tax=total_price_includes_tax
                            )
        session.add(new_receipt_item)
        session.flush()
        receipt_id = new_receipt_item.receipt_id
        for product_item in product_list.products:
            receipt_detail = tables.ReceiptDetail(
                receipt_id=receipt_id,
                product_id=product_item.product_id,
                product_name=product_item.product_name,
                price_wo_tax=product_item.price_wo_tax,
                tax_id=product_item.tax_id
            )
            session.add(receipt_detail)
        session.commit()
        shop_by_id = session.query(tables.ShopList)\
                            .filter(tables.ShopList.shop_id == shop_id)\
                            .first()
        shop_name = shop_by_id.shop_id
        new_receipt_ret = models.Receipt(
            receipt_id=receipt_id,
            shop_id=shop_id,
            shop_name=shop_name,
            purchase_date=purchase_date,
            discount_price=discount_price,
            total_price_including_tax=total_price_includes_tax,
            modified_at=new_receipt_item.modified_at,
            created_at=new_receipt_item.created_at,
            product_list=product_list
        )
    return new_receipt_ret.to_detailed_dict()
