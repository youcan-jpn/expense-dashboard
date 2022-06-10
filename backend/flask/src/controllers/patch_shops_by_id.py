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
engine = create_engine(DATABASE_URI)


def patch_shops_by_id(shop_id, new_shop_name):
    with Session(engine) as session:
        target_shop = session.query(tables.ShopList).\
                        filter_by(shop_id=shop_id).first()
        target_shop.shop_name = new_shop_name
        session.commit()
        target_shop = models.Shop(
            shop_name=target_shop.shop_name,
            shop_id=target_shop.shop_id,
            modified_at=target_shop.modified_at,
            created_at=target_shop.created_at
        )
        return target_shop.to_dict()
