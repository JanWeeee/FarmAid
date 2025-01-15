import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  cropStatus: string = 'uncultivated';
  coins: number = 0;

  waterCrop() {
    if (this.cropStatus === 'uncultivated') {
      this.cropStatus = 'growing';
      alert('You watered the crop. It will take some time to grow!');
      (document.getElementById('crop') as HTMLImageElement).src = 'assets/crop-growing.png';
      setTimeout(() => {
        this.finishGrowing();
      }, 5000); // Crop takes 5 seconds to grow
    } else if (this.cropStatus === 'growing') {
      alert('You already watered the crop. It\'s growing nicely!');
    } else {
      alert('You can\'t water the crop anymore. It\'s ready to be harvested!');
    }
  }

  finishGrowing() {
    if (this.cropStatus === 'growing') {
      this.cropStatus = 'mature';
      alert('The crop has finished growing!');
      (document.getElementById('crop') as HTMLImageElement).src = 'assets/crop-mature.png';
    }
  }

  harvestCrop() {
    if (this.cropStatus === 'uncultivated') {
      alert('You need to water and cultivate the crop first!');
    } else if (this.cropStatus === 'growing') {
      alert('The crop is still growing. Be patient!');
    } else {
      this.cropStatus = 'uncultivated';
      this.coins += 5; // Each harvested crop gives 5 coins
      alert('You harvested the crop. Time to plant a new one!');
      (document.getElementById('crop') as HTMLImageElement).src = 'assets/crop.png';
      this.updateBalance();
    }
  }

  sellCrop() {
    if (this.cropStatus === 'uncultivated') {
      alert('You don\'t have anything to sell yet!');
    } else if (this.cropStatus === 'growing') {
      alert('The crop is not ready to be sold yet!');
    } else {
      this.coins += 10; // Selling a crop gives 10 coins
      alert('You sold the crop and earned 10 coins!');
      this.plantNewCrop();
      this.updateBalance();
    }
  }

  plantNewCrop() {
    this.cropStatus = 'uncultivated';
    (document.getElementById('crop') as HTMLImageElement).src = 'assets/crop.png';
  }

  updateBalance() {
    document.getElementById('coinCount')!.textContent = this.coins.toString();
  }
}