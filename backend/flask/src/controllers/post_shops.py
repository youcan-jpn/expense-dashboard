from dotenv import load_dotenv
import os

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


def post_shops(shop_name: str):
    """post a new shop"""
    with Session(engine) as session:
        new_shop = tables.ShopList(shop_name=shop_name)
        session.add(new_shop)
        session.commit()
        new_shop = models.Shop(
            shop_name=new_shop.shop_name,
            shop_id=new_shop.shop_id,
            modified_at=new_shop.modified_at,
            created_at=new_shop.created_at)
    return new_shop.to_dict()
