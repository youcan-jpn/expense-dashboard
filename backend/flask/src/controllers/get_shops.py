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


def get_shops():
    with Session(engine) as session:
        shop_list = []
        stmt = (select(tables.ShopList).order_by(tables.ShopList.shop_id))
        rows = session.execute(stmt).all()
        for row in rows:
            shop = models.Shop(
                shop_name=row.ShopList.shop_name,
                shop_id=row.ShopList.shop_id,
                modified_at=row.ShopList.modified_at,
                created_at=row.ShopList.created_at
            )
            shop_list.append(shop)
        shops = models.Shops(shops=shop_list)
    return shops.to_list()
