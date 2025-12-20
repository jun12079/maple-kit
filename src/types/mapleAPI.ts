export interface CharacterId {
  ocid: string;
}

export interface CharacterBasic {
  date: string | null;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
  character_date_create: string;
  access_flag: string;
  liberation_quest_clear: string;
}

export interface CharacterPopularity {
  date: string | null;
  popularity: number;
}

export interface CharacterStatDetail {
  stat_name: string;
  stat_value: string;
}

export interface CharacterStat {
  date: string | null;
  character_class: string;
  final_stat: CharacterStatDetail[];
  remain_ap: number;
}

export interface HyperStatPreset {
  stat_type: string;
  stat_point: number;
  stat_level: number;
  stat_increase: string;
}

export interface CharacterHyperStat {
  date: string | null;
  character_class: string;
  use_preset_no: string;
  use_available_hyper_stat: number;
  hyper_stat_preset_1: HyperStatPreset[];
  hyper_stat_preset_1_remain_point: number;
  hyper_stat_preset_2: HyperStatPreset[];
  hyper_stat_preset_2_remain_point: number;
  hyper_stat_preset_3: HyperStatPreset[];
  hyper_stat_preset_3_remain_point: number;
}

export interface AbilityInfo {
  ability_no: string;
  ability_grade: string;
  ability_value: string;
}

export interface AbilityPreset {
  ability_preset_grade: string;
  ability_info: AbilityInfo[];
}

export interface CharacterAbility {
  date: string | null;
  ability_grade: string;
  ability_info: AbilityInfo[];
  remain_fame: number;
  preset_no: number;
  ability_preset_1: AbilityPreset;
  ability_preset_2: AbilityPreset;
  ability_preset_3: AbilityPreset;
}

export interface ItemBaseOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
  boss_damage: string;
  ignore_monster_armor: string;
  all_stat: string;
  max_hp_rate: string;
  max_mp_rate: string;
  base_equipment_level: number;
}

export interface ItemTotalOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
  boss_damage: string;
  ignore_monster_armor: string;
  all_stat: string;
  damage: string;
  equipment_level_decrease: number;
  max_hp_rate: string;
  max_mp_rate: string;
}

export interface ItemAddOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
  boss_damage: string;
  damage: string;
  all_stat: string;
  equipment_level_decrease: number;
}

export interface ItemEtcOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
}

export interface ItemStarforceOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
}

export interface ItemExceptionalOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
  boss_damage: string;
  damage: string;
  all_stat: string;
  equipment_level_decrease: number;
}

export interface ItemEquipment {
  item_equipment_part: string;
  item_equipment_slot: string;
  item_name: string;
  item_icon: string;
  item_description: string;
  item_shape_name: string;
  item_shape_icon: string;
  item_gender: string;
  item_total_option: ItemTotalOption;
  item_base_option: ItemBaseOption;
  equipment_level_increase: number;
  item_exceptional_option: ItemExceptionalOption;
  item_add_option: ItemAddOption;
  growth_exp: number;
  growth_level: number;
  scroll_upgrade: string;
  cuttable_count: string;
  golden_hammer_flag: string;
  scroll_resilience_count: string;
  scroll_upgradable_count: string;
  soul_name: string;
  soul_option: string;
  item_etc_option: ItemEtcOption;
  starforce: string;
  starforce_scroll_flag: string;
  item_starforce_option: ItemStarforceOption;
  special_ring_level: number;
  date_expire: string;
}

export interface Title {
  title_name: string;
  title_icon: string;
  title_description: string;
  date_expire: string;
  date_option_expire: string;
  title_shape_name: string;
  title_shape_icon: string;
  title_shape_description: string;
}

export interface CharacterItemEquipment {
  date: string | null;
  character_gender: string;
  character_class: string;
  preset_no: number;
  item_equipment: ItemEquipment[];
  item_equipment_preset_1: ItemEquipment[];
  item_equipment_preset_2: ItemEquipment[];
  item_equipment_preset_3: ItemEquipment[];
  title: Title;
  dragon_equipment: ItemEquipment[];
  mechanic_equipment: ItemEquipment[];
}

export interface CashItemOption {
  option_type: string;
  option_value: string;
}

export interface CashItemColoringPrism {
  color_range: string;
  hue: number;
  saturation: number;
  value: number;
}

export interface CashItemEquipment {
  cash_item_equipment_part: string;
  cash_item_equipment_slot: string;
  cash_item_name: string;
  cash_item_icon: string;
  cash_item_description: string;
  cash_item_option: CashItemOption[];
  date_expire: string;
  date_option_expire: string;
  cash_item_label: string;
  cash_item_coloring_prism: CashItemColoringPrism;
  item_gender: string;
  skill: string[];
}

export interface CharacterCashItemEquipment {
  date: string | null;
  character_gender: string;
  character_class: string;
  character_look_mode: string;
  preset_no: number;
  cash_item_equipment_base: CashItemEquipment[];
  cash_item_equipment_preset_1: CashItemEquipment[];
  cash_item_equipment_preset_2: CashItemEquipment[];
  cash_item_equipment_preset_3: CashItemEquipment[];
  additional_cash_item_equipment_base: CashItemEquipment[];
  additional_cash_item_equipment_preset_1: CashItemEquipment[];
  additional_cash_item_equipment_preset_2: CashItemEquipment[];
  additional_cash_item_equipment_preset_3: CashItemEquipment[];
}

export interface Symbol {
  symbol_name: string;
  symbol_icon: string;
  symbol_description: string;
  symbol_force: string;
  symbol_level: number;
  symbol_str: string;
  symbol_dex: string;
  symbol_int: string;
  symbol_luk: string;
  symbol_hp: string;
  symbol_drop_rate: string;
  symbol_meso_rate: string;
  symbol_exp_rate: string;
  symbol_growth_count: number;
  symbol_require_growth_count: number;
}

export interface CharacterSymbolEquipment {
  date: string | null;
  character_class: string;
  symbol: Symbol[];
}

export interface CharacterDojang {
  date: string | null;
  character_class: string;
  world_name: string;
  dojang_best_floor: number;
  date_dojang_record: string;
  dojang_best_time: number;
}

export interface CharacterPropensity {
  date: string | null;
  charisma_level: number;
  sensibility_level: number;
  insight_level: number;
  willingness_level: number;
  handicraft_level: number;
  charm_level: number;
}

export interface SetEffectInfo {
  set_count: number;
  set_option: string;
}

export interface SetEffect {
  set_name: string;
  total_set_count: number;
  set_effect_info: SetEffectInfo[];
  set_option_full: SetEffectInfo[];
}

export interface CharacterSetEffect {
  date: string | null;
  set_effect: SetEffect[];
}

export interface Hair {
  hair_name: string;
  base_color: string;
  mix_color: string;
  mix_rate: string;
}

export interface Face {
  face_name: string;
  base_color: string;
  mix_color: string;
  mix_rate: string;
}

export interface Skin {
  skin_name: string;
  color_style: string;
  hue: number;
  saturation: number;
  brightness: number;
}

export interface CharacterBeautyEquipment {
  date: string | null;
  character_gender: string;
  character_class: string;
  character_hair: Hair;
  character_face: Face;
  character_skin: Skin;
  additional_character_hair: Hair;
  additional_character_face: Face;
  additional_character_skin: Skin;
}

export interface AndroidPreset {
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_gender: string;
  android_grade: string;
  android_skin: Skin;
  android_hair: Hair;
  android_face: Face;
  android_ear_sensor_clip_flag: string;
  android_non_humanoid_flag: string;
  android_shop_usable_flag: string;
}

export interface CharacterAndroidEquipment {
  date: string | null;
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_hair: Hair;
  android_face: Face;
  android_skin: Skin;
  android_cash_item_equipment: CashItemEquipment[];
  android_ear_sensor_clip_flag: string;
  android_gender: string;
  android_grade: string;
  android_non_humanoid_flag: string;
  android_shop_usable_flag: string;
  preset_no: number;
  android_preset_1: AndroidPreset;
  android_preset_2: AndroidPreset;
  android_preset_3: AndroidPreset;
}

export interface PetEquipment {
  item_name: string;
  item_icon: string;
  item_description: string;
  item_option: CashItemOption[];
  scroll_upgrade: number;
  scroll_upgradable: number;
  item_shape: string;
  item_shape_icon: string;
}

export interface PetAutoSkill {
  skill_1: string;
  skill_1_icon: string;
  skill_2: string;
  skill_2_icon: string;
}

export interface CharacterPetEquipment {
  date: string | null;
  pet_1_name: string;
  pet_1_nickname: string;
  pet_1_icon: string;
  pet_1_description: string;
  pet_1_equipment: PetEquipment;
  pet_1_auto_skill: PetAutoSkill;
  pet_1_pet_type: string;
  pet_1_skill: string[];
  pet_1_date_expire: string;
  pet_1_appearance: string;
  pet_1_appearance_icon: string;
  pet_2_name: string;
  pet_2_nickname: string;
  pet_2_icon: string;
  pet_2_description: string;
  pet_2_equipment: PetEquipment;
  pet_2_auto_skill: PetAutoSkill;
  pet_2_pet_type: string;
  pet_2_skill: string[];
  pet_2_date_expire: string;
  pet_2_appearance: string;
  pet_2_appearance_icon: string;
  pet_3_name: string;
  pet_3_nickname: string;
  pet_3_icon: string;
  pet_3_description: string;
  pet_3_equipment: PetEquipment;
  pet_3_auto_skill: PetAutoSkill;
  pet_3_pet_type: string;
  pet_3_skill: string[];
  pet_3_date_expire: string;
  pet_3_appearance: string;
  pet_3_appearance_icon: string;
}

export interface Skill {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_effect: string;
  skill_icon: string;
}

export interface CharacterSkill {
  date: string | null;
  character_class: string;
  character_skill_grade: string;
  character_skill: Skill[];
}

export interface LinkSkill {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_effect: string;
  skill_icon: string;
}

export interface CharacterLinkSkill {
  date: string | null;
  character_class: string;
  character_link_skill: LinkSkill[];
  character_link_skill_preset_1: LinkSkill[];
  character_link_skill_preset_2: LinkSkill[];
  character_link_skill_preset_3: LinkSkill[];
  character_owned_link_skill: LinkSkill;
  character_owned_link_skill_preset_1: LinkSkill;
  character_owned_link_skill_preset_2: LinkSkill;
  character_owned_link_skill_preset_3: LinkSkill;
}

export interface VCore {
  slot_id: string;
  slot_level: number;
  v_core_name: string;
  v_core_type: string;
  v_core_level: number;
  v_core_skill_1: string;
  v_core_skill_2: string;
  v_core_skill_3: string;
}

export interface CharacterVMatrix {
  date: string | null;
  character_class: string;
  character_v_core_equipment: VCore[];
  character_v_matrix_remain_slot_upgrade_point: number;
}

export interface HexaCore {
  hexa_core_name: string;
  hexa_core_level: number;
  hexa_core_type: string;
  linked_skill: { hexa_skill_id: string }[];
}

export interface CharacterHexaMatrix {
  date: string | null;
  character_hexa_core_equipment: HexaCore[];
}

export interface HexaStatCore {
  slot_id: string;
  main_stat_name: string;
  sub_stat_name_1: string;
  sub_stat_name_2: string;
  main_stat_level: number;
  sub_stat_level_1: number;
  sub_stat_level_2: number;
  stat_grade: number;
}

export interface CharacterHexaMatrixStat {
  date: string | null;
  character_class: string;
  character_hexa_stat_core: HexaStatCore[];
  character_hexa_stat_core_2: HexaStatCore[];
  character_hexa_stat_core_3: HexaStatCore[];
  preset_hexa_stat_core: HexaStatCore[];
}

export interface CharacterUnion {
  date: string | null;
  union_level: number;
  union_grade: string;
  union_artifact_level: number;
  union_artifact_exp: number;
  union_artifact_point: number;
}

export interface UnionInnerStat {
  stat_field_id: string;
  stat_field_effect: string;
}

export interface UnionBlock {
  block_type: string;
  block_class: string;
  block_level: string;
  block_control_point: { x: number; y: number };
  block_position: { x: number; y: number }[];
}

export interface UnionRaiderPreset {
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: UnionInnerStat[];
  union_block: UnionBlock[];
}

export interface CharacterUnionRaider {
  date: string | null;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: UnionInnerStat[];
  union_block: UnionBlock[];
  use_preset_no: number;
  union_raider_preset_1: UnionRaiderPreset;
  union_raider_preset_2: UnionRaiderPreset;
  union_raider_preset_3: UnionRaiderPreset;
  union_raider_preset_4: UnionRaiderPreset;
  union_raider_preset_5: UnionRaiderPreset;
}

export interface UnionArtifactEffect {
  name: string;
  level: number;
}

export interface UnionArtifactCrystal {
  name: string;
  validity_flag: string;
  date_expire: string;
  level: number;
  crystal_option_name_1: string;
  crystal_option_name_2: string;
  crystal_option_name_3: string;
}

export interface CharacterUnionArtifact {
  date: string | null;
  union_artifact_effect: UnionArtifactEffect[];
  union_artifact_crystal: UnionArtifactCrystal[];
  union_artifact_remain_ap: number;
}

export interface UnionChampionBadgeInfo {
  stat: string;
}

export interface UnionChampion {
  champion_name: string;
  champion_slot: number;
  champion_grade: string;
  champion_class: string;
  champion_badge_info: UnionChampionBadgeInfo[];
}

export interface CharacterUnionChampion {
  date: string | null;
  union_champion: UnionChampion[];
  champion_badge_total_info: UnionChampionBadgeInfo[];
}

export interface MapleAPIErrorBody {
  name: string;
  message: string;
}

export interface MapleAPIErrorResponse {
  error: MapleAPIErrorBody;
}
