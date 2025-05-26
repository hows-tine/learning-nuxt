
export type Habit = {
  id: number;
  name: string;
  dateStarted?: string;
  dateEnded?: string;
}

export type Frequency = {
  date: string
}

export type HabitFrequency = Record<number, Frequency[]>;
