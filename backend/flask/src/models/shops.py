from dataclasses import dataclass
from typing import List

from .shop import Shop


@dataclass
class Shops:
    shops: List[Shop] = []

    def get(self):
        raise NotImplementedError

