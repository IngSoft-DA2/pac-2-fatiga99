import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReflectionApiService } from '../../services/reflection-api.service';
import { CounterService } from '../../services/counter.service';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrl: './reflection.component.css'
})
export class ReflectionComponent {
  dllNames: string[] = [];
  state: LoadingState = 'idle';
  accessCount: number = 0;

  constructor(
    private reflectionApiService: ReflectionApiService,
    private counterService: CounterService
  ) {
    this.accessCount = this.counterService.getCount();
  }

  loadDlls(): void {
    this.state = 'loading';

    this.reflectionApiService.getImporterDlls().subscribe({
      next: (data) => {
        this.dllNames = data;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
        this.dllNames = [];
      }
    });
  }

  get isLoading(): boolean {
    return this.state === 'loading';
  }

  get isError(): boolean {
    return this.state === 'error';
  }

  get isEmpty(): boolean {
    return this.state === 'success' && this.dllNames.length === 0;
  }

  get hasData(): boolean {
    return this.state === 'success' && this.dllNames.length > 0;
  }
}

