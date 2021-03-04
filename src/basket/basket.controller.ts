import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ItemInShop, ItemToAdd } from 'src/interfaces';
import { ShopService } from 'src/shop/shop.service';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private basketService: BasketService,
    @Inject(ShopService) private shopService: ShopService,
  ) {}

  @Post('/')
  basket(@Body() item: ItemToAdd) {
    const { name, count } = item;

    if (typeof name !== 'string') return { isSuccess: false };
    if (name === '') return { isSuccess: false }; //here if(name) is enough, but i like to use === operator becouse it is easier to read what i mean
    if (typeof count !== 'number') return { isSuccess: false };
    if (count < 1) return { isSuccess: false };

    const itemsList: ItemInShop[] = this.shopService.itemsList();

    const itemIndex: number = itemsList.findIndex(
      (el, i) => el.name === item.name,
    );

    if (itemIndex === -1) return { isSuccess: false };

    this.basketService.addItem(item);

    return {
      isSuccess: true,
      index: itemIndex,
    };
  }
}
