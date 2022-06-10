from dataclasses import dataclass


@dataclass
class Shop:
    shop_name: str
    shop_id: int = -1
    modified_at: str = ""
    created_at: str = ""

    def post(self):
        raise NotImplementedError

    def patch(self):
        raise NotImplementedError
