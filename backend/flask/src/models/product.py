from dataclasses import dataclass


@dataclass
class Product:
    product_id: int
    product_name: str
    price_wo_tax: int
    tax_id: int
    tax_rate: int

    def to_dict(self) -> dict:
        ret = {
            "product_id": self.product_id,
            "product_name": self.product_name,
            "price_wo_tax": self.price_wo_tax,
            "tax_id": self.tax_id,
            "tax_rate": self.tax_rate
        }
        return ret
