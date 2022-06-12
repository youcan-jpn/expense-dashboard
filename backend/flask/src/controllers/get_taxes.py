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


def get_taxes():
    with Session(engine) as session:
        tax_list = []
        stmt = (select(tables.TaxList).order_by(tables.TaxList.tax_id))
        rows = session.execute(stmt).all()
        for row in rows:
            tax = models.Tax(
                tax_id=row.TaxList.tax_id,
                tax_rate=row.TaxList.tax_rate
            )
            tax_list.append(tax)
        taxes = models.Taxes(taxes=tax_list)
    return taxes.to_list()
