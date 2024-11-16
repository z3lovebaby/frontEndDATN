import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { deal } from 'src/app/models/deal.model';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.page.html',
  styleUrls: ['./deal.page.scss'],
})
export class DealPage {
  private mouseDownTime: number | null = null;
  private readonly clickThreshold = 200; //
  deals: deal[] = [];
  constructor(private router: Router) {
    this.deals = [
      {
        uid: '111abc',
        cover:
          'https://png.pngtree.com/png-clipart/20231201/ourlarge/pngtree-november-2024-calendar-sleeping-cat-png-image_10777484.png',
        title: 'List 11/11/2024',
      },
      {
        uid: '112abc',
        cover:
          'https://png.pngtree.com/png-clipart/20231201/ourlarge/pngtree-april-2024-calendar-sleeping-cat-png-image_10777448.png',
        title: 'List 10/11/2024',
      },
      {
        uid: '113abc',
        cover:
          'https://png.pngtree.com/png-clipart/20231201/ourlarge/pngtree-november-2024-calendar-sleeping-cat-png-image_10777484.png',
        title: 'List 09/11/2024',
      },
      {
        uid: '114abc',
        cover:
          'https://png.pngtree.com/png-clipart/20231201/ourlarge/pngtree-april-2024-calendar-sleeping-cat-png-image_10777448.png',
        title: 'List 08/11/2024',
      },
      {
        uid: '115abc',
        cover:
          'https://png.pngtree.com/png-clipart/20231201/ourlarge/pngtree-november-2024-calendar-sleeping-cat-png-image_10777484.png',
        title: 'List 07/11/2024',
      },
    ];
  }

  onMouseDown() {
    this.mouseDownTime = Date.now(); // Ghi lại thời điểm nhấn chuột
  }

  onMouseUp(uid: string) {
    if (this.mouseDownTime) {
      const timeElapsed = Date.now() - this.mouseDownTime;
      if (timeElapsed < this.clickThreshold) {
        // Nếu nhấn và thả trong khoảng thời gian ngắn, thực hiện điều hướng
        this.router.navigate(['/tabs/deals', uid]);
      }
    }
    this.mouseDownTime = null; // Reset trạng thái
  }
}
