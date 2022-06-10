from dataclasses import dataclass, field
from typing import List
from .product import Product
from .tax import Tax


@dataclass
class Receipt:
    shop_id: int = -1
    discount_price: int = -1
    product_list: List[Product] = field(default_factory=list)
    tax_type_list: List[Tax] = field(default_factory=list)
    receipt_id: int = -1
    total_price_include_tax: int = -1

    def post(self):
        raise NotImplementedError

    def get(self):
        raise NotImplementedError

    def delete(self):
        raise NotImplementedError

    def patch(self):
        if self.receipt_id != -1:
            pass
        pass
        raise NotImplementedError

    def _validate_properties(self) -> bool:
        raise NotImplementedError

    def _calculate_total_price(self) -> int:
        raise NotImplementedError
