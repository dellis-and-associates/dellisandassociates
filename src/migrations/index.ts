import * as migration_20260912_123507_initial from './20260912_123507_initial';
import * as migration_20260912_173459_phase2_data_model from './20260912_173459_phase2_data_model';
import * as migration_20260912_183536_phase4a_move_reward_rules from './20260912_183536_phase4a_move_reward_rules';
import * as migration_20260912_183542_phase4b_referrals from './20260912_183542_phase4b_referrals';
import * as migration_20260912_183954_phase4c_tenant_limits from './20260912_183954_phase4c_tenant_limits';
import * as migration_20260913_060400_phase5_sessions_rum from './20260913_060400_phase5_sessions_rum';
import * as migration_20260913_182450_shell_home_settings from './20260913_182450_shell_home_settings';

export const migrations = [
  {
    up: migration_20260912_123507_initial.up,
    down: migration_20260912_123507_initial.down,
    name: '20260912_123507_initial',
  },
  {
    up: migration_20260912_173459_phase2_data_model.up,
    down: migration_20260912_173459_phase2_data_model.down,
    name: '20260912_173459_phase2_data_model',
  },
  {
    up: migration_20260912_183536_phase4a_move_reward_rules.up,
    down: migration_20260912_183536_phase4a_move_reward_rules.down,
    name: '20260912_183536_phase4a_move_reward_rules',
  },
  {
    up: migration_20260912_183542_phase4b_referrals.up,
    down: migration_20260912_183542_phase4b_referrals.down,
    name: '20260912_183542_phase4b_referrals',
  },
  {
    up: migration_20260912_183954_phase4c_tenant_limits.up,
    down: migration_20260912_183954_phase4c_tenant_limits.down,
    name: '20260912_183954_phase4c_tenant_limits',
  },
  {
    up: migration_20260913_060400_phase5_sessions_rum.up,
    down: migration_20260913_060400_phase5_sessions_rum.down,
    name: '20260913_060400_phase5_sessions_rum',
  },
  {
    up: migration_20260913_182450_shell_home_settings.up,
    down: migration_20260913_182450_shell_home_settings.down,
    name: '20260913_182450_shell_home_settings'
  },
];
