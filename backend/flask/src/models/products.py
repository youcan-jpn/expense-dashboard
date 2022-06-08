from dataclasses import dataclass
from typing import List

from .product import Product


@dataclass
class Products:
    products: List[Product]
