from dataclasses import dataclass
from typing import List

from .receipt import Receipt


@dataclass
class Receipts:
    receipts: List[Receipt]

    def get(self):
        raise NotImplementedError
