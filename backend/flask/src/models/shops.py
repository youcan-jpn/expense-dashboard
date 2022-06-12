from dataclasses import dataclass, field
from typing import List

from .shop import Shop


@dataclass
class Shops:
    shops: List[Shop] = field(default_factory=list)

    def to_list(self):
        ret = []
        for shop in self.shops:
            ret.append(shop.to_dict())
        return ret
