from datetime import datetime

from dataclasses import dataclass


@dataclass
class Shop:
    shop_name: str
    shop_id: int = -1
    modified_at: datetime = datetime.now()
    created_at: datetime = datetime.now()

    def to_dict(self):
        ret = {
            "shop_name": self.shop_name,
            "shop_id": self.shop_id,
            "modified_at": self.modified_at.strftime("%Y-%m-%d %H:%M:%S"),
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        return ret
