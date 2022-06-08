from dataclasses import dataclass


@dataclass
class Shop:
    shop_name: str
    shop_id: int = -1

    def post(self):
        raise NotImplementedError

    def patch(self):
        raise NotImplementedError