import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

type Style = Partial<CSSStyleDeclaration>;

@Component({
  selector: 'app-avatar',
  template: `
    <div [ngStyle]="hostStyle">
      <span
        class="rounded-circle border d-flex justify-content-center align-items-center text-white"
        [ngStyle]="avatarStyle"
        >{{ avatarText }}
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() name?: string | null;
  @Input() size: string | number = 50;

  public avatarText: string | null = null;
  public avatarStyle: Style = {};
  public hostStyle: Style = {};

  private defaultColors = [
    '#1abc9c',
    '#3498db',
    '#f1c40f',
    '#8e44ad',
    '#e74c3c',
    '#d35400',
    '#2c3e50',
    '#7f8c8d',
  ];

  ngOnInit(): void {
    if (this.name) {
      this.avatarText = this.name.charAt(0).toUpperCase();
      this.avatarStyle = this.getInitialsStyle(this.avatarText);
    }
    this.hostStyle = {
      width: this.size + 'px',
      height: this.size + 'px',
    };
  }

  private getInitialsStyle(avatarValue: string): Style {
    return {
      textTransform: 'uppercase',
      backgroundColor: this.getRandomColor(avatarValue),
      font: Math.floor(+this.size / 3) + 'px Helvetica, Arial, sans-serif',
      lineHeight: this.size + 'px',
    };
  }

  private getRandomColor(avatarText: string): string {
    if (!avatarText) {
      return 'transparent';
    }
    const asciiCodeSum = this.calculateAsciiCode(avatarText);
    return this.defaultColors[asciiCodeSum % this.defaultColors.length];
  }

  private calculateAsciiCode(value: string): number {
    return value
      .split('')
      .map((letter) => letter.charCodeAt(0))
      .reduce((previous, current) => previous + current);
  }
}
