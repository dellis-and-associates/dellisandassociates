import * as migration_20260912_123507_initial from './20260912_123507_initial';
import * as migration_20260912_173459_phase2_data_model from './20260912_173459_phase2_data_model';

export const migrations = [
  {
    up: migration_20260912_123507_initial.up,
    down: migration_20260912_123507_initial.down,
    name: '20260912_123507_initial',
  },
  {
    up: migration_20260912_173459_phase2_data_model.up,
    down: migration_20260912_173459_phase2_data_model.down,
    name: '20260912_173459_phase2_data_model'
  },
];
