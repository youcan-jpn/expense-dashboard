from dataclasses import dataclass
from typing import List

from .receipt import Receipt


@dataclass
class Receipts:
    receipts: List[Receipt]

    def to_list(self) -> List[Receipt]:
        ret = []
        for receipt in self.receipts:
            ret.append(receipt.to_simple_dict())
        return ret
