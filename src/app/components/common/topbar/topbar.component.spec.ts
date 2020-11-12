import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { By } from '@angular/platform-browser';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      imports: [ MaterialModule ]
    });
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    component.showBackButton = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`showBackButton has default value`, () => {
    expect(component.showBackButton).toEqual(true);
  });

  it('should emit value on back button press', () => {
    const emitSpy = spyOn(component.navigationBackPressed, 'emit');
    component.navigateBackPressed();
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit \'true\' value on back button press', () => {
    const emitSpy = spyOn(component.navigationBackPressed, 'emit');
    component.navigateBackPressed();
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should display mat-icon \'back\' if \'showBackButton\' is true', () => {
    const matIcon = fixture.nativeElement.querySelector('mat-icon');
    expect(matIcon).toBeTruthy();
  });

  it('should NOT display mat-icon \'back\' if \'showBackButton\' is false', () => {
    component.showBackButton = false;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const matIcon = fixture.nativeElement.querySelector('mat-icon');
      expect(matIcon).toBeFalsy();
    });
  });

  it('should call \'navigateBackPressed\' if button back is pressed', () => {
    const callSpy = spyOn(component, 'navigateBackPressed')
    const matIcon = fixture.debugElement.nativeElement.querySelector('mat-icon');
    matIcon.click();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      expect(callSpy).toHaveBeenCalled();
    });
  });

  it('should have \'no-back-button\' class if \'showBackButton\' is false', () => {
    component.showBackButton = false;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('.no-back-button'));
      expect(title).toBeTruthy();
    });
  });

  it('should have \'with-back-button\' class if \'showBackButton\' is true', () => {
    const title = fixture.debugElement.query(By.css('.with-back-button'));
    expect(title).toBeTruthy();
  });

});
