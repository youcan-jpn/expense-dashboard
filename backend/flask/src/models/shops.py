from dataclasses import dataclass, field
from typing import List

from .shop import Shop


@dataclass
class Shops:
    shops: List[Shop] = field(default_factory=list)

    def get(self):
        raise NotImplementedError

    def to_list(self):
        ret = []
        for shop in self.shops:
            obj = {
                "shop_id": shop.shop_id,
                "shop_name": shop.shop_name,
                "modified_at": shop.modified_at,
                "created_at": shop.created_at
            }
            ret.append(obj)
        return ret
