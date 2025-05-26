
export type Habit = {
  id: number;
  name: string;
  dateStarted?: string;
  dateEnded?: string;
}

export type Frequency = {
  date: string
}

// export type HabitFrequency {
//   habitId: number;
//   frequency: {
//     date: string; // e.g., "2023-10-01"
//   }[]
// }

export type HabitFrequency = Record<number, Frequency[]>;
