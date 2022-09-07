from dotenv import load_dotenv
import os

from sqlalchemy.orm import Session
from sqlalchemy import create_engine, select

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


def get_receipt_by_id(receipt_id: int):
    with Session(engine) as session:
        stmt1 = (select(tables.ReceiptList, tables.ShopList)
                 .where(tables.ReceiptList.is_deleted == False)
                 .where(tables.ReceiptList.receipt_id == receipt_id)
                 .order_by(tables.ReceiptList.receipt_id)
                 .join(tables.ShopList, tables.ReceiptList.shop_id == tables.ShopList.shop_id))
        row1 = session.execute(stmt1).one_or_none()
        if row1 is None:
            return {"message": f"Not Found (receipt_id: {receipt_id})"}
        product_list = []
        stmt2 = (select(tables.ReceiptDetail, tables.TaxList)
                 .where(tables.ReceiptDetail.receipt_id == receipt_id)
                 .order_by(tables.ReceiptDetail.product_id)
                 .join(tables.TaxList, tables.ReceiptDetail.tax_id == tables.TaxList.tax_id))
        rows2 = session.execute(stmt2).all()
        for row in rows2:
            product = models.Product(
                product_id=row.ReceiptDetail.product_id,
                product_name=row.ReceiptDetail.product_name,
                price_wo_tax=row.ReceiptDetail.price_wo_tax,
                tax_id=row.ReceiptDetail.tax_id,
                tax_rate=row.TaxList.tax_rate
            )
            product_list.append(product)
        products = models.Products(products=product_list)
        receipt = models.Receipt(
            receipt_id=receipt_id,
            shop_id=row1.ReceiptList.shop_id,
            shop_name=row1.ShopList.shop_name,
            purchase_date=row1.ReceiptList.purchase_date,
            discount_price=row1.ReceiptList.discount,
            total_price_including_tax=row1.ReceiptList.total_price_with_tax,
            modified_at=row1.ReceiptList.modified_at,
            created_at=row1.ReceiptList.created_at,
            product_list=products
        )
    return receipt.to_detailed_dict()
