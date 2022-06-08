from dataclasses import dataclass


@dataclass
class Product:
    product_id: int
    product_name: str
    price_wo_tax: int
    tax_id: int
