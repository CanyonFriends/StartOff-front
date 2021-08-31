import { SkillClientType } from '../@types/client';
import { SkillServerType } from '../@types/server';

export const skillServerType2ClientType = (skill: SkillServerType): SkillClientType => {
  return {
    skillId: String(skill.skill_id),
    color: skill.color,
    skillName: skill.skill_name,
    textColor: skill.text_color,
  };
};
