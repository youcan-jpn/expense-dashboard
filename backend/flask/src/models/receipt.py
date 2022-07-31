from dataclasses import dataclass, field
from .products import Products
from datetime import datetime


@dataclass
class Receipt:
    receipt_id: int = -1
    shop_id: int = -1
    shop_name: str = "unknown"
    purchase_date: datetime = datetime.now()
    discount_price: int = -1
    created_at: datetime = datetime.now()
    modified_at: datetime = datetime.now()
    product_list: Products = field(default_factory=list)
    total_price_including_tax: int = -1

    def to_detailed_dict(self) -> dict:
        ret = {
            "receipt_id": self.receipt_id,
            "shop_id": self.shop_id,
            "shop_name": self.shop_name,
            "purchase_date": self.purchase_date,
            "discount_price": self.discount_price,
            "total_price_including_tax": self.total_price_include_tax,
            "modified_at": self.modified_at,
            "created_at": self.created_at,
            "product_list": self.product_list.to_list()
        }
        return ret

    def to_simple_dict(self) -> dict:
        ret = {
            "receipt_id": self.receipt_id,
            "shop_id": self.shop_id,
            "shop_name": self.shop_name,
            "purchase_date": self.purchase_date.strftime("%Y-%m-%d %H:%M:%S"),
            "discount_price": self.discount_price,
            "total_price_including_tax": self.total_price_including_tax,
            "modified_at": self.modified_at.strftime("%Y-%m-%d %H:%M:%S"),
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        return ret
