from dataclasses import dataclass


@dataclass
class Tax:
    tax_rate: int
    tax_id: int = -1

    def put(self):
        raise NotImplementedError

    def post(self):
        raise NotImplementedError
