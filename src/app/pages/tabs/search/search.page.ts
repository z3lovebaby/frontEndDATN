import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  query: any;
  isLoading: boolean;
  model: any = {
    icon: 'search-outline',
    title: 'No shop record found',
  };
  allShops: any[] = [
    {
      uid: '12432hns',
      cover:
        'https://shoptrecon.vn/wp-content/uploads/dep-CROCS-ECHO-CLOG-tre-em-chinh-hang-mau-do-shop-tre-con-0879262604.jpg',
      nameShop: 'Crors Official',
      type: 'Thời trang',
      rating: 4.5,
      addr: 'Hà Nội',
    },
    {
      uid: '12432mmm',
      cover:
        'https://shoptrecon.vn/wp-content/uploads/dep-CROCS-ECHO-CLOG-tre-em-chinh-hang-mau-do-shop-tre-con-0879262604.jpg',
      nameShop: 'TinNgoan',
      type: 'Thời trang',
      rating: 4.5,
      addr: 'Hà Tây',
    },
    {
      uid: '6543gaga',
      cover:
        'https://shoptrecon.vn/wp-content/uploads/dep-CROCS-ECHO-CLOG-tre-em-chinh-hang-mau-do-shop-tre-con-0879262604.jpg',
      nameShop: 'Huggies Official',
      type: 'Mẹ bé',
      rating: 5,
      addr: 'Hà Nazm',
    },
  ];
  shops: any[] = [];
  constructor() {}
  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    console.log(this.query);
    this.shops = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(() => {
        this.shops = this.allShops.filter((element: any) => {
          return element.nameShop.toLowerCase().includes(this.query);
        });
        this.isLoading = false;
      }, 3000);
    }
  }
}
