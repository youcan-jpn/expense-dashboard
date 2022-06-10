import os

from dotenv import load_dotenv
from sqlalchemy import (Table, MetaData, create_engine)
from sqlalchemy.orm import declarative_base

# constants
load_dotenv("/src/.env")
dialect = os.getenv("DB_DIALECT")
driver = os.getenv("DB_DRIVER")
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
host = os.getenv("API_HOST", "localhost")
port = os.getenv("API_PORT", 5432)
db = os.getenv("DB_NAME")

DATABASE_URI = f"{dialect}+{driver}://{username}:{password}@{host}:{port}/{db}"  # noqa: E501

engine = create_engine(DATABASE_URI, encoding="utf-8", echo=True)
Base = declarative_base()
metadata_obj = MetaData()

shops_table = Table("shop_list",
                    metadata_obj,
                    autoload_with=engine)


class ShopList(Base):
    __table__ = shops_table
