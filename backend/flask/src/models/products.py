from dataclasses import dataclass
from typing import List

from .product import Product


@dataclass
class Products:
    products: List[Product]

    def to_list(self) -> List[Product]:
        ret = []
        for product in self.products:
            ret.append(product.to_dict())
        return ret
