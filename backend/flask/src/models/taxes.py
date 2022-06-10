from dataclasses import dataclass, field
from typing import Dict, List
from .tax import Tax


@dataclass
class Taxes:
    taxes_list: List[Tax] = field(default_factory=list)
    taxes_dict: Dict[int, int] = {}

    def __post_init__(self):
        self.get()
        self._set_taxes_dict()

    def get(self):
        raise NotImplementedError

    def _set_taxes_dict(self):
        taxes_dict = {}
        for tax in self.taxes:
            taxes_dict[tax.tax_id] = tax.tax_rate
        self.taxes_dict = taxes_dict
        return self
