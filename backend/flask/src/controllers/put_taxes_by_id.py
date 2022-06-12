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


def put_taxes_by_id(tax_id: int, new_tax_rate: int):
    with Session(engine) as session:
        target_tax = session.query(tables.TaxList).\
                        filter_by(tax_id=tax_id).first()
        target_tax.tax_rate = new_tax_rate
        session.commit()
        target_tax = models.Tax(
            tax_id=target_tax.tax_id,
            tax_rate=target_tax.tax_rate
        )
        return target_tax.to_dict()
