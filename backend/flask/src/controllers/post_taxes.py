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


def post_taxes(tax_rate: int):
    with Session(engine) as session:
        new_tax = tables.TaxList(tax_rate=tax_rate)
        session.add(new_tax)
        session.commit()
        new_tax = models.Tax(
            tax_id=new_tax.tax_id,
            tax_rate=new_tax.tax_rate
        )
    return new_tax.to_dict()
