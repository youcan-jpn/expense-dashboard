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


def get_receipts():
    with Session(engine) as session:
        receipt_list = []
        stmt = (select(tables.ReceiptList, tables.ShopList)
                .where(tables.ReceiptList.is_deleted == False)
                .order_by(tables.ReceiptList.receipt_id)
                .join(tables.ShopList, tables.ReceiptList.shop_id == tables.ShopList.shop_id))
        rows = session.execute(stmt).all()
        for row in rows:
            receipt = models.Receipt(
                receipt_id=row.ReceiptList.receipt_id,
                shop_id=row.ReceiptList.shop_id,
                shop_name=row.ShopList.shop_name,
                purchase_date=row.ReceiptList.purchase_date,
                discount_price=row.ReceiptList.discount,
                total_price_including_tax=row.ReceiptList.total_price_with_tax,
                modified_at=row.ReceiptList.modified_at,
                created_at=row.ReceiptList.created_at
            )
            receipt_list.append(receipt)
        receipts = models.Receipts(receipts=receipt_list)
    return receipts.to_list()
